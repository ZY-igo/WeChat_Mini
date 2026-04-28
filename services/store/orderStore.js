const { orderList } = require("../mock/shopData");
const authStore = require("./authStore");

const ORDER_STORAGE_KEY = "mori_orders";

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function getUserKey() {
  const currentUser = authStore.getCurrentUser();
  return currentUser ? currentUser.username : "guest";
}

function getOrderSeed() {
  return clone(orderList);
}

function getOrderBucket() {
  try {
    return wx.getStorageSync(ORDER_STORAGE_KEY) || {};
  } catch (error) {
    return {};
  }
}

function setOrderBucket(nextBucket) {
  wx.setStorageSync(ORDER_STORAGE_KEY, nextBucket);
}

function getOrders() {
  const bucket = getOrderBucket();
  const userKey = getUserKey();

  if (!bucket[userKey]) {
    bucket[userKey] = getOrderSeed();
    setOrderBucket(bucket);
  }

  return clone(bucket[userKey]);
}

function setOrders(orderListData) {
  const bucket = getOrderBucket();
  bucket[getUserKey()] = clone(orderListData);
  setOrderBucket(bucket);
  return getOrders();
}

function prependOrder(order) {
  const orderItems = getOrders();
  orderItems.unshift(order);
  return setOrders(orderItems);
}

module.exports = {
  getOrders,
  setOrders,
  prependOrder
};
