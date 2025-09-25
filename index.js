function checkOut() {
    location.href = 'checkout.html'
};

function togglePassword() {
  const passwordField = document.getElementById("password");
  const icon = document.getElementById("togglePasswordIcon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    passwordField.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}


function signUp(event) { 
    event.preventDefault();
    const spin = document.querySelector('.spin');
    const fancy = document.getElementById('fancy');
    spin.style.display = 'inline-block';
    fancy.style.pointerEvents = 'none';

    getName = document.getElementById('text').value;
    getEmail = document.getElementById('email').value;
    getPhone = document.getElementById('number').value;
    getPassword = document.getElementById('password').value;

    if (getName === "" || getEmail === "" || getPhone === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            title: 'All fields are required',
            confirmButtonColor: '#F58634'
        })
        spin.style.display = 'none';
        fancy.style.pointerEvents = 'auto';
    }

    if (getPhone.length != 11) { 
        Swal.fire({
            icon: 'warning',
            title: 'Phone number must be 11 digits',
            confirmButtonColor: '#F58634'
        })
        spin.style.display = 'none';
        fancy.style.pointerEvents = 'auto';
    }

    else {
        const signData = {
            name: getName,
            email: getEmail,
            phoneNumber: getPhone,
            password: getPassword
        };

        const signMethod = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signData)
        };

        const url = 'http://localhost:3001/amazon/document/api/register';

        fetch(url, signMethod)
            .then(response => response.json())
            .then(result => { 
                console.log('Success:', result);
                if (result.message === "User registered successfully") { 
                   Swal.fire({
                        icon: 'success',
                        title: 'Account created successfully',
                        confirmButtonColor: '#00A859'
                    })

                    setTimeout(() => {
                        location.href = './login.html'
                    }, 3000)
                }

                else {
                     Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        confirmButtonColor: '#F58634'
                    })
                     
                }
            })
            .catch(error => {
                console.log('error', error)
                Swal.fire({
                    icon: 'error',
                    title: 'Server error. Please try again later.',
                    confirmButtonColor: '#F58634'
                })
                spin.style.display = 'none';
                fancy.style.pointerEvents = 'auto';
            })
    }
}


// ✅ LOGIN FUNCTION
function logIn(event) {
  event.preventDefault();
  const spin = document.querySelector('.spin');
  const fancy = document.getElementById('fancy');
  spin.style.display = 'inline-block';
  fancy.style.pointerEvents = 'none';

  const getEmail = document.getElementById('email').value;
  const getPassword = document.getElementById('password').value;

  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: 'info',
      title: 'All fields are required',
      confirmButtonColor: '#F58634'
    });
    spin.style.display = 'none';
    fancy.style.pointerEvents = 'auto';
    return;
  }

  const signData = { email: getEmail, password: getPassword };

  fetch('http://localhost:3001/amazon/document/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signData)
  })
    .then(response => response.json())
    .then(result => {
      console.log("Login result:", result);

      if (result.token) {
        // ✅ Store login token
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userEmail", result.email || getEmail);

        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          confirmButtonColor: '#28a745'
        }).then(() => {
          location.href = "../index.html"; // redirect after login
        });

      } else {
        Swal.fire({
          icon: 'error',
          text: result.message || "Login failed",
          confirmButtonColor: "#2D85DE"
        });
      }

      spin.style.display = 'none';
      fancy.style.pointerEvents = 'auto';
    })
    .catch(error => {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        text: "Something went wrong, please try again",
        confirmButtonColor: "#2D85DE"
      });
      spin.style.display = 'none';
      fancy.style.pointerEvents = 'auto';
    });
}

// ✅ LOGOUT FUNCTIONS
function logOut() {
  // SweetAlert2 check
  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out"
    }).then((result) => {
      if (result.isConfirmed) {
        performLogout();
      }
    });
  } else {
    if (confirm("Log out?")) {
      performLogout();
    }
  }
}

