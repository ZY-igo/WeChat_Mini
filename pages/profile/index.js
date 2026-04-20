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

  showTip() {
    wx.showToast({
      title: "演示功能，可继续扩展",
      icon: "none"
    });
  }
});
