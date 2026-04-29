const { mockRequest } = require("../core/http");
const { getAllProducts } = require("../mock/shopData");

function normalizeProduct(product, overrides = {}) {
  return {
    id: product.id,
    name: overrides.name || product.name,
    subtitle: overrides.subtitle || product.subtitle,
    price: product.price,
    originalPrice: product.originalPrice,
    sales: product.sales,
    rating: product.rating,
    tag: overrides.tag || product.tag,
    image: product.image
  };
}

function getHomePage() {
  const products = getAllProducts();

  return mockRequest({
    url: "/api/home",
    mockData: {
      topKeywords: ["风衣", "早餐托盘", "精华油", "次日达"],
      notice: "新人首单立减 20 元，每晚 20:00 可以领取限时优惠券。",
      heroBanners: [
        {
          id: 1,
          title: "春装上新",
          caption: "通勤穿搭、本周新品、精选直降",
          badge: "今日主会场",
          image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80"
        },
        {
          id: 2,
          title: "居家焕新",
          caption: "香氛、餐厨、软装好物一站配齐",
          badge: "满 99 减 10",
          image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
        },
        {
          id: 3,
          title: "生鲜次日达",
          caption: "蔬果面包组合补贴，今晚下单明早备齐",
          badge: "限时补贴",
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
        }
      ],
      quickEntries: [
        { id: "coupon", title: "领券中心", subtitle: "最高减 80", value: "coupon", icon: "券" },
        { id: "new", title: "新品首发", subtitle: "本周上新", value: "new", icon: "新" },
        { id: "address", title: "收货地址", subtitle: "统一管理", value: "address", icon: "址" },
        { id: "support", title: "客服帮助", subtitle: "7x24 在线", value: "support", icon: "助" },
        { id: "flash", title: "限时秒杀", subtitle: "今晚 20 点", value: "coupon", icon: "秒" },
        { id: "member", title: "会员专区", subtitle: "专属折扣", value: "member", icon: "会" },
        { id: "delivery", title: "次日达", subtitle: "鲜食专场", value: "address", icon: "达" },
        { id: "gift", title: "送礼精选", subtitle: "礼盒专区", value: "support", icon: "礼" }
      ],
      promoCards: [
        {
          id: "subsidy",
          title: "补贴专区",
          desc: "高频单品直降，适合首页承接促销流量。",
          accent: "补贴价"
        },
        {
          id: "member",
          title: "黑卡会员日",
          desc: "免邮券、专属价、新品优先购。",
          accent: "会员价"
        }
      ],
      flashSale: [
        {
          id: 102,
          name: "杏色针织套衫",
          price: 159,
          originalPrice: 259,
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
          progress: 72,
          tag: "秒杀"
        },
        {
          id: 301,
          name: "有机蔬果盒",
          price: 69,
          originalPrice: 99,
          image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80",
          progress: 48,
          tag: "爆款"
        },
        {
          id: 402,
          name: "温和洁面慕斯",
          price: 79,
          originalPrice: 118,
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80",
          progress: 64,
          tag: "返场"
        }
      ],
      channels: [
        {
          id: "fashion",
          title: "穿搭频道",
          desc: "通勤和周末都能穿",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "home",
          title: "家居频道",
          desc: "收纳、香氛和餐厨",
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "fresh",
          title: "鲜食频道",
          desc: "高频补货更省心",
          image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=80"
        },
        {
          id: "beauty",
          title: "个护频道",
          desc: "温和稳定日常回购",
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
        }
      ],
      featured: [
        normalizeProduct(products[0], {
          name: "云感短风衣",
          subtitle: "轻防泼水，适合通勤叠穿",
          tag: "热卖"
        }),
        normalizeProduct(products[1], {
          name: "杏色针织套衫",
          subtitle: "单穿叠搭都稳定，春季高频款",
          tag: "上新"
        }),
        normalizeProduct(products[2], {
          name: "陶土香薰蜡烛",
          subtitle: "卧室和书桌都适合的氛围单品",
          tag: "氛围感"
        }),
        normalizeProduct(products[3], {
          name: "原木早餐托盘",
          subtitle: "桌面收纳和餐盘两用",
          tag: "满减"
        }),
        normalizeProduct(products[4], {
          name: "有机蔬果盒",
          subtitle: "两到三人家庭补货刚好",
          tag: "次日达"
        }),
        normalizeProduct(products[5], {
          name: "手作酸种面包",
          subtitle: "48 小时发酵，当天现烤",
          tag: "人气"
        })
      ]
    }
  });
}

module.exports = {
  getHomePage
};
