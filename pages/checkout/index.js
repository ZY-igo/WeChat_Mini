const app = getApp();

Page({
  data: {
    items: [],
    totalAmount: 0,
    totalCount: 0
  },

  onShow() {
    const summary = app.getCartSummary();
    this.setData({
      items: summary.items,
      totalAmount: summary.totalAmount,
      totalCount: summary.totalCount
    });
  },

  submitOrder() {
    wx.showModal({
      title: "提交成功",
      content: "这是演示订单，已为你生成假订单记录。",
      showCancel: false,
      success: () => {
        wx.navigateTo({
          url: "/pages/orders/index"
        });
      }
    });
  }
});
