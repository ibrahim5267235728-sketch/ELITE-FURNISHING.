// ===========================
// MOBILE MENU
// ===========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});



// ================================
// UPDATE CART COUNTER
// ================================

function updateCartCounter() {

    const cartCounter =
        document.getElementById("cartCount");

    if (!cartCounter) return;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.qty;
    });

    cartCounter.innerText = totalItems;
}


// ================================
// LOAD CART
// ================================

function loadCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalPrice =
        document.getElementById("totalPrice");

    if (!cartItems) return;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="cart-empty">

            <h2>Your Cart Is Empty</h2>

            <p>Add products from Products page.</p>

        </div>

        `;

        if (totalPrice) {
            totalPrice.innerText = "$0";
        }

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p class="price">$${item.price}</p>

            </div>

            <div class="quantity-box">

                <button
                    class="qty-btn"
                    onclick="changeQty(${index}, -1)">
                    -
                </button>

                <span class="qty">
                    ${item.qty}
                </span>

                <button
                    class="qty-btn"
                    onclick="changeQty(${index}, 1)">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                <i class="fas fa-trash"></i>

            </button>

        </div>

        `;

    });

    if (totalPrice) {
        totalPrice.innerText = "$" + total;
    }
}


// ================================
// CHANGE QUANTITY
// ================================

function changeQty(index, change) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty += change;

    if (cart[index].qty < 1) {
        cart[index].qty = 1;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
    updateCartCounter();
}


// ================================
// REMOVE ITEM
// ================================

function removeItem(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
    updateCartCounter();
}


// ================================
// PAGE LOAD
// ================================

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    updateCartCounter();

});



// ================================
// ODER SUMMRY
// ================================


const checkoutBtn =
document.getElementById("checkoutBtn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", () => {

        let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

        if(cart.length === 0){

            alert(
            "Your cart is empty. Please add products first."
            );

            return;
        }

        checkoutBtn.innerText =
        "Order Placed ✓";

        checkoutBtn.style.background =
        "green";

        alert(
        "Thank you for your order! Your order has been placed successfully."
        );

        setTimeout(()=>{

            localStorage.removeItem("cart");

            window.location.reload();

        },2000);

    });

}




// ===========================
// SCROLL ANIMATION
// ===========================

const revealElements = document.querySelectorAll(
    ".card, .blog-card, .service-card, .category-card, .info-card"
);

function revealOnScroll() {

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < window.innerHeight - 100) {
            element.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// ===========================
// COUNTER ANIMATION
// ===========================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;

        const count = +counter.innerText;

        const increment = Math.ceil(target / 100);

        if (count < target) {

            counter.innerText = count + increment;

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});


// ===========================
// PRODUCT SEARCH
// ===========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const title =
                card.querySelector("h3").innerText.toLowerCase();

            card.style.display =
                title.includes(value) ? "block" : "none";

        });

    });

}


// ===========================
// PRODUCT FILTER
// ===========================

const categoryFilter =
    document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", () => {

        const value = categoryFilter.value;

        document.querySelectorAll(".product-card")
            .forEach(card => {

                if (
                    value === "all" ||
                    card.dataset.category === value
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

    });

}


// ===========================
// GALLERY LIGHTBOX
// ===========================

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.querySelector(".lightbox");

const lightboxImg =
    document.getElementById("lightboxImg");

const closeLightbox =
    document.querySelector(".close-lightbox");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        if (lightbox && lightboxImg) {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        }

    });

});

if (closeLightbox) {

    closeLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}


// ===========================
// CONTACT FORM WITH SAVE SYSTEM
// ===========================

const contactForm =
document.getElementById("contactForm");

if(contactForm){

    const name =
    document.getElementById("name");

    const email =
    document.getElementById("email");

    const phone =
    document.getElementById("phone");

    const message =
    document.getElementById("message");

    const submitBtn =
    contactForm.querySelector("button");

    // LOAD SAVED DATA

    if(localStorage.getItem("contactData")){

        const savedData =
        JSON.parse(
        localStorage.getItem("contactData")
        );

        name.value = savedData.name || "";
        email.value = savedData.email || "";
        phone.value = savedData.phone || "";
        message.value = savedData.message || "";
    }

    // AUTO SAVE

    [name,email,phone,message].forEach(field=>{

        field.addEventListener("input", ()=>{

            localStorage.setItem(
            "contactData",

            JSON.stringify({

                name:name.value,
                email:email.value,
                phone:phone.value,
                message:message.value

            })

            );

        });

    });

    // SUBMIT

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(
            name.value.trim()==="" ||
            email.value.trim()==="" ||
            phone.value.trim()==="" ||
            message.value.trim()===""
        ){

            alert("Please fill all fields.");
            return;
        }

        if(!emailPattern.test(email.value)){

            alert("Please enter a valid email.");

            email.style.border =
            "2px solid red";

            return;
        }

        name.style.border =
        "2px solid green";

        email.style.border =
        "2px solid green";

        phone.style.border =
        "2px solid green";

        message.style.border =
        "2px solid green";

        submitBtn.innerText =
        "Message Sent ✓";

        submitBtn.style.background =
        "green";

        alert(
        "Thank you! Your message has been sent successfully."
        );

        setTimeout(()=>{

            localStorage.removeItem(
            "contactData"
            );

            contactForm.reset();

            submitBtn.innerText =
            "Send Message";

            submitBtn.style.background =
            "#d4a373";

            name.style.border = "";
            email.style.border = "";
            phone.style.border = "";
            message.style.border = "";

        },2000);

    });

}



