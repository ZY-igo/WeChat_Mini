const { mockRequest } = require("../core/http");
const { profile, profileTools, orderTabs } = require("../mock/shopData");
const authStore = require("../store/authStore");
const orderStore = require("../store/orderStore");
const couponStore = require("../store/couponStore");

function buildGuestStats() {
  return [
    { label: "成长值", value: "--" },
    { label: "优惠券", value: "--" },
    { label: "全部订单", value: "0" }
  ];
}

function buildProfileData() {
  const currentUser = authStore.getCurrentUser();
  const isLoggedIn = Boolean(currentUser);
  const orders = isLoggedIn ? orderStore.getOrders() : [];
  const availableCoupons = isLoggedIn
    ? couponStore.getUserCoupons().filter((item) => item.status === "available")
    : [];

  const nextProfileTools = profileTools.map((item) => {
    if (item.key !== "coupon") {
      return item;
    }

    return {
      ...item,
      subtitle: isLoggedIn ? `${availableCoupons.length} 张可用优惠券` : "登录后查看优惠券"
    };
  });

  return {
    profile: {
      ...profile,
      name: currentUser ? currentUser.nickname : "未登录",
      memberId: currentUser ? `账号 ${currentUser.username}` : "点击登录 / 注册",
      level: currentUser ? profile.level : "访客",
      avatar: currentUser && currentUser.avatar ? currentUser.avatar : profile.avatar,
      stats: isLoggedIn
        ? [
          profile.stats[0],
          { label: "优惠券", value: String(availableCoupons.length) },
          { label: "全部订单", value: String(orders.length) }
        ]
        : buildGuestStats()
    },
    profileTools: nextProfileTools,
    orderTabs: orderTabs.map((item) => ({
      ...item,
      count: isLoggedIn ? item.count : 0
    }))
  };
}

function getProfilePage() {
  return mockRequest({
    url: "/api/profile",
    mockData: buildProfileData()
  });
}

module.exports = {
  getProfilePage
};
