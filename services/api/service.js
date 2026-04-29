const { mockRequest } = require("../core/http");
const { serviceContent } = require("../mock/shopData");
const addressStore = require("../store/addressStore");
const couponStore = require("../store/couponStore");

function getServicePage(type = "support") {
  let current = serviceContent[type] || serviceContent.support;

  if (type === "address") {
    current = {
      title: "收货地址",
      desc: "管理常用收货信息，结算时默认使用标记为默认的地址。",
      records: addressStore.getAddresses().map((item) => ({
        id: item.id,
        title: `${item.name} ${item.phone}${item.isDefault ? " · 默认" : ""}`,
        text: item.detail
      }))
    };
  }

  if (type === "coupon") {
    const summary = couponStore.getCouponSummary();
    current = {
      title: "优惠券中心",
      desc: "先领取优惠券，结算页会自动展示满足门槛的可用优惠券。",
      centerCoupons: summary.centerCoupons,
      userCoupons: summary.userCoupons,
      records: []
    };
  }

  return mockRequest({
    url: `/api/service/${type}`,
    mockData: current
  });
}

module.exports = {
  getServicePage
};
