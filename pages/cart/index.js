const cartApi = require("../../services/api/cart");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    cartItems: [],
    totalCount: 0,
    totalAmount: 0,
    savedAmount: 0,
    recommendList: []
  },

  async onShow() {
    if (!requireLogin("/pages/cart/index")) {
      this.syncTabBar("/pages/home/index");
      return;
    }

    await this.refreshData();
    this.syncTabBar("/pages/cart/index");
  },

  syncTabBar(path) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setSelected(path);
      this.getTabBar().refreshCartCount();
    }
  },

  async refreshData() {
    const response = await cartApi.getCartSummary();
    this.setData({
      cartItems: response.data.items,
      totalCount: response.data.totalCount,
      totalAmount: response.data.totalAmount,
      savedAmount: response.data.savedAmount,
      recommendList: response.data.recommendList
    });
  },

  async changeQuantity(event) {
    const { id, delta } = event.currentTarget.dataset;
    const currentItem = this.data.cartItems.find((item) => String(item.id) === String(id));
    if (!currentItem) {
      return;
    }

    await cartApi.updateCartItem(id, currentItem.quantity + Number(delta));
    await this.refreshData();
    this.syncTabBar("/pages/cart/index");
  },

  async addRecommend(event) {
    const { id } = event.currentTarget.dataset;
    if (!requireLogin("/pages/cart/index")) {
      return;
    }

    await cartApi.addToCart(id, 1);
    await this.refreshData();
    this.syncTabBar("/pages/cart/index");
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  },

  openProduct(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product/index?id=${id}`
    });
  },

  goCheckout() {
    if (!requireLogin("/pages/checkout/index")) {
      return;
    }

    wx.navigateTo({
      url: "/pages/checkout/index"
    });
  }
});
