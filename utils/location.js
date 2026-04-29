const locationStore = require("../services/store/locationStore");

const TENCENT_MAP_KEY = "";

function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      success: resolve,
      fail: reject
    });
  });
}

function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success: resolve,
      fail: reject
    });
  });
}

function openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: resolve,
      fail: reject
    });
  });
}

function chooseLocation() {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: resolve,
      fail: reject
    });
  });
}

function formatCoordinateLabel(latitude, longitude) {
  return `纬度${Number(latitude).toFixed(2)} / 经度${Number(longitude).toFixed(2)}`;
}

async function reverseGeocode(latitude, longitude) {
  if (!TENCENT_MAP_KEY) {
    return {
      label: formatCoordinateLabel(latitude, longitude),
      detail: "未配置地图 key，当前先展示定位坐标。",
      source: "coordinate"
    };
  }

  const response = await request({
    url: "https://apis.map.qq.com/ws/geocoder/v1/",
    method: "GET",
    data: {
      key: TENCENT_MAP_KEY,
      location: `${latitude},${longitude}`
    }
  });

  const result = response.data && response.data.result ? response.data.result : null;
  const addressComponent = result && result.address_component ? result.address_component : {};
  const formattedAddress = result && result.address ? result.address : "";
  const label = [addressComponent.city, addressComponent.district].filter(Boolean).join(" ");

  return {
    label: label || formattedAddress || formatCoordinateLabel(latitude, longitude),
    detail: formattedAddress || "",
    source: "reverse-geocode"
  };
}

function buildSavedLocation(payload) {
  return locationStore.setLocation({
    ...payload,
    updatedAt: new Date().toISOString()
  });
}

async function locateCurrentPosition() {
  const result = await getLocation();
  const parsed = await reverseGeocode(result.latitude, result.longitude);

  return buildSavedLocation({
    label: parsed.label,
    detail: parsed.detail,
    latitude: result.latitude,
    longitude: result.longitude,
    source: parsed.source
  });
}

async function chooseManualPosition() {
  const result = await chooseLocation();

  return buildSavedLocation({
    label: result.name || result.address || "已选择位置",
    detail: result.address || "",
    latitude: result.latitude || null,
    longitude: result.longitude || null,
    source: "manual"
  });
}

async function ensureCurrentLocation() {
  const current = locationStore.getLocation();
  if (current && current.source !== "none" && current.label) {
    return current;
  }

  return locateCurrentPosition();
}

async function requestLocationWithFallback() {
  try {
    return await locateCurrentPosition();
  } catch (error) {
    const errorMessage = String((error && error.errMsg) || "");
    const isAuthDenied = errorMessage.includes("auth deny") || errorMessage.includes("auth denied");

    if (isAuthDenied) {
      await openSetting().catch(() => null);
      return chooseManualPosition();
    }

    return chooseManualPosition();
  }
}

module.exports = {
  TENCENT_MAP_KEY,
  ensureCurrentLocation,
  requestLocationWithFallback
};
