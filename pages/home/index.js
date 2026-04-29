const { getHomePage } = require("../../services/api/home");
const cartApi = require("../../services/api/cart");
const { ensureCurrentLocation, requestLocationWithFallback } = require("../../utils/location");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    topKeywords: [],
    notice: "",
    heroBanners: [],
    quickEntries: [],
    promoCards: [],
    flashSale: [],
    channels: [],
    featured: [],
    locationLabel: "定位中..."
  },

  async onShow() {
    this.syncTabBar("/pages/home/index");
    await Promise.all([
      this.loadPageData(),
      this.loadLocation()
    ]);
  },

  async loadPageData() {
    const response = await getHomePage();
    this.setData(response.data);
  },

  async loadLocation() {
    try {
      const location = await ensureCurrentLocation();
      this.setData({
        locationLabel: location.label || "点击定位"
      });
    } catch (error) {
      this.setData({
        locationLabel: "点击定位"
      });
    }
  },

  syncTabBar(path) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setSelected(path);
      this.getTabBar().refreshCartCount();
    }
  },

  openProduct(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product/index?id=${id}`
    });
  },

  async addToCart(event) {
    const { id } = event.currentTarget.dataset;
    if (!requireLogin("/pages/home/index")) {
      return;
    }

    await cartApi.addToCart(id, 1);
    this.syncTabBar("/pages/home/index");
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  },

  openCategory(event) {
    const { id } = event.currentTarget.dataset;
    wx.setStorageSync("activeCategoryId", id);
    wx.switchTab({
      url: "/pages/category/index"
    });
  },

  openService(event) {
    const { value } = event.currentTarget.dataset;
    if ((value === "address" || value === "coupon" || value === "member") && !requireLogin(`/pages/service/index?type=${value}`)) {
      return;
    }

    wx.navigateTo({
      url: `/pages/service/index?type=${value}`
    });
  },

  openSearch() {
    wx.navigateTo({
      url: "/pages/search/index"
    });
  },

  chooseKeyword(event) {
    const { keyword } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/search/index?keyword=${encodeURIComponent(keyword)}`
    });
  },

  async refreshLocation() {
    this.setData({
      locationLabel: "定位中..."
    });

    try {
      const location = await requestLocationWithFallback();
      this.setData({
        locationLabel: location.label || "点击定位"
      });
      wx.showToast({
        title: "位置已更新",
        icon: "success"
      });
    } catch (error) {
      this.setData({
        locationLabel: "点击定位"
      });
      wx.showToast({
        title: "定位失败，请稍后重试",
        icon: "none"
      });
    }
  }
});
