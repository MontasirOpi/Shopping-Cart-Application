let cartItems = [];

export function addToCart(product, quantity) {
  const existingItem = cartItems.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ product, quantity });
  }
}

export function removeCartItem(productId) {
  cartItems = cartItems.filter(item => item.product.id !== productId);
}

export function clearCart() {
  cartItems = [];
}

export function getCartItems() {
  return cartItems;
}
