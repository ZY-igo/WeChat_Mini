const orderApi = require("../../services/api/order");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    items: [],
    totalAmount: 0,
    totalCount: 0,
    savedAmount: 0,
    address: null
  },

  async onShow() {
    if (!requireLogin("/pages/checkout/index")) {
      return;
    }

    const response = await orderApi.getCheckoutPreview();
    this.setData(response.data);
  },

  async submitOrder() {
    if (!requireLogin("/pages/checkout/index")) {
      return;
    }

    const response = await orderApi.createOrder();
    wx.showModal({
      title: "提交成功",
      content: `这是演示订单，已为你生成假订单记录：${response.data.orderId}`,
      showCancel: false,
      success: () => {
        wx.navigateTo({
          url: "/pages/orders/index"
        });
      }
    });
  }
});
