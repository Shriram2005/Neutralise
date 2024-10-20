const btn = document.querySelector(".side-menu");
const blackEffect = document.querySelector(".black-effect");

// side menu toggle working & black effect
function sideSwipe() {
    if (btn.style.right == "0px") {
        btn.style.right = "-300px";
        document.querySelector(".black-effect").style.display = "none";
    } else {
        btn.style.right = "0px";
        document.querySelector(".black-effect").style.display = "block";
    }
}

// For top Images
const sliderImages = document.querySelectorAll('.slider-img');
let currentImageIndex = 0;

function changeImage() {
    sliderImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    sliderImages[currentImageIndex].classList.add('active');
}

// Initial call to set the first image
sliderImages[0].classList.add('active');

// Change image every 5 seconds
setInterval(changeImage, 5000);

// remove black effect
function removeBlack() {
    btn.style.right = "-300px";
    blackEffect.style.display = "none";
}

function toggleDropdown(event) {
    event.preventDefault();
    const dropdownContent = event.target.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

document.addEventListener('DOMContentLoaded', function() {
    const journeyItems = document.querySelectorAll('.journey-content');

    journeyItems.forEach(item => {
        item.addEventListener('click', function() {
            this.querySelector('p').style.display =
                this.querySelector('p').style.display === 'none' ? 'block' : 'none';
        });
    });



    // Auto-sliding testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    // Clone testimonial cards and append to the container
    testimonialCards.forEach(card => {
        const clone = card.cloneNode(true);
        testimonialsContainer.appendChild(clone);
    });

    // Update animation duration based on the number of cards
    const totalCards = testimonialsContainer.children.length;
    const cardWidth = 320; // card width + margin
    const animationDuration = totalCards * 5; // 5 seconds per card

    testimonialsContainer.style.animation = `slide ${animationDuration}s linear infinite`;

    // Add this function to your existing script.js file

    function setupInfiniteScroll() {
        const productRows = document.querySelectorAll('.products-row');

        productRows.forEach((row, index) => {
            // Clone the products
            const products = row.querySelectorAll('.product-card');
            products.forEach(product => {
                const clone = product.cloneNode(true);
                row.appendChild(clone);
            });

            // Set the animation
            const direction = index % 2 === 0 ? 'Left' : 'Right';
            row.style.animation = `scroll${direction} ${products.length * 5}s linear infinite`;

            // Pause animation on hover
            row.addEventListener('mouseenter', () => {
                row.style.animationPlayState = 'paused';
            });

            row.addEventListener('mouseleave', () => {
                row.style.animationPlayState = 'running';
            });
        });
    }

    // Call this function when the DOM is loaded
    setupInfiniteScroll();
});