const { cartSeed } = require("../mock/shopData");

let cartMap = {
  ...cartSeed
};

function getCartMap() {
  return {
    ...cartMap
  };
}

function setCartMap(nextMap) {
  cartMap = {
    ...nextMap
  };
}

function updateQuantity(id, quantity) {
  const nextMap = getCartMap();

  if (quantity <= 0) {
    delete nextMap[id];
  } else {
    nextMap[id] = quantity;
  }

  setCartMap(nextMap);
  return getCartMap();
}

function clearCart() {
  cartMap = {};
}

module.exports = {
  getCartMap,
  setCartMap,
  updateQuantity,
  clearCart
};
