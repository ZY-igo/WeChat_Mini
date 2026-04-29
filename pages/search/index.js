const { searchProducts } = require("../../services/api/search");
const cartApi = require("../../services/api/cart");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    keyword: "",
    hotKeywords: [],
    categorySuggestions: [],
    results: []
  },

  async onLoad(options) {
    const keyword = options.keyword ? decodeURIComponent(options.keyword) : "";
    this.setData({ keyword });
    await this.runSearch(keyword);
  },

  updateKeyword(event) {
    this.setData({
      keyword: event.detail.value
    });
  },

  async confirmSearch(event) {
    const keyword = event && event.detail && typeof event.detail.value !== "undefined"
      ? event.detail.value
      : this.data.keyword;
    await this.runSearch(keyword);
  },

  async useKeyword(event) {
    const { keyword } = event.currentTarget.dataset;
    this.setData({ keyword });
    await this.runSearch(keyword);
  },

  async runSearch(keyword) {
    const response = await searchProducts(keyword);
    this.setData({
      keyword,
      hotKeywords: response.data.hotKeywords,
      categorySuggestions: response.data.categorySuggestions,
      results: response.data.results
    });
  },

  openProduct(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product/index?id=${id}`
    });
  },

  async addToCart(event) {
    const { id } = event.currentTarget.dataset;
    if (!requireLogin("/pages/search/index")) {
      return;
    }

    await cartApi.addToCart(id, 1);
    wx.showToast({
      title: "已加入购物车",
      icon: "success"
    });
  }
});
