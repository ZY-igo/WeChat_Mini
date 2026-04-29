const LOCATION_STORAGE_KEY = "mori_current_location";

const DEFAULT_LOCATION = {
  label: "点击定位",
  detail: "",
  latitude: null,
  longitude: null,
  source: "none",
  updatedAt: ""
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function getLocation() {
  try {
    const saved = wx.getStorageSync(LOCATION_STORAGE_KEY);
    return saved ? clone(saved) : clone(DEFAULT_LOCATION);
  } catch (error) {
    return clone(DEFAULT_LOCATION);
  }
}

function setLocation(location) {
  const nextLocation = {
    ...DEFAULT_LOCATION,
    ...location
  };

  wx.setStorageSync(LOCATION_STORAGE_KEY, nextLocation);
  return getLocation();
}

function clearLocation() {
  try {
    wx.removeStorageSync(LOCATION_STORAGE_KEY);
  } catch (error) {
    wx.setStorageSync(LOCATION_STORAGE_KEY, DEFAULT_LOCATION);
  }
}

module.exports = {
  clearLocation,
  getLocation,
  setLocation
};
