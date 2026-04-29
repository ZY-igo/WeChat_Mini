const { getServicePage } = require("../../services/api/service");
const addressStore = require("../../services/store/addressStore");
const couponStore = require("../../services/store/couponStore");

Page({
  data: {
    type: "support",
    title: "",
    desc: "",
    records: [],
    addressList: [],
    addressForm: {
      name: "",
      phone: "",
      detail: ""
    },
    centerCoupons: [],
    userCoupons: []
  },

  async onLoad(options) {
    this.type = options.type || "support";
    await this.refreshPage();
  },

  async onShow() {
    if (this.type) {
      await this.refreshPage();
    }
  },

  async refreshPage() {
    const response = await getServicePage(this.type);
    const current = response.data;

    wx.setNavigationBarTitle({
      title: current.title
    });

    this.setData({
      type: this.type,
      title: current.title,
      desc: current.desc,
      records: current.records || [],
      addressList: this.type === "address" ? addressStore.getAddresses() : [],
      centerCoupons: this.type === "coupon" ? current.centerCoupons || [] : [],
      userCoupons: this.type === "coupon" ? current.userCoupons || [] : []
    });
  },

  updateAddressField(event) {
    const { field } = event.currentTarget.dataset;
    this.setData({
      [`addressForm.${field}`]: event.detail.value
    });
  },

  saveAddress() {
    const { name, phone, detail } = this.data.addressForm;
    if (!name.trim() || !phone.trim() || !detail.trim()) {
      wx.showToast({
        title: "请完整填写姓名、电话和地址",
        icon: "none"
      });
      return;
    }

    if (!/^1\d{10}$/.test(phone.trim())) {
      wx.showToast({
        title: "请输入 11 位手机号",
        icon: "none"
      });
      return;
    }

    addressStore.addAddress({ name, phone, detail });
    this.setData({
      addressForm: {
        name: "",
        phone: "",
        detail: ""
      }
    });

    wx.showToast({
      title: "地址已保存",
      icon: "success"
    });
    this.refreshPage();
  },

  setDefaultAddress(event) {
    const { id } = event.currentTarget.dataset;
    addressStore.setDefaultAddress(id);
    wx.showToast({
      title: "已设为默认地址",
      icon: "success"
    });
    this.refreshPage();
  },

  claimCoupon(event) {
    const { id } = event.currentTarget.dataset;
    const result = couponStore.claimCoupon(id);

    wx.showToast({
      title: result.message,
      icon: result.ok ? "success" : "none"
    });

    if (result.ok) {
      this.refreshPage();
    }
  }
});
