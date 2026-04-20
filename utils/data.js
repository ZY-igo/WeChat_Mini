const heroBanners = [
  {
    id: 1,
    title: "春季上新",
    caption: "舒展感衣橱与慢生活器物",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "厨房计划",
    caption: "用更干净的食材重做一日三餐",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
  }
];

const categories = [
  {
    id: "fashion",
    name: "服饰穿搭",
    cover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    description: "轻通勤、松弛版型、好质感面料",
    products: [
      {
        id: 101,
        name: "云感短风衣",
        subtitle: "防泼水面料 | 通勤与周末都能穿",
        price: 329,
        originalPrice: 429,
        sales: 3280,
        rating: 4.9,
        tag: "热卖",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["立体剪裁", "可拆卸腰带", "轻量防皱"],
        stock: 96
      },
      {
        id: 102,
        name: "松弛感针织套衫",
        subtitle: "奶油杏色 | 触感柔软不过敏",
        price: 189,
        originalPrice: 259,
        sales: 2140,
        rating: 4.8,
        tag: "上新",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["亲肤针织", "宽松版型", "易打理"],
        stock: 132
      }
    ]
  },
  {
    id: "home",
    name: "家居生活",
    cover: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    description: "让家变得更柔和、更安静",
    products: [
      {
        id: 201,
        name: "陶土香薰蜡烛",
        subtitle: "雪松与无花果 | 70小时燃烧",
        price: 98,
        originalPrice: 138,
        sales: 1890,
        rating: 4.9,
        tag: "氛围感",
        image: "https://images.unsplash.com/photo-1602874801006-4cfba60db106?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1602874801006-4cfba60db106?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["天然大豆蜡", "木芯细响", "礼盒装"],
        stock: 220
      },
      {
        id: 202,
        name: "原木早餐托盘",
        subtitle: "白蜡木纹理 | 提手设计",
        price: 119,
        originalPrice: 159,
        sales: 1450,
        rating: 4.7,
        tag: "满减",
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["加厚木板", "圆角打磨", "可作收纳盘"],
        stock: 78
      }
    ]
  },
  {
    id: "fresh",
    name: "精选食品",
    cover: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
    description: "厨房补给站，快速装满冰箱",
    products: [
      {
        id: 301,
        name: "有机蔬果盒",
        subtitle: "7种当季鲜蔬 | 次日达演示",
        price: 79,
        originalPrice: 99,
        sales: 3021,
        rating: 4.8,
        tag: "次日达",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["农残抽检", "冷链配送", "可追溯"],
        stock: 168
      },
      {
        id: 302,
        name: "手作酸种面包",
        subtitle: "48小时发酵 | 外脆里韧",
        price: 36,
        originalPrice: 46,
        sales: 2788,
        rating: 4.9,
        tag: "人气",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["低糖配方", "当天现烤", "独立纸袋"],
        stock: 64
      }
    ]
  },
  {
    id: "beauty",
    name: "护肤个护",
    cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    description: "轻负担护理，回到稳定状态",
    products: [
      {
        id: 401,
        name: "修护精华油",
        subtitle: "角鲨烷基底 | 夜间密集滋养",
        price: 168,
        originalPrice: 228,
        sales: 1832,
        rating: 4.8,
        tag: "修护",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["无酒精香精", "玻璃滴管", "敏感肌友好"],
        stock: 104
      },
      {
        id: 402,
        name: "温和洁面慕斯",
        subtitle: "氨基酸表活 | 洗后不紧绷",
        price: 88,
        originalPrice: 118,
        sales: 2510,
        rating: 4.9,
        tag: "回购高",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
        detailImages: [
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["泡沫细密", "按压即用", "早晚适用"],
        stock: 178
      }
    ]
  }
];

const flashSale = [
  {
    id: 102,
    name: "针织套衫限时价",
    price: 159,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    progress: 72
  },
  {
    id: 301,
    name: "蔬果盒加量装",
    price: 69,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80",
    progress: 48
  }
];

const orderTabs = [
  { label: "全部", count: 12 },
  { label: "待付款", count: 1 },
  { label: "待发货", count: 2 },
  { label: "待收货", count: 1 },
  { label: "已完成", count: 8 }
];

const orderList = [
  {
    id: "MO20260420001",
    status: "待发货",
    items: [
      { name: "云感短风衣", quantity: 1, price: 329 },
      { name: "修护精华油", quantity: 1, price: 168 }
    ],
    amount: 497,
    time: "2026-04-20 11:28"
  },
  {
    id: "MO20260418002",
    status: "已完成",
    items: [
      { name: "原木早餐托盘", quantity: 2, price: 119 }
    ],
    amount: 238,
    time: "2026-04-18 08:45"
  }
];

const profileTools = [
  { title: "收货地址", subtitle: "管理常用地址" },
  { title: "优惠券", subtitle: "6张可用" },
  { title: "会员中心", subtitle: "MORI BLACK" },
  { title: "客服与帮助", subtitle: "7 x 24在线" }
];

module.exports = {
  heroBanners,
  catalog: categories,
  flashSale,
  orderTabs,
  orderList,
  profileTools
};
