console.log("script loaded");

// function closeNotification() {
//     document.getElementById('contactNotification').style.display = 'none';
// }
function closeNotification() {
    document.getElementById('contactNotification').style.display = 'none';
}



// Script for navigation bar

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
//close button
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}




//js  practice

// var mainImg  = document.getElementById("mainImg");
// var smallImg = document.getElementsByClassName("small-img");

// smallImg[0].onclick = function(){
//     mainImg.src = smallImg[0].src;
// }

// smallImg[1].onclick = function(){
//     mainImg.src = smallImg[1].src;
// }
// smallImg[2].onclick = function(){
//     mainImg.src = smallImg[2].src;
// }


// contact form  validation 
    // 1. Select the form and elements
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const errorMsg = document.getElementById('error-msg');

        // 2. Add Event Listener
if (form) {
    form.addEventListener('submit', (e) => {

        // Reset error messages/styles on every click
        let messages = [];
        errorMsg.style.display = 'none';
        nameInput.style.border = "1px solid #e1e1e1";
        emailInput.style.border = "1px solid #e1e1e1";

        // --- VALIDATION LOGIC ---

        // Check if Name is empty
        if (nameInput.value.trim() === '') {
            messages.push("Name is required");
            nameInput.style.border = "1px solid red";
        }

        // Check Email (Must contain '@' and not be empty)
        // We trim() to remove accidental spaces
        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            messages.push("Email is required");
            emailInput.style.border = "1px solid red";
        } else if (!emailValue.includes('@')) {
            messages.push("Email must contain an '@' sign");
            emailInput.style.border = "1px solid red";
        } else if (emailValue.length < 5) {
            messages.push("Email is too short");
            emailInput.style.border = "1px solid red";
        }

        // Check Subject
        if (subjectInput.value.trim() === '') {
            messages.push("Subject is required");
        }

        // Check Message
        if (messageInput.value.trim() === '') {
            messages.push("Message cannot be empty");
        }

        // --- FINAL DECISION ---

        // If we have any error messages, stop the form
        if (messages.length > 0) {
            e.preventDefault(); // STOPS the form from refreshing/submitting
            errorMsg.innerText = messages.join(', '); // Show errors separated by comma
            errorMsg.style.display = 'block'; // Reveal the error text
        } else {
            // Form is valid!
            // e.preventDefault(); // Uncomment this line if you want to stop reload even on success (for testing)
            alert("Form Submitted Successfully!");
        }
    });
}
// dark mode 
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeToggleBtn) return;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.classList.remove('fa-moon');
        themeToggleBtn.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.classList.remove('fa-moon');
            themeToggleBtn.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.classList.remove('fa-sun');
            themeToggleBtn.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});



// DYNAMIC GREETING & DATE
function setGreeting() {
    const greetingBox = document.getElementById('greeting-box');
    const now = new Date();
    const hours = now.getHours();
    
    let greetingText = '';

    // Logic for Morning, Afternoon, Evening
    if (hours < 12) {
        greetingText = 'Good Morning ';
    } else if (hours >= 12 && hours < 17) {
        greetingText = 'Good Afternoon ';
    } else {
        greetingText = 'Good Evening ';
    }

    // Format the date (e.g., Saturday, Dec 13, 2025)
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    // Inject into HTML
    greetingBox.innerHTML = `${greetingText}, today is <span>${dateString}</span>`;
}

// Run the function when the page loads
window.onload = setGreeting;


// CART COUNTER 
// --- SHOPPING CART COUNT LOGIC ---

// 1. Select all 'Add to Cart' buttons (the icons in your product cards)
const cartButtons = document.querySelectorAll('.cart');

// 2. Select the badge spans (we have two: one for desktop, one for mobile)
const cartBadges = document.querySelectorAll('.cart-badge');

// 3. Initialize count from LocalStorage (so data persists on refresh)
let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// Function to update the number on the screen
function updateCartDisplay() {
    cartBadges.forEach(badge => {
        badge.innerText = cartCount;
    });
}

// Run immediately to show saved number on page load
updateCartDisplay();

// 4. Add Click Event Listeners to every cart icon
cartButtons.forEach(button => {
    // We attach the listener to the parent <a> tag to prevent the page from jumping
    button.parentElement.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the link from reloading the page
        
        // Increase count
        cartCount++;
        
        // Save to browser memory
        localStorage.setItem('cartCount', cartCount);
        
        // Update the screen
        updateCartDisplay();
        
        // Optional: Simple alert feedback
        // alert("Item added to cart!"); 
        
        // Optional: Console log for testing
        console.log("Current Cart Count: " + cartCount);
    });
});