const cartApi = require("../services/api/cart");

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/home/index",
        text: "首页",
        key: "S"
      },
      {
        pagePath: "/pages/category/index",
        text: "分类",
        key: "F"
      },
      {
        pagePath: "/pages/cart/index",
        text: "购物车",
        key: "C"
      },
      {
        pagePath: "/pages/profile/index",
        text: "我的",
        key: "M"
      }
    ],
    cartCount: 0
  },

  lifetimes: {
    attached() {
      this.refreshCartCount();
    }
  },

  methods: {
    switchTab(event) {
      const { path, index } = event.currentTarget.dataset;
      this.setData({ selected: index });
      wx.switchTab({ url: path });
    },

    setSelected(pagePath) {
      const selected = this.data.list.findIndex((item) => item.pagePath === pagePath);
      this.setData({
        selected: selected === -1 ? 0 : selected
      });
    },

    async refreshCartCount() {
      const response = await cartApi.getCartSummary();
      this.setData({
        cartCount: response.data.totalCount
      });
    }
  }
});
