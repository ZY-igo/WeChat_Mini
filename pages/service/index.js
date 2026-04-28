const { getServicePage } = require("../../services/api/service");

Page({
  data: {
    title: "",
    desc: "",
    records: []
  },

  async onLoad(options) {
    const type = options.type || "support";
    const response = await getServicePage(type);
    const current = response.data;

    wx.setNavigationBarTitle({
      title: current.title
    });

    this.setData({
      title: current.title,
      desc: current.desc,
      records: current.records
    });
  }
});