// ===========================
// QUANTITY BUTTONS
// ===========================

document.querySelectorAll(".plus")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            const qty =
                btn.parentElement.querySelector(".qty");

            qty.innerText =
                parseInt(qty.innerText) + 1;

            updateTotal();

        });

    });

document.querySelectorAll(".minus")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            const qty =
                btn.parentElement.querySelector(".qty");

            if (parseInt(qty.innerText) > 1) {

                qty.innerText =
                    parseInt(qty.innerText) - 1;

                updateTotal();

            }

        });

    });







// ===========================
// NEWSLETTER SUBSCRIBE
// ===========================

const newsletterForm =
document.getElementById("newsletterForm");

if(newsletterForm){

    newsletterForm.addEventListener("submit", function(e){

        e.preventDefault();

        const emailInput =
        document.getElementById("newsletterEmail");

        const email =
        emailInput.value.trim();

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Empty Field

        if(email === ""){

            emailInput.style.border =
            "2px solid red";

            alert("Please enter your email address.");

            return;
        }

        // Invalid Email

        if(!emailPattern.test(email)){

            emailInput.style.border =
            "2px solid red";

            alert("Please enter a valid email address.");

            return;
        }

        // Success Effect

        emailInput.style.border =
        "2px solid green";

        const button =
        newsletterForm.querySelector("button");

        button.innerText =
        "Subscribed ✓";

        button.style.background =
        "green";

        alert(
        "Thank you for subscribing to Elite Furnishings Newsletter!"
        );

        setTimeout(()=>{

            newsletterForm.reset();

            button.innerText =
            "Subscribe";

            button.style.background =
            "#d4a373";

            emailInput.style.border =
            "none";

        },2000);

    });

}




// ================================
// ADD TO CART
// ================================

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,
            price: parseInt(button.dataset.price),
            image: button.dataset.image,
            qty: 1

        };

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existing =
            cart.find(item => item.name === product.name);

        if(existing){

            existing.qty++;

        }else{

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // UPDATE COUNTER
        updateCartCounter();

        // ALERT
        alert(product.name + " added to cart!");

        // BUTTON EFFECT
        const oldText = button.innerText;

        button.innerText = "Added ✓";
        button.style.background = "green";
        button.style.color = "white";

        setTimeout(() => {

            button.innerText = oldText;
            button.style.background = "";
            button.style.color = "";

        }, 1500);

        // CART COUNTER BOUNCE
        const cartCount =
            document.getElementById("cartCount");

        if(cartCount){

            cartCount.classList.add("cart-bounce");

            setTimeout(() => {

                cartCount.classList.remove("cart-bounce");

            }, 600);

        }

        // CART ICON SHAKE
        const cartIcon =
            document.getElementById("cartIcon");

        if(cartIcon){

            cartIcon.classList.add("cart-shake");

            setTimeout(() => {

                cartIcon.classList.remove("cart-shake");

            }, 600);

        }

    });

});



// ================================
// ALL BUTTON WITH GREEN EFFECT 
// ================================




document.querySelectorAll(".action-btn")
.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        const originalText =
        this.innerText;

        this.innerText =
        "Loading ...";

        this.style.background =
        "green";

        alert("Opening Elite Furnishings Collection.");

        setTimeout(() => {

            window.location.href =
            this.href;

        }, 1000);

    });

});




// ================================
// LOAD MORE BTN EFFECT 
// ================================


document.querySelectorAll(".load-more-btn").forEach(btn => {

    btn.addEventListener("click", function() {

        const oldText = this.innerText;

        this.innerText = "Articles Loaded ✓";
        this.style.background = "green";
        this.style.transform = "scale(1.1)";

        setTimeout(() => {

            this.innerText = oldText;
            this.style.background = "";
            this.style.transform = "";

        }, 2000);

    });

});


