const authStore = require("./authStore");
const ADDRESS_STORAGE_KEY = "mori_addresses";

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function getUserKey() {
  const currentUser = authStore.getCurrentUser();
  return currentUser ? currentUser.username : "guest";
}

function readBucket() {
  try {
    return wx.getStorageSync(ADDRESS_STORAGE_KEY) || {};
  } catch (error) {
    return {};
  }
}

function writeBucket(bucket) {
  wx.setStorageSync(ADDRESS_STORAGE_KEY, bucket);
}

function getAddresses() {
  const bucket = readBucket();
  const userKey = getUserKey();
  const currentList = bucket[userKey] || [];

  if (
    currentList.length === 1 &&
    currentList[0] &&
    currentList[0].id === "seed-address"
  ) {
    bucket[userKey] = [];
    writeBucket(bucket);
  }

  if (!bucket[userKey]) {
    bucket[userKey] = [];
    writeBucket(bucket);
  }

  return clone(bucket[userKey]);
}

function setAddresses(addresses) {
  const bucket = readBucket();
  bucket[getUserKey()] = clone(addresses);
  writeBucket(bucket);
  return getAddresses();
}

function getDefaultAddress() {
  const addresses = getAddresses();
  return addresses.find((item) => item.isDefault) || addresses[0] || null;
}

function addAddress(payload) {
  const addresses = getAddresses().map((item) => ({
    ...item,
    isDefault: false
  }));

  addresses.unshift({
    id: `addr_${Date.now()}`,
    name: String(payload.name || "").trim(),
    phone: String(payload.phone || "").trim(),
    detail: String(payload.detail || "").trim(),
    isDefault: true
  });

  return setAddresses(addresses);
}

function setDefaultAddress(id) {
  const nextAddresses = getAddresses().map((item) => ({
    ...item,
    isDefault: String(item.id) === String(id)
  }));

  return setAddresses(nextAddresses);
}

module.exports = {
  addAddress,
  getAddresses,
  getDefaultAddress,
  setDefaultAddress
};
