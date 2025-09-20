function checkOut() {
    location.href = 'checkout.html'
};

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
                        location.href = '../login.html'
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

// login api
function logIn(event) {
    event.preventDefault();
    const spin = document.querySelector('.spin');
    const fancy = document.getElementById('fancy');
    spin.style.display = 'inline-block';
    fancy.style.pointerEvents = 'none';

    getEmail = document.getElementById('email').value;
    getPassword = document.getElementById('password').value;

    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            title: 'All fields are required',
            confirmButtonColor: '#F58634'
        })
        spin.style.display = 'none';
        fancy.style.pointerEvents = 'auto';
    }

    else {
         const signData = {
            email: getEmail,
            password: getPassword
        };

        const signMethod = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signData)
        };

        const url = 'http://localhost:3001/amazon/document/api/login';

        fetch(url, signMethod) 
            .then(response => response.json())
            .then(result => {
                console.log(result) 
                  if (result.hasOwnProperty("email")) {
                localStorage.setItem("key", result.token)
                location.href = "./index.html"
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
            })
            .catch(error => {
                console.log('error', error) 
                Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: "#2D85DE"
            })
            });
            // .then(res => res.json())
            // .then(token => {
            //     console.log("JWT Token:", token);
            //       setTimeout(() => {
            //             location.href = './index.html'
            //         }, 3000)
            // })
            //  .catch(err => console.error("Error:", err));
                    
    }
}




  // Fetch and display products
//   async function showProducts() {
//     try {
//       const response = await fetch('http://localhost:3001/amazon/document/api/products');
//       const products = await response.json();
//       const productsRow = document.getElementById('productsRow');
//       productsRow.innerHTML = ''; // Clear before adding
//       products.forEach(product => {
//         const col = document.createElement('div');
//         col.className = 'col-md-6 col-lg-3 mb-4';
//         col.innerHTML = `
//           <div class="card h-100 shadow-sm">
//             <img src="${Array.isArray(product.image) ? product.image[0] : product.image}"
//                alt="${product.name}"
//                class="card-img-top product-img"
//                onclick="productDetails(${product.Id})">
//             <div class="card-body">
//                 <h5 class=""></h5>
//                     <div class="d-flex justify-content-between mt-3"><p class="">Coconut Flakes</p>
//                     <div>
//                     <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0f0b0b;"></i></a>
//                     </div>
//                 </div>
//                 <p class = "card-title fs-5 fw-bold">${product.name}</p>
//               <div class="d-flex justify-content-between">
//                 <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #f58634;"></i>5.0 (18)</p>
//                 <p class="fs-5">₦${product.price}</p>
//                 </div>
//                 <button type="button" class="btn btn-outline-success w-100 py-3 fs-5">Add To Cart</button>
//                 </div>
//           </div>
//         `;
//         productsRow.appendChild(col);
//       });
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       }
      
// };

// async function showProducts() {
//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/products");
//     if (!response.ok) throw new Error("Failed to fetch products");
//     const products = await response.json();
//     console.log("Products:", products); // Debugging
//     const productsRow = document.getElementById("productsRow");
//     productsRow.innerHTML = ""; // Clear before adding
//     products.forEach(product => {
//       const col = document.createElement("div");
//       col.className = "col-md-6 col-lg-3 mb-4";
//       col.innerHTML = `
//         <div class="card h-100 shadow-sm">
//           <img src="${Array.isArray(product.image) ? product.image[0] : product.image}"
//                alt="${product.name}"
//                class="card-img-top product-img"
//                onclick="productDetails(${product.id})">
//           <div class="card-body">
//             <h5 class="card-title fs-5 fw-bold">${product.name}</h5>
//             <p class="card-text">${product.description || "No description available"}</p>
//             <p class="text-primary fw-bold">$${product.price ?? "0.00"}</p>
//           </div>
//         </div>
//       `;
//       productsRow.appendChild(col);
//     });
//   } catch (error) {
//     console.error("Error loading products:", error);
//   }
// }

async function fiveProducts() {
    try {
        const response = await fetch('http://localhost:3001/amazon/document/api/fiveproducts');
        const products = await response.json();
        const carousel = document.querySelector('.carousel');
        const carousel2 = document.querySelector('.carousel2');
    
        products.forEach(fiveProducts => {
            const card = document.createElement('div');
            card.className = 'cards';
            card.innerHTML = `
           <div class = "prodimg">
                      <img src= "${fiveProducts.image}" alt="" />
                      </div>
                       <div class="card-body">
                <h5 class=""></h5>
                    <div class="d-flex justify-content-between mt-3"><p class="">Coconut Flakes</p>
                    <div>
                    <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0f0b0b;"></i></a>
                    </div>
                </div>
                <p class = "card-title fs-5 fw-bold">${fiveProducts.name}</p>
                      <div class="d-flex justify-content-between mt-3">
                <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #f58634;"></i>5.0 (18)</p>
                <p class="fs-5">₦${fiveProducts.price}</p>
                </div>
                <button type="button" class="btn btn-outline-success w-100 py-3 fs-5">Add To Cart</button>
                      </div>
            `;
            carousel.appendChild(card);
            carousel2.appendChild(card.cloneNode(true)); 
        });
    } catch (error) {
        console.error('Error fetching five products:', error);
    }
}

