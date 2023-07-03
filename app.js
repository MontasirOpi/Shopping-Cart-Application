import products from './product.js';
import { addToCart, removeCartItem, clearCart, getCartItems } from './cart.js';

// DOM Elements
const productContainer = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');

// Render product list
function renderProducts() {
  productContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: $${product.price}</p>
          <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

// Render cart items
function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  getCartItems().forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.product.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.product.price}</td>
      <td>$${item.quantity * item.product.price}</td>
      <td><button class="btn btn-danger remove-item" data-product-id="${item.product.id}">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });
}

// Calculate and render cart total
function renderCartTotal() {
  const total = getCartItems().reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  cartTotalElement.textContent = total.toFixed(2);
}

// Event listeners
productContainer.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const productId = parseInt(e.target.dataset.productId);
    const product = products.find(p => p.id === productId);
    addToCart(product, 1);
    renderCartItems();
    renderCartTotal();
  }
});

cartItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('remove-item')) {
    const productId = parseInt(e.target.dataset.productId);
    removeCartItem(productId);
    renderCartItems();
    renderCartTotal();
  }
});

clearCartButton.addEventListener('click', () => {
  clearCart();
  renderCartItems();
  renderCartTotal();
});

// Initial render
renderProducts();
renderCartItems();
renderCartTotal();
