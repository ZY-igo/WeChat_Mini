const app = getApp();
const { heroBanners, catalog, flashSale } = require("../../utils/data");

Page({
  data: {
    heroBanners,
    catalog,
    flashSale,
    featured: []
  },

  onShow() {
    this.syncTabBar("/pages/home/index");
    this.setData({
      featured: app.getAllProducts().slice(0, 4)
    });
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

  addToCart(event) {
    const { id } = event.currentTarget.dataset;
    app.addToCart(id, 1);
    this.syncTabBar("/pages/home/index");
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  },

  goCategory() {
    wx.switchTab({
      url: "/pages/category/index"
    });
  }
});
