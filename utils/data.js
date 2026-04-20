const heroBanners = [
  {
    id: 1,
    title: "春季焕新",
    caption: "轻盈配色、干净陈列、适合日常的质感单品",
    badge: "本周主推",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 2,
    title: "厨房补给",
    caption: "把常备食材、面包和轻烘焙一次买齐",
    badge: "次日达",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
  }
];

const categories = [
  {
    id: "fashion",
    name: "服饰穿搭",
    cover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    description: "低饱和配色，适合通勤和周末",
    products: [
      {
        id: 101,
        name: "云感短风衣",
        subtitle: "轻防泼水面料，版型利落不过分正式",
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
        features: ["立体剪裁", "可拆腰带", "轻量防皱"],
        stock: 96
      },
      {
        id: 102,
        name: "杏色针织套衫",
        subtitle: "软糯触感，单穿和叠搭都很稳",
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
        features: ["亲肤针织", "宽松版型", "不易起球"],
        stock: 132
      }
    ]
  },
  {
    id: "home",
    name: "家居生活",
    cover: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description: "让空间更整洁，也更有气氛",
    products: [
      {
        id: 201,
        name: "陶土香薰蜡烛",
        subtitle: "雪松与无花果香型，适合卧室和书桌",
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
        features: ["天然大豆蜡", "木芯细响", "礼盒包装"],
        stock: 220
      },
      {
        id: 202,
        name: "原木早餐托盘",
        subtitle: "圆角打磨，兼顾餐盘和桌面收纳",
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
        features: ["加厚木板", "提手设计", "容易清洁"],
        stock: 78
      }
    ]
  },
  {
    id: "fresh",
    name: "精选食品",
    cover: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    description: "适合周补货，干净简单的厨房常备",
    products: [
      {
        id: 301,
        name: "有机蔬果盒",
        subtitle: "7种当季鲜蔬，适合两到三人家庭",
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
        features: ["冷链配送", "农残抽检", "产地可追溯"],
        stock: 168
      },
      {
        id: 302,
        name: "手作酸种面包",
        subtitle: "48小时发酵，外皮酥脆内里湿润",
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
    cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    description: "稳定、温和、适合日常回购",
    products: [
      {
        id: 401,
        name: "修护精华油",
        subtitle: "角鲨烷基底，适合夜间密集修护",
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
        subtitle: "氨基酸表活，洗后不紧绷",
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
        features: ["泡沫细密", "按压即用", "早晚可用"],
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

const quickEntries = [
  { id: "new", title: "新品", subtitle: "本周到店", type: "service", value: "new" },
  { id: "coupon", title: "领券", subtitle: "今日可用", type: "service", value: "coupon" },
  { id: "address", title: "地址", subtitle: "管理收货", type: "service", value: "address" },
  { id: "support", title: "客服", subtitle: "在线帮助", type: "service", value: "support" }
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
  { key: "address", title: "收货地址", subtitle: "管理常用地址" },
  { key: "coupon", title: "优惠券", subtitle: "6张可用优惠券" },
  { key: "member", title: "会员中心", subtitle: "MORI BLACK 年度会员" },
  { key: "support", title: "客服与帮助", subtitle: "7 x 24 在线服务" }
];

const serviceContent = {
  address: {
    title: "收货地址",
    desc: "假数据演示页面，后续可以直接接入用户地址接口。",
    records: [
      { title: "张女士 13800001234", text: "上海市 徐汇区 漕河泾开发区 田林路 388 号 2 栋 1201" },
      { title: "公司前台 021-55667788", text: "上海市 长宁区 临虹路 168 弄 5 号楼 1 层前台" }
    ]
  },
  coupon: {
    title: "优惠券",
    desc: "支持展示待使用、已使用和即将过期券。",
    records: [
      { title: "满 199 减 30", text: "全场通用，2026-04-30 到期" },
      { title: "会员免邮券", text: "本月剩余 2 张，满 69 可用" },
      { title: "护肤品 85 折", text: "仅限个护类目使用" }
    ]
  },
  member: {
    title: "会员中心",
    desc: "当前为演示会员页，可继续扩展成长值、任务和权益明细。",
    records: [
      { title: "等级", text: "BLACK CARD 年度会员" },
      { title: "权益", text: "每月 2 张免邮券、新品优先购、生日礼遇" },
      { title: "成长值", text: "当前 3680，距离下一档还差 320" }
    ]
  },
  support: {
    title: "客服与帮助",
    desc: "演示帮助中心，适合后续补 FAQ、工单和在线客服入口。",
    records: [
      { title: "配送说明", text: "现货商品 48 小时内发出，生鲜次日达为演示文案" },
      { title: "售后规则", text: "签收后 7 天内支持申请售后，虚拟商品除外" },
      { title: "联系客服", text: "工作日 09:00 - 22:00，节假日 10:00 - 18:00" }
    ]
  },
  new: {
    title: "新品速览",
    desc: "给首页快捷入口用的假数据页。",
    records: [
      { title: "春季新品", text: "本周上架 8 款，含服饰、家居和个护单品" },
      { title: "编辑推荐", text: "云感短风衣、陶土香薰蜡烛、修护精华油" }
    ]
  }
};

module.exports = {
  heroBanners,
  catalog: categories,
  flashSale,
  quickEntries,
  orderTabs,
  orderList,
  profileTools,
  serviceContent
};
