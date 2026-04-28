const { getHomePage } = require("../../services/api/home");
const cartApi = require("../../services/api/cart");
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
    featured: []
  },

  async onShow() {
    this.syncTabBar("/pages/home/index");
    await this.loadPageData();
  },

  async loadPageData() {
    const response = await getHomePage();
    this.setData(response.data);
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
    wx.navigateTo({
      url: `/pages/service/index?type=${value}`
    });
  },

  openSearch() {
    wx.showToast({
      title: "搜索接口已预留",
      icon: "none"
    });
  }
});