function performLogout() {
  // clear session
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("site_cart_v1");

  // update UI immediately
  const userStatusDot = document.getElementById("userStatusDot");
  if (userStatusDot) userStatusDot.style.display = "none";

  const userLink = document.getElementById("userLink");
  if (userLink) {
    userLink.setAttribute("href", "/landingpages/login.html"); // ✅ absolute path
    userLink.onclick = null;
  }

  // redirect to login
  setTimeout(() => {
    location.href = "/landingpages/login.html"; // ✅ absolute path
  }, 200);
}

// ✅ CHECK LOGIN STATE ON EVERY PAGE
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const userLink = document.getElementById("userLink");
  const userStatusDot = document.getElementById("userStatusDot");

  if (token) {
    // User logged in
    if (userStatusDot) userStatusDot.style.display = "inline-block";

    if (userLink) {
      userLink.removeAttribute("href");
      userLink.addEventListener("click", (e) => {
        e.preventDefault();
        logOut();
      });
    }
  } else {
    // Not logged in
    if (userStatusDot) userStatusDot.style.display = "none";

    if (userLink) {
      userLink.setAttribute("href", "/landingpages/login.html"); // ✅ absolute path
      userLink.onclick = null;
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  showProducts();
  fiveProducts();
  backFiveProducts();
  
})

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id) {
    productDetails(id); // Load single product
  } else {
    showProducts(); // Load all products
    fiveProducts();
    backFiveProducts()
    }
    
});

