const orderApi = require("../../services/api/order");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    items: [],
    totalAmount: 0,
    totalCount: 0,
    savedAmount: 0,
    address: null,
    couponList: [],
    selectedCouponId: "",
    discountAmount: 0,
    payableAmount: 0
  },

  async onShow() {
    if (!requireLogin("/pages/checkout/index")) {
      return;
    }

    await this.refreshData();
  },

  async refreshData() {
    const response = await orderApi.getCheckoutPreview();
    this.setData({
      ...response.data,
      selectedCouponId: "",
      discountAmount: 0,
      payableAmount: response.data.totalAmount
    });
  },

  toggleCoupon(event) {
    const { id, discount } = event.currentTarget.dataset;
    const nextSelectedId = this.data.selectedCouponId === id ? "" : id;
    const nextDiscount = nextSelectedId ? Number(discount) : 0;

    this.setData({
      selectedCouponId: nextSelectedId,
      discountAmount: nextDiscount,
      payableAmount: Number((this.data.totalAmount - nextDiscount).toFixed(2))
    });
  },

  manageAddress() {
    wx.navigateTo({
      url: "/pages/service/index?type=address"
    });
  },

  async submitOrder() {
    if (!requireLogin("/pages/checkout/index")) {
      return;
    }

    if (!this.data.address) {
      wx.showToast({
        title: "请先添加收货地址",
        icon: "none"
      });
      return;
    }

    const response = await orderApi.createOrder(this.data.selectedCouponId);
    const couponText = response.data.selectedCoupon
      ? `\n已使用优惠券：${response.data.selectedCoupon.title}`
      : "";

    wx.showModal({
      title: "提交成功",
      content: `已生成演示订单：${response.data.orderId}${couponText}`,
      showCancel: false,
      success: () => {
        wx.navigateTo({
          url: "/pages/orders/index"
        });
      }
    });
  }
});
