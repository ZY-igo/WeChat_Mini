const { getOrders } = require("../../services/api/order");
const { requireLogin } = require("../../utils/auth");

Page({
  data: {
    orderList: [],
    orderTabs: []
  },

  async onShow() {
    if (!requireLogin("/pages/orders/index")) {
      return;
    }

    const response = await getOrders();
    this.setData(response.data);
  }
});
