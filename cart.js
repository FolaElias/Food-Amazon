



  
 let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
      const cartCount = document.getElementById("cartCount");
      if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
      }
    }

    function updateCartDisplay() {
      const cartItemsDiv = document.getElementById("cartItems");
      cartItemsDiv.innerHTML = "";

      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
        updateCartCount();
        return;
      }

      cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-details">
            <strong>${item.name}</strong><br>
            ₦${item.price}
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
          <button class="btn-remove" onclick="removeFromCart('${item.id}')">
            <i class="fa-solid fa-trash"></i> Remove
          </button>
        `;

        cartItemsDiv.appendChild(div);
      });

      updateCartCount();
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      saveCart();
      updateCartDisplay();
    }

    function changeQty(productId, delta) {
      const item = cart.find(i => i.id === productId);
      if (!item) return;

      item.quantity += delta;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        saveCart();
        updateCartDisplay();
      }
    }

    document.addEventListener("DOMContentLoaded", updateCartDisplay);