// Show product details
async function productDetails(id) {
  try {
    const res = await fetch(`http://localhost:3001/amazon/document/api/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    const product = await res.json();
    console.log("Product:", product);
    const nameEl = document.getElementById("productName");
    const priceEl = document.getElementById("productPrice");
    const descEl = document.getElementById("productDescription");
    const imagesDiv = document.getElementById("productImages");
    const variety = document.getElementById("productVariety");
    const benefits = document.getElementById("productBenefits");
    const ingredientsEl = document.getElementById("productIngredients");

    if (nameEl) nameEl.textContent = product.name || "Unnamed Product";
    if (priceEl) priceEl.textContent = product.price ? `₦${product.price}` : "No price";
    if (descEl) descEl.textContent = product.description || "No description";
    if (benefits) benefits.textContent = product.benefits || "No benefits";
      


  const images = Array.isArray(product.image) ? product.image : [product.image];
  const mainImage = document.getElementById("mainImage");
  const carousel = document.getElementById("imageCarousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0; // track active image

  if (images.length > 0) {
    // Set first image as main
    mainImage.src = images[currentIndex];
    mainImage.alt = product.name || "Product Image";

    // Clear carousel
    carousel.innerHTML = "";

    // Add thumbnails
    images.forEach((src, index) => {
      if (!src) return;
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `${product.name} ${index + 1}`;
      if (index === currentIndex) thumb.classList.add("active");

      // Thumbnail click
      thumb.addEventListener("click", () => {
        currentIndex = index;
        updateMainImage();
      });

      carousel.appendChild(thumb);
    });

    // Update main image + highlight active thumbnail
    function updateMainImage() {
      mainImage.src = images[currentIndex];
      document.querySelectorAll(".carousel-thumbnails img").forEach((img, idx) => {
        img.classList.toggle("active", idx === currentIndex);
      });
      // Auto-scroll to keep active thumbnail in view
      const activeThumb = carousel.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }

    // Prev button
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // loop back
      updateMainImage();
    });

    // Next button
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length; // loop forward
      updateMainImage();
    });
  }


      if (variety) {
        variety.innerHTML = ""; // clear old list
        if (Array.isArray(product.variety) && product.variety.length > 0) {
    product.variety.forEach(variets => {
      const li = document.createElement("li");
      li.textContent = variets;
      variety.appendChild(li);
    });
  } else {
    variety.innerHTML = "<li>No variety listed</li>";
  }
      }
      if (ingredientsEl) {
  ingredientsEl.innerHTML = ""; // clear old list
  if (Array.isArray(product.ingridients) && product.ingridients.length > 0) {
    product.ingridients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsEl.appendChild(li);
    });
  } else {
    ingredientsEl.innerHTML = "<li>No ingredients listed</li>";
  }
}
  } catch (error) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    console.error("Error loading product:", error);
  }
}
function goToProductDetails(id) {
  // First try landingpages/
  const testPath = "/landingpages/product-details.html";
  fetch(testPath, { method: "HEAD" })
    .then(res => {
      if (res.ok) {
        location.href = `${testPath}?id=${id}`;
      } else {
        location.href = `/product-details.html?id=${id}`;
      }
    })
    .catch(() => {
      location.href = `/product-details.html?id=${id}`;
    });
}





async function fiveProducts() {
  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    console.log("Products:", products);

    const carousels = ["carousel1", "carousel2"];
    const toShow = Array.isArray(products) ? products.slice(0, 5) : [];

    carousels.forEach(id => {
      const productsRow = document.getElementById(id);
      if (!productsRow) return;

      productsRow.innerHTML = "";
      toShow.forEach(product => {
        const productId = String(product._id || product.id || product.name.replace(/\s+/g, "-"));
        const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image;

        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-3 mb-4";
        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${imageSrc}" alt="${product.name}"
                 class="card-img-top product-img product-link px-lg-0 px-2"
                 data-product-id="${productId}"
                 onclick="goToProductDetails('${productId}'">

            <div class="card-body">
              <div class="d-flex justify-content-between mt-3">
                <p>${product.name}</p>
                <div>
                  <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0F0B0B;"></i></a>
                </div>
              </div>

              <p class="card-title fs-5 fw-bold">${product.name}</p>

              <div class="d-flex justify-content-between">
                <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #F58634;"></i>5.0 (18)</p>
                <p class="fs-5">₦${Number(product.price).toLocaleString()}</p>
              </div>

              <button type="button"
                class="cart-btn btn btn-outline-success w-100 py-3 fs-5"
                data-product-id="${productId}"
                data-product-name="${product.name}"
                data-product-price="${product.price}"
                data-product-image="${imageSrc}">
                Add To Cart
              </button>
            </div>
          </div>
        `;
        productsRow.appendChild(col);
      });

      // ✅ Immediately update cart buttons to reflect cart state
      syncCartButtons();
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

async function backFiveProducts() {
  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    console.log("Products:", products);

    const carousels = ["backFive"];
    const toShow = Array.isArray(products) ? products.slice(-5) : [];

    carousels.forEach(id => {
      const productsRow = document.getElementById(id);
      if (!productsRow) return;

      productsRow.innerHTML = "";
      toShow.forEach(product => {
        const productId = String(product._id || product.id || product.name.replace(/\s+/g, "-"));
        const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image;

        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-3 mb-4";
        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${imageSrc}" alt="${product.name}"
                 class="card-img-top product-img product-link px-lg-0 px-2"
                 data-product-id="${productId}"
                 onclick="goToProductDetails('${productId}')">

            <div class="card-body">
              <div class="d-flex justify-content-between mt-3">
                <p>${product.name}</p>
                <div>
                  <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0F0B0B;"></i></a>
                </div>
              </div>

              <p class="card-title fs-5 fw-bold">${product.name}</p>

              <div class="d-flex justify-content-between">
                <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #F58634;"></i>5.0 (18)</p>
                <p class="fs-5">₦${Number(product.price).toLocaleString()}</p>
              </div>

              <button type="button"
                class="cart-btn btn btn-outline-success w-100 py-3 fs-5"
                data-product-id="${productId}"
                data-product-name="${product.name}"
                data-product-price="${product.price}"
                data-product-image="${imageSrc}">
                Add To Cart
              </button>
            </div>
          </div>
        `;
        productsRow.appendChild(col);
      });

      // ✅ Sync buttons with cart state right away
      syncCartButtons();
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}



 


const CART_KEY = "site_cart_v1";
let cart = [];

// -------------------- Toast Setup --------------------
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

let toastOffset = 0;
function showStackedToast(icon, title) {
  Toast.fire({
    icon,
    title,
    didOpen: (toast) => {
      toast.style.marginTop = `${toastOffset}px`;
      toastOffset += 60;

      toast.addEventListener("animationend", () => {
        toastOffset = 0;
      });
    }
  });
}

// -------------------- Cart helpers --------------------
function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    cart = [];
  }    
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  syncCartButtons();
  renderCartPage();
  document.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
}

function findItem(id) {
  return cart.find(i => String(i.id) === String(id));
}

function isInCart(id) {
  return !!findItem(id);
}

function addToCart(product) {
  const existing = findItem(product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: String(product.id),
      name: product.name,
      price: Number(product.price || 0),
      image: product.image || "",
      quantity: 1
    });
  }
  saveCart();
  showStackedToast("success", `${product.name} added to cart`);
}

function removeFromCart(id) {
  const item = findItem(id);
  cart = cart.filter(i => String(i.id) !== String(id));
  saveCart();
  if (item) {
    showStackedToast("error", `${item.name} removed from cart`);
  }
}

function setQty(id, qty) {
  const item = findItem(id);
  if (!item) return;
  item.quantity = Number(qty);
  if (item.quantity <= 0) removeFromCart(id);
  else saveCart();
}

function toggleCart(product) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    Swal.fire({
      icon: 'warning',
      text: 'You must be logged in to add items to cart',
      confirmButtonColor: '#F58634'
    }).then(() => {
      location.href = "/landingpages/login.html";
    });
    return;
  }

  if (isInCart(product.id)) {
    removeFromCart(product.id);
  } else {
    addToCart(product);
  }
}

// -------------------- UI sync --------------------
function updateCartCount() {
  if (typeof cart === 'undefined') return;
  const totalProducts = cart.length;
  const counters = document.querySelectorAll('#cartCount, #cartCount1, .cart-count');
  counters.forEach(el => {
    el.textContent = totalProducts;
  });
}

function syncCartButtons() {
  document.querySelectorAll(".cart-btn[data-product-id], .add-cart[data-product-id]").forEach(btn => {
    const pid = btn.dataset.productId;
    if (isInCart(pid)) {
      btn.textContent = "Remove From Cart";
      btn.classList.remove("btn-outline-success");
      btn.classList.add("btn-danger");
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.textContent = "Add To Cart";
      btn.classList.remove("btn-danger");
      btn.classList.add("btn-outline-success");
      btn.setAttribute("aria-pressed", "false");
    }
  });
}




// -------------------- Product rendering --------------------
function renderProducts(products, containerId = "productsRow") {
  const container = document.getElementById(containerId) || document.getElementById("productContainer");
  if (!container) return;

  container.innerHTML = "";
  products.forEach(product => {
    const productId = String(product._id || product.id || product.name.replace(/\s+/g, "-"));

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3 mb-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img 
          src="${Array.isArray(product.image) ? product.image[0] : (product.image || '')}"
          alt="${escapeHtml(product.name)}"
          class="card-img-top product-img product-link"
          data-product-id="${productId}"
          id="imageReveal"
        >
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between mt-1 mb-2">
            <small class="text-muted">Category</small>
            <a href="#" class="text-dark"><i class="fa-regular fa-heart fa-lg"></i></a>
          </div>
          <p class="card-title fs-5 fw-bold mb-2">${escapeHtml(product.name)}</p>
          <div class="d-flex justify-content-between align-items-center mb-3 ">
            <div class="small text-muted"><i class="fa-solid fa-star me-1" style="color:#f58634"></i>5.0 (18)</div>
            <div class="fs-5">₦${Number(product.price || 0).toLocaleString()}</div>
          </div>

          <button 
            type="button"
            class="cart-btn btn btn-outline-success mt-auto w-100 py-3 fs-5"
            data-product-id="${productId}"
            data-product-name="${escapeHtml(product.name)}"
            data-product-price="${product.price}"
            data-product-image="${Array.isArray(product.image) ? product.image[0] : (product.image || '')}">
            Add To Cart
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  syncCartButtons();
}

// -------------------- Cart page rendering --------------------
function renderCartPage() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!container) return;

  container.innerHTML = "";
  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty</p>";
    if (totalEl) totalEl.textContent = "₦0";
    return;
  }

  cart.forEach(item => {
    const lineTotal = Number(item.price || 0) * Number(item.quantity || 1);

    const row = document.createElement("div");
    row.className = "d-flex align-items-center justify-content-between p-2 border-bottom flex-wrap";
    row.style.gap = "12px";
    row.innerHTML = `
      <div class="d-flex align-items-center" style="gap:12px;">
        <img src="${item.image || "https://via.placeholder.com/80"}" alt="${escapeHtml(item.name)}" width="80" height="60" style="object-fit:cover;">
        <div>
          <strong>${escapeHtml(item.name)}</strong><br>
          ₦${lineTotal.toLocaleString()}
          <small class="text-muted d-block">(₦${Number(item.price || 0).toLocaleString()} each)</small>
        </div>
      </div>

      <div class="d-flex align-items-center" style="gap:10px;">
        <div class="input-group input-group-sm" style="width:110px;">
          <button class="btn btn-outline-secondary qty-btn" data-id="${item.id}" data-change="-1">−</button>
          <input type="text" readonly class="form-control text-center" value="${item.quantity}">
          <button class="btn btn-outline-secondary qty-btn" data-id="${item.id}" data-change="1">+</button>
        </div>

        <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    `;
    container.appendChild(row);
  });

  const total = cart.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0);
  if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`;
}

// -------------------- Fetching --------------------
async function loadProductsFromApi() {
  const containerExists = document.getElementById("productsRow") || document.getElementById("productContainer");
  if (!containerExists) return;

  try {
    const res = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!res.ok) throw new Error("Failed to fetch products: " + res.status);
    const products = await res.json();
    const list = Array.isArray(products) ? products : (products.data || []);
    renderProducts(list, "productsRow");
  } catch (err) {
    console.error("Error loading products:", err);
    const container = document.getElementById("productsRow") || document.getElementById("productContainer");
    if (container) container.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
  }
}

// -------------------- Utilities --------------------
function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// -------------------- Event delegation --------------------
document.addEventListener("click", (e) => {
  const cartBtn = e.target.closest(".cart-btn[data-product-id], .add-cart[data-product-id]");
  if (cartBtn) {
    const product = {
      id: cartBtn.dataset.productId,
      name: cartBtn.dataset.productName,
      price: parseFloat(cartBtn.dataset.productPrice) || 0,
      image: cartBtn.dataset.productImage || ""
    };
    toggleCart(product);
    return;
  }

  const productLink = e.target.closest(".product-link[data-product-id]");
  if (productLink) {
    const pid = productLink.dataset.productId;
    if (typeof window.goToProductDetails === "function") {
      window.goToProductDetails(pid);
    } else {
      window.location.href = `./product.html?id=${encodeURIComponent(pid)}`;
    }
    return;
  }

  const removeBtn = e.target.closest(".remove-btn[data-id]");
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    removeFromCart(id);
    return;
  }

  const qtyBtn = e.target.closest(".qty-btn[data-id][data-change]");
  if (qtyBtn) {
    const id = qtyBtn.dataset.id;
    const change = Number(qtyBtn.dataset.change || 0);
    const item = findItem(id);
    if (item) {
      setQty(id, (Number(item.quantity || 1) + change));
    }
    return;
  }
});

// -------------------- Init on page load --------------------
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
  syncCartButtons();
  renderCartPage();
  loadProductsFromApi();
});

window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY) {
    loadCart();
    updateCartCount();
    syncCartButtons();
    renderCartPage();
  }
});

