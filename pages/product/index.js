const { getProductDetail } = require("../../services/api/catalog");
const cartApi = require("../../services/api/cart");

Page({
  data: {
    product: null,
    recommendList: []
  },

  async onLoad(options) {
    const response = await getProductDetail(options.id);
    this.setData(response.data);
  },

  async addToCart() {
    const { product } = this.data;
    if (!product) {
      return;
    }

    await cartApi.addToCart(product.id, 1);
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  },

  buyNow() {
    const { product } = this.data;
    if (!product) {
      return;
    }

    wx.navigateTo({
      url: "/pages/checkout/index"
    });
  },

  openService() {
    wx.navigateTo({
      url: "/pages/service/index?type=support"
    });
  },

  openProduct(event) {
    const { id } = event.currentTarget.dataset;
    wx.redirectTo({
      url: `/pages/product/index?id=${id}`
    });
  }
});
