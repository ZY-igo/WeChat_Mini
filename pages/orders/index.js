const { getOrders } = require("../../services/api/order");

Page({
  data: {
    orderList: [],
    orderTabs: []
  },

  async onLoad() {
    const response = await getOrders();
    this.setData(response.data);
  }
});
