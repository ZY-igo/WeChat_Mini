const { mockRequest } = require("../core/http");
const { getProductById, getAllProducts } = require("../mock/shopData");
const cartStore = require("../store/cartStore");

function buildCartSummary() {
  const cartMap = cartStore.getCartMap();
  const items = Object.keys(cartMap)
    .map((id) => {
      const product = getProductById(id);
      const quantity = cartMap[id];

      if (!product || quantity <= 0) {
        return null;
      }

      return {
        ...product,
        quantity,
        subtotal: Number((product.price * quantity).toFixed(2))
      };
    })
    .filter(Boolean);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
  const originalAmount = items.reduce((sum, item) => sum + item.quantity * item.originalPrice, 0);

  return {
    items,
    totalCount,
    totalAmount: Number(totalAmount.toFixed(2)),
    savedAmount: Number((originalAmount - totalAmount).toFixed(2)),
    recommendList: getAllProducts().slice(2, 5)
  };
}

function getCartSummary() {
  return mockRequest({
    url: "/api/cart/summary",
    mockData: buildCartSummary()
  });
}

function addToCart(id, count = 1) {
  const cartMap = cartStore.getCartMap();
  const current = cartMap[id] || 0;
  cartStore.updateQuantity(id, current + count);

  return mockRequest({
    url: "/api/cart/add",
    method: "POST",
    data: {
      id,
      count
    },
    mockData: buildCartSummary()
  });
}

function updateCartItem(id, quantity) {
  cartStore.updateQuantity(id, quantity);

  return mockRequest({
    url: `/api/cart/items/${id}`,
    method: "PUT",
    data: {
      quantity
    },
    mockData: buildCartSummary()
  });
}

function clearCart() {
  cartStore.clearCart();

  return mockRequest({
    url: "/api/cart/clear",
    method: "POST",
    mockData: buildCartSummary()
  });
}

module.exports = {
  getCartSummary,
  addToCart,
  updateCartItem,
  clearCart
};
