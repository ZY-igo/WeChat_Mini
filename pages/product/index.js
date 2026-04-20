const app = getApp();

Page({
  data: {
    product: null
  },

  onLoad(options) {
    const product = app.getProductById(options.id);
    this.setData({ product });
  },

  addToCart() {
    const { product } = this.data;
    if (!product) {
      return;
    }

    app.addToCart(product.id, 1);
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  },

  buyNow() {
    wx.showToast({
      title: "演示项目，暂不接支付",
      icon: "none"
    });
  }
});
