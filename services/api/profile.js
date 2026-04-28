const { mockRequest } = require("../core/http");
const { profile, profileTools, orderTabs } = require("../mock/shopData");
const authStore = require("../store/authStore");
const orderStore = require("../store/orderStore");

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

  return {
    profile: {
      ...profile,
      name: currentUser ? currentUser.nickname : "未登录",
      memberId: currentUser ? `账号 ${currentUser.username}` : "点击登录 / 注册",
      level: currentUser ? profile.level : "游客",
      avatar: currentUser && currentUser.avatar
        ? currentUser.avatar
        : "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
      stats: isLoggedIn
        ? [
          profile.stats[0],
          profile.stats[1],
          { label: "全部订单", value: String(orders.length) }
        ]
        : buildGuestStats()
    },
    profileTools,
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
