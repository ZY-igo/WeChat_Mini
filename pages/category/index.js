const app = getApp();
const { catalog } = require("../../utils/data");

Page({
  data: {
    categories: catalog,
    activeIndex: 0
  },

  onShow() {
    this.syncTabBar("/pages/category/index");
  },

  syncTabBar(path) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setSelected(path);
      this.getTabBar().refreshCartCount();
    }
  },

  selectCategory(event) {
    const { index } = event.currentTarget.dataset;
    this.setData({ activeIndex: index });
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
    this.syncTabBar("/pages/category/index");
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  }
});
