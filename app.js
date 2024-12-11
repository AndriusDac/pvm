console.log('PVM');

fetch('https://in3.dev/inv/')
.then(response => response.json())
.then(data => {

  console.log(data)

// Sąskaitos duomenys

  document.getElementById('invoice-number').textContent = data.number;
  document.getElementById('invoice-date').textContent = data.date;
  document.getElementById('invoice-due_date').textContent = data.due_date;
    
  // console.log(data.number);
  // console.log(data.due_date);

// Pardavėjo duomenys
  document.getElementById('seller-name').textContent = data.company.seller.name;
  document.getElementById('seller-address').textContent = data.company.seller.address;
  document.getElementById('seller-code').textContent = data.company.seller.code;
  document.getElementById('seller-vat').textContent = data.company.seller.vat;
  document.getElementById('seller-phone').textContent = data.company.seller.phone;
  document.getElementById('seller-email').textContent = data.company.seller.email;

  // console.log(data.company.seller.phone);
  // console.log(data.company.seller.email);

  //Pirkėjo duomenys
  document.getElementById('buyer-name').textContent = data.company.buyer.name;
  document.getElementById('buyer-address').textContent = data.company.buyer.address;
  document.getElementById('buyer-code').textContent = data.company.buyer.code;
  document.getElementById('buyer-vat').textContent = data.company.buyer.vat;
  document.getElementById('buyer-phone').textContent = data.company.buyer.phone;
  document.getElementById('buyer-email').textContent = data.company.buyer.email;

  // console.log(data.company.buyer.phone);
  // console.log(data.company.buyer.email);

  //Prekės
  const itemsList = document.getElementById('items-list');
  
  let subtotal = 0;

  data.items.forEach(item => {
       
    if (item.discount.type === 'fixed') {
      discount = `-${item.discount.value.toFixed(2)}`
      totalPrice = `${((item.quantity * item.price) - (item.quantity * (-discount))).toFixed(2)}`;

    } else if (item.discount.type === 'percentage') {
      discountPrecentage = (item.price * item.discount.value / 100)
      discount = `${item.discount.value}% (-${discountPrecentage.toFixed(2)})`
      totalPrice = (item.quantity * item.price - (item.quantity * (item.price * item.discount.value / 100))).toFixed(2);

    } else {
      discount = '';
      totalPrice = (item.quantity * item.price).toFixed(2);
    };
  
    console.log(discount);
    console.log(item.discount);
    
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${item.description}</td>
    <td>${item.quantity}</td>
    <td>${item.price}</td>
    <td>${discount}</td>
    <td>${totalPrice}</td>
    `;

    itemsList.appendChild(row);
  
    subtotal += Number(totalPrice);

    // console.log(typeof subtotal);
    // console.log(typeof totalPrice);
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);

    // console.log(subtotal)
    
  });

  //Transportavimo išlaidos:
  document.getElementById('shippingPrice').textContent = data.shippingPrice.toFixed(2);

  // console.log(data.shippingPrice);

  const vat = ((Number(subtotal) + Number(data.shippingPrice)) * 0.21).toFixed(2);
  document.getElementById('vat').textContent = vat;
  // console.log(typeof vat);
 
  const total = (Number(subtotal) + Number(data.shippingPrice) + Number(vat)).toFixed(2);
  document.getElementById('total').textContent = total;

});









//     function populateInvoice(data) {
//         document.getElementById('invoice-number').textContent = data.invoiceNumber;
//         document.getElementById('invoice-date').textContent = data.invoiceDate;
//         document.getElementById('payment-due-date').textContent = data.paymentDueDate;
        
//         document.getElementById('seller-details').textContent = `
//           ${data.seller.name}
//           ${data.seller.address}
//           ${data.seller.city}, ${data.seller.country}
//         `;
//         document.getElementById('buyer-details').textContent = `
//           ${data.buyer.name}
//           ${data.buyer.address}
//           ${data.buyer.city}, ${data.buyer.country}
//         `;
      
//         const itemsList = document.getElementById('items-list');
//         let subtotal = 0;
      
//         data.items.forEach(item => {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//             <td>${item.name}</td>
//             <td>${item.quantity}</td>
//             <td>${item.price.toFixed(2)}</td>
//             <td>${item.discount ? item.discount : '-'}</td>
//             <td>${(item.quantity * item.price - (item.discount || 0)).toFixed(2)}</td>
//           `;
//           itemsList.appendChild(row);
//           subtotal += item.quantity * item.price - (item.discount || 0);
//         });
      
//         const shippingCost = data.shippingCost || 0;
//         const vat = subtotal * 0.21;
//         const total = subtotal + vat + shippingCost;
      
//         document.getElementById('shipping-cost').textContent = shippingCost.toFixed(2);
//         document.getElementById('subtotal').textContent = subtotal.toFixed(2);
//         document.getElementById('vat').textContent = vat.toFixed(2);
//         document.getElementById('total').textContent = total.toFixed(2);
//       }

//       fetch('https://in3.dev/inv/')
//   .then(response => response.json())
//   .then(data => {

// // Įterpti duomenis į HTML

//       console.log(data);
  
//     populateInvoice(data);
    
//   })
 

  