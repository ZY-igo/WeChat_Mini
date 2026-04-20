const { serviceContent } = require("../../utils/data");

Page({
  data: {
    title: "",
    desc: "",
    records: []
  },

  onLoad(options) {
    const type = options.type || "support";
    const current = serviceContent[type] || serviceContent.support;

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
