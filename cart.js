



  
//  let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     function saveCart() {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }

//     function updateCartCount() {
//       const cartCount = document.getElementById("cartCount");
//       if (cartCount) {
//         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//         cartCount.textContent = totalItems;
//       }
//     }

//     function updateCartDisplay() {
//       const cartItemsDiv = document.getElementById("cartItems");
//       cartItemsDiv.innerHTML = "";

//       if (cart.length === 0) {
//         cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
//         updateCartCount();
//         return;
//       }

//       cart.forEach(item => {
//         const div = document.createElement("div");
//         div.classList.add("cart-item");

//         div.innerHTML = `
//           <img src="${item.image}" alt="${item.name}">
//           <div class="cart-details">
//             <strong>${item.name}</strong><br>
//             ₦${item.price}
//           </div>
//           <div class="qty-controls">
//             <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
//             <span>${item.quantity}</span>
//             <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
//           </div>
//           <button class="btn-remove" onclick="removeFromCart('${item.id}')">
//             <i class="fa-solid fa-trash"></i> Remove
//           </button>
//         `;

//         cartItemsDiv.appendChild(div);
//       });

//       updateCartCount();
//     }

//     function removeFromCart(productId) {
//       cart = cart.filter(item => item.id !== productId);
//       saveCart();
//       updateCartDisplay();
//     }

//     function changeQty(productId, delta) {
//       const item = cart.find(i => i.id === productId);
//       if (!item) return;

//       item.quantity += delta;
//       if (item.quantity <= 0) {
//         removeFromCart(productId);
//       } else {
//         saveCart();
//         updateCartDisplay();
//       }
//     }

//     document.addEventListener("DOMContentLoaded", updateCartDisplay);
function renderOrderSummary2() {
  const summaryEl = document.getElementById("orderSummary1");
  if (!summaryEl) return;
  if (!cart.length) {
    summaryEl.innerHTML = `
      <p>Your cart is empty</p>
      <h4>Total: ₦0</h4>
    `;
    return;
  }
  // 1. Calculate values
  const originalPrice = cart.reduce(
    (sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)),
    0
  );
  const savings = originalPrice * 0.05; // 5% savings
  const subtotal = originalPrice - savings;
  const estimatedTax = subtotal * 0.05; // 5% tax
  const total = subtotal + estimatedTax;
  // 2. Render summary
  summaryEl.innerHTML = `
  <p class= "bill fw-bold fs-4 text-dark">Order Summary</p>
    <div class="border-top pt-3">
      <p class= "fs-5 mb-3">Original Price: <span class="float-end">₦${originalPrice.toLocaleString()}</span></p>
      <p class= "fs-5 mb-3">Savings (5%): <span class="float-end text-success">-₦${savings.toLocaleString()}</span></p>
      <p class= "fs-5 mb-3">Shipping: <span class="float-end">FREE</span></p>
      <p class= "fs-5 mb-3">Estimated Sales Tax (5%): <span class="float-end">₦${estimatedTax.toLocaleString()}</span></p>
      <hr>
      <h5 class= "mt-4 text-dark">Total: <span class="float-end fw-bold">₦${total.toLocaleString()}</span></h5>
    </div>
    <button class="pay-btn w-100 fs-5 mt-5" id= "placeOrderBtn">Place Order</button>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
  syncCartButtons();
  renderCartPage();
  loadProductsFromApi();
  renderOrderSummary2();
});

window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY) {
    loadCart();
    updateCartCount();
    syncCartButtons();
    renderCartPage();
    renderOrderSummary2()
  }
});

// document.getElementById("placeOrderBtn").addEventListener("click", async (e) => {
//   e.preventDefault();

//   // 1. Collect form values
//   const fullName = document.getElementById("fullName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const address = document.getElementById("address").value.trim();
//   const orderNote = document.getElementById("orderNote").value.trim();

//   // 2. Validate
//   if (!fullName || !email || !phone || !address) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   // 3. Use your cart totals (from your snippet)
//   const originalPrice = window.originalPrice || 0;
//   const savings = window.savings || 0;
//   const estimatedTax = window.estimatedTax || 0;
//   const total = window.total || 0;

//   // 4. Build payload for backend
//   const payload = {
//     customerSnapshot: { fullName, email, phone, address, orderNote },
//     originalPrice,
//     savings,
//     estimatedTax,
//     totalAmount: total,
//   };

//   try {
//     // 5. Call backend /create route
//     const response = await fetch("http://localhost:3001/api/orders/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!data.authorizationUrl) {
//       alert("Error starting payment. Try again.");
//       return;
//     }

//     // 6. Redirect to Paystack checkout
//     window.location.href = data.authorizationUrl;

//   } catch (err) {
//     console.error("Order error:", err);
//     alert("Something went wrong. Please try again.");
//   }
// });