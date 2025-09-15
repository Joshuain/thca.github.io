// Basic Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    attachEventListeners();

    // Cart modal
    const modal = document.getElementById('cartModal');
    const cartIcon = document.getElementById('cartIcon');
    const closeBtn = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkout');

    cartIcon.addEventListener('click', () => {
        modal.style.display = 'block';
        displayCart();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would integrate with a payment gateway here.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
        modal.style.display = 'none';
    });
});

function attachEventListeners() {
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.dataset.product;
            const price = parseFloat(e.target.dataset.price);
            addToCart(product, price);
        });
    });
}

function addToCart(product, price) {
    const item = { product, price, quantity: 1 };
    const existing = cart.find(i => i.product === product);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product} added to cart!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => 
        `<div>${item.product} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</div>`
    ).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}