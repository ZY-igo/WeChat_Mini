const { getProfilePage } = require("../../services/api/profile");
const authStore = require("../../services/store/authStore");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    isLoggedIn: false,
    orderTabs: [],
    profileTools: [],
    currentUser: null,
    profile: {
      stats: []
    }
  },

  async onShow() {
    const currentUser = authStore.getCurrentUser();
    const response = await getProfilePage();

    this.setData({
      ...response.data,
      isLoggedIn: Boolean(currentUser),
      currentUser
    });
    this.syncTabBar("/pages/profile/index");
  },

  syncTabBar(path) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setSelected(path);
      this.getTabBar().refreshCartCount();
    }
  },

  openAuth() {
    if (this.data.isLoggedIn) {
      return;
    }

    wx.navigateTo({
      url: "/pages/auth/index?redirect=%2Fpages%2Fprofile%2Findex"
    });
  },

  openOrders() {
    if (!requireLogin("/pages/orders/index")) {
      return;
    }

    wx.navigateTo({
      url: "/pages/orders/index"
    });
  },

  openService(event) {
    const { key } = event.currentTarget.dataset;
    if (!this.data.isLoggedIn && (key === "address" || key === "coupon" || key === "member")) {
      this.openAuth();
      return;
    }

    wx.navigateTo({
      url: `/pages/service/index?type=${key}`
    });
  },

  logout() {
    authStore.logout();
    wx.showToast({
      title: "已退出登录",
      icon: "success"
    });
    this.onShow();
  }
});
