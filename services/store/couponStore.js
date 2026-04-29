const authStore = require("./authStore");

const COUPON_STORAGE_KEY = "mori_coupons";

const COUPON_TEMPLATES = [
  {
    id: "coupon_199_30",
    title: "满 199 减 30",
    description: "全场通用",
    minSpend: 199,
    discount: 30,
    expiry: "2026-05-31"
  },
  {
    id: "coupon_299_50",
    title: "满 299 减 50",
    description: "大额订单更划算",
    minSpend: 299,
    discount: 50,
    expiry: "2026-05-31"
  },
  {
    id: "coupon_99_15",
    title: "满 99 减 15",
    description: "日常补货可用",
    minSpend: 99,
    discount: 15,
    expiry: "2026-05-20"
  }
];

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function getUserKey() {
  const currentUser = authStore.getCurrentUser();
  return currentUser ? currentUser.username : "guest";
}

function readBucket() {
  try {
    return wx.getStorageSync(COUPON_STORAGE_KEY) || {};
  } catch (error) {
    return {};
  }
}

function writeBucket(bucket) {
  wx.setStorageSync(COUPON_STORAGE_KEY, bucket);
}

function getUserCoupons() {
  const bucket = readBucket();
  const userKey = getUserKey();

  if (!bucket[userKey]) {
    bucket[userKey] = [];
    writeBucket(bucket);
  }

  return clone(bucket[userKey]);
}

function setUserCoupons(coupons) {
  const bucket = readBucket();
  bucket[getUserKey()] = clone(coupons);
  writeBucket(bucket);
  return getUserCoupons();
}

function getCouponCenter() {
  const userCoupons = getUserCoupons();

  return COUPON_TEMPLATES.map((template) => {
    const matched = userCoupons.find((item) => item.templateId === template.id);
    return {
      ...template,
      claimed: Boolean(matched),
      status: matched ? matched.status : "unclaimed",
      couponId: matched ? matched.id : ""
    };
  });
}

function claimCoupon(templateId) {
  const current = getUserCoupons();
  const exists = current.find((item) => item.templateId === templateId);
  if (exists) {
    return {
      ok: false,
      message: "这张券已经领取过了"
    };
  }

  const template = COUPON_TEMPLATES.find((item) => item.id === templateId);
  if (!template) {
    return {
      ok: false,
      message: "优惠券不存在"
    };
  }

  current.unshift({
    id: `user_coupon_${Date.now()}`,
    templateId: template.id,
    title: template.title,
    description: template.description,
    minSpend: template.minSpend,
    discount: template.discount,
    expiry: template.expiry,
    status: "available",
    usedOrderId: ""
  });

  setUserCoupons(current);
  return {
    ok: true,
    message: "领取成功"
  };
}

function getAvailableCoupons(totalAmount = 0) {
  return getUserCoupons().filter((item) => {
    return item.status === "available" && Number(totalAmount) >= Number(item.minSpend);
  });
}

function getCouponSummary(totalAmount = 0, selectedCouponId = "") {
  const userCoupons = getUserCoupons();
  const availableCoupons = getAvailableCoupons(totalAmount);
  const selectedCoupon = availableCoupons.find((item) => item.id === selectedCouponId) || null;
  const discountAmount = selectedCoupon ? selectedCoupon.discount : 0;

  return {
    centerCoupons: getCouponCenter(),
    userCoupons,
    availableCoupons,
    selectedCoupon,
    discountAmount
  };
}

function markCouponUsed(couponId, orderId) {
  if (!couponId) {
    return getUserCoupons();
  }

  const nextCoupons = getUserCoupons().map((item) => {
    if (String(item.id) !== String(couponId)) {
      return item;
    }

    return {
      ...item,
      status: "used",
      usedOrderId: orderId
    };
  });

  return setUserCoupons(nextCoupons);
}

module.exports = {
  claimCoupon,
  getAvailableCoupons,
  getCouponCenter,
  getCouponSummary,
  getUserCoupons,
  markCouponUsed
};