// async function productDetails(id) {
//   try {
//     const res = await fetch(`http://localhost:3001/amazon/document/api/products/${id}`);
//     if (!res.ok) throw new Error("Product not found");
//     const product = await res.json();
//     console.log("Product:", product); // Debugging
//     document.getElementById("productName").textContent = product.name || "Unnamed Product";
//     document.getElementById("productPrice").textContent = product.price ? `$${product.price}` : "No price";
//     document.getElementById("productDescription").textContent = product.description || "No description";
//     const imagesDiv = document.getElementById("productImages");
//     imagesDiv.innerHTML = "";
//     (Array.isArray(product.image) ? product.image : [product.image]).forEach((src, i) => {
//       if (!src) return; // Skip if no image
//       const img = document.createElement("img");
//       img.src = src;
//       img.alt = `${product.name} ${i + 1}`;
//       img.loading = "lazy";
//       img.style.maxWidth = "200px";
//       img.style.marginRight = "8px";
//       imagesDiv.appendChild(img);
//     });
//   } catch (error) {
//     document.body.innerHTML = "<h2>Product not found</h2>";
//     console.error("Error loading product:", error);
//   }
// }

// function goToProductDetails(id) {
//   location.href = `product-details.html?id=${id}`;
// }



async function fiveProduct() {
    try {
        const response = await fetch('http://localhost:3001/amazon/document/api/fiveproducts');
        const products = await response.json();
        const carouse = document.querySelector('.carousel3');
    
        products.forEach(fiveProducts => {
            const card = document.createElement('div');
            card.className = 'cards';
            card.innerHTML = `
           <div class= "cardAnimate">
           <div class = "prodimg">
                      <img src= "${fiveProducts.image}" alt="" id="imageReveal" />
                      </div>
                       <div class="card-body">
                <h5 class=""></h5>
                    <div class="d-flex justify-content-between mt-3"><p class="">Coconut Flakes</p>
                    <div>
                    <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0f0b0b;"></i></a>
                    </div>
                </div>
                <p class = "card-title fs-5 fw-bold">${fiveProducts.name}</p>
                      <div class="d-flex justify-content-between mt-3">
                <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #f58634;"></i>5.0 (18)</p>
                <p class="fs-5">₦${fiveProducts.price}</p>
                </div>
                <button type="button" class="btn btn-outline-success w-100 py-3 fs-5">Add To Cart</button>
                </div>
                <div class= "mb-5"></div>
           </div>
            `;
            carouse.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching five products:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showProducts();
    fiveProducts();
    fiveProduct(); 
})

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id) {
    productDetails(id); // Load single product
  } else {
      showProducts(); // Load all products
    }
    
});
// ----------------------
// Show all products
// ----------------------
async function showProducts() {
  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    console.log("Products:", products);
    const productsRow = document.getElementById("productsRow");
    if (!productsRow) return;
    productsRow.innerHTML = "";
    products.forEach(product => {
      // Prefer MongoDB _id, fallback to id
      const productId = product._id || product.id;
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3 mb-4";
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${Array.isArray(product.image) ? product.image[0] : product.image}"
               alt="${product.name}"
               class="card-img-top product-img"
               id= "imageReveal"
               onclick="goToProductDetails('${productId}')">
         <div class="card-body">
                <h5 class=""></h5>
                    <div class="d-flex justify-content-between mt-3"><p class="">Coconut Flakes</p>
                    <div>
                    <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0f0b0b;"></i></a>
                    </div>
                </div>
                <p class = "card-title fs-5 fw-bold">${product.name}</p>
              <div class="d-flex justify-content-between">
                <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #f58634;"></i>5.0 (18)</p>
              <p class="fs-5">₦${product.price}</p>
            </div>
            <button type="button" class="btn btn-outline-success w-100 py-3 fs-5">Add To Cart</button>
        </div>
      `;
      productsRow.appendChild(col);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}
// ----------------------
// Show product details
// ----------------------
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
// ----------------------
// Redirect helper
// ----------------------
function goToProductDetails(id) {
  location.href = `product-details.html?id=${id}`;
}