// js/cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name, price: parseFloat(price), quantity: 1, image });
    }
    updateCart();
    updateCartIcon();
    showModal(`${name} has been added to your cart.`);
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartIcon.setAttribute('data-count', itemCount);
        cartIcon.style.display = itemCount > 0 ? 'inline-block' : 'none';
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    displayCart();
}

function clearCart() {
    cart = [];
    updateCart();
    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal-amount');
    const totalElement = document.getElementById('total-amount');

    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <p class="cart-item-total">$${itemTotal.toFixed(2)}</p>
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            `;
        });
    }

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            updateCart();
            displayCart();
        }
    }
}

function showModal(message) {
    const modal = document.getElementById('add-to-cart-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('add-to-cart-modal');
    modal.style.display = 'none';
}

function goToCart() {
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
});

// Make sure these functions are globally accessible
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.closeModal = closeModal;
window.goToCart = goToCart;