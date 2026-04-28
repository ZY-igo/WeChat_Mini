const { cartSeed } = require("../mock/shopData");
const authStore = require("./authStore");

const CART_STORAGE_KEY = "mori_cart_bucket";

function getUserKey() {
  const currentUser = authStore.getCurrentUser();
  return currentUser ? currentUser.username : "guest";
}

function getCartBucket() {
  try {
    return wx.getStorageSync(CART_STORAGE_KEY) || {};
  } catch (error) {
    return {};
  }
}

function setCartBucket(nextBucket) {
  wx.setStorageSync(CART_STORAGE_KEY, nextBucket);
}

function getCartMap() {
  const bucket = getCartBucket();
  const userKey = getUserKey();

  if (!bucket[userKey]) {
    bucket[userKey] = { ...cartSeed };
    setCartBucket(bucket);
  }

  return {
    ...bucket[userKey]
  };
}

function setCartMap(nextMap) {
  const bucket = getCartBucket();
  bucket[getUserKey()] = {
    ...nextMap
  };
  setCartBucket(bucket);
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
  setCartMap({});
}

module.exports = {
  getCartMap,
  setCartMap,
  updateQuantity,
  clearCart
};
