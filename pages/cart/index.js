const app = getApp();

Page({
  data: {
    cartItems: [],
    totalCount: 0,
    totalAmount: 0,
    savedAmount: 0,
    recommendList: []
  },

  onShow() {
    this.refreshData();
    this.syncTabBar("/pages/cart/index");
  },

  syncTabBar(path) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setSelected(path);
      this.getTabBar().refreshCartCount();
    }
  },

  refreshData() {
    const summary = app.getCartSummary();
    this.setData({
      cartItems: summary.items,
      totalCount: summary.totalCount,
      totalAmount: summary.totalAmount,
      savedAmount: summary.savedAmount,
      recommendList: app.getAllProducts().slice(2, 5)
    });
  },

  changeQuantity(event) {
    const { id, delta } = event.currentTarget.dataset;
    const currentItem = this.data.cartItems.find((item) => String(item.id) === String(id));
    if (!currentItem) {
      return;
    }

    app.updateCart(id, currentItem.quantity + Number(delta));
    this.refreshData();
    this.syncTabBar("/pages/cart/index");
  },

  addRecommend(event) {
    const { id } = event.currentTarget.dataset;
    app.addToCart(id, 1);
    this.refreshData();
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
    wx.navigateTo({
      url: "/pages/checkout/index"
    });
  }
});
