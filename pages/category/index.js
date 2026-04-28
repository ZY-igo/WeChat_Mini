const { getCategoryPage } = require("../../services/api/catalog");
const cartApi = require("../../services/api/cart");

Page({
  data: {
    categories: [],
    activeIndex: 0
  },

  async onShow() {
    const activeCategoryId = wx.getStorageSync("activeCategoryId");
    const response = await getCategoryPage(activeCategoryId);
    this.setData(response.data);
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

  async addToCart(event) {
    const { id } = event.currentTarget.dataset;
    await cartApi.addToCart(id, 1);
    this.syncTabBar("/pages/category/index");
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  }
});
