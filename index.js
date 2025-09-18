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
  async function showProducts() {
    try {
      const response = await fetch('http://localhost:3001/amazon/document/api/products');
      const products = await response.json();
      const productsRow = document.getElementById('productsRow');
      productsRow.innerHTML = ''; // Clear before adding
      products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3 mb-4';
        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${product.image}" class="card-img-top product-img" id= "imageReveal" alt="${product.name}"">
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
          </div>
        `;
        productsRow.appendChild(col);
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
{/* <p class="card-title fs-4">${product.name}</p> */}
// async function showProducts() {
//   try {
//     const response = await fetch('http://localhost:3001/amazon/document/api1/products');
//     const products = await response.json();
//     const productsRow = document.getElementById('productsRow');
    
//     products.forEach(product => {
//       const col = document.createElement('div');
//       col.className = 'col-md-3 mb-4';
//       col.innerHTML = `
//         <div class="card h-100 shadow-sm">
//           <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
//           <div class="card-body">
//             <h5 class="card-title">${product.name}</h5>
//             <p class="card-text text-muted">${product.description.substring(0, 100)}...</p>
//             <p class="fw-bold">₦${product.price}</p>
//             <p><small>Stock: ${product.numberInStock}</small></p>
//             <p><small>Stars: ${product.rating || 'N/A'}</small></p>
//           </div>
//         </div>
//       `;
//       productsRow.appendChild(col);
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   showProducts();
// });