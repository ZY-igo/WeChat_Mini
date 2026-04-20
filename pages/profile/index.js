const { orderTabs, profileTools } = require("../../utils/data");

Page({
  data: {
    orderTabs,
    profileTools
  },

  onShow() {
    this.syncTabBar("/pages/profile/index");
  },

  syncTabBar(path) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setSelected(path);
      this.getTabBar().refreshCartCount();
    }
  },

  openOrders() {
    wx.navigateTo({
      url: "/pages/orders/index"
    });
  },

  openService(event) {
    const { key } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/service/index?type=${key}`
    });
  }
});
