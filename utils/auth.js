const authStore = require("../services/store/authStore");

const TAB_PAGES = [
  "/pages/home/index",
  "/pages/category/index",
  "/pages/cart/index",
  "/pages/profile/index"
];

function isTabPage(path) {
  return TAB_PAGES.includes(path);
}

function buildAuthUrl(redirect) {
  const query = redirect ? `?redirect=${encodeURIComponent(redirect)}` : "";
  return `/pages/auth/index${query}`;
}

function requireLogin(redirect) {
  if (authStore.isLoggedIn()) {
    return true;
  }

  wx.navigateTo({
    url: buildAuthUrl(redirect)
  });
  return false;
}

function navigateAfterLogin(redirect) {
  const target = redirect || "/pages/profile/index";
  if (isTabPage(target)) {
    wx.switchTab({ url: target });
    return;
  }

  wx.redirectTo({ url: target });
}

module.exports = {
  TAB_PAGES,
  buildAuthUrl,
  isTabPage,
  navigateAfterLogin,
  requireLogin
};
