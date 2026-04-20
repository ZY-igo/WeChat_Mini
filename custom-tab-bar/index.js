const app = getApp();

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/home/index",
        text: "商城",
        key: "M"
      },
      {
        pagePath: "/pages/category/index",
        text: "分类",
        key: "C"
      },
      {
        pagePath: "/pages/cart/index",
        text: "购物车",
        key: "G"
      },
      {
        pagePath: "/pages/profile/index",
        text: "我的",
        key: "P"
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

    refreshCartCount() {
      this.setData({
        cartCount: app.getCartSummary().totalCount
      });
    }
  }
});
