function createProduct(product) {
  return {
    ...product,
    detailImages: product.detailImages || [product.image],
    features: product.features || [],
    stock: typeof product.stock === "number" ? product.stock : 99
  };
}

function createBatchProducts(config) {
  const {
    startId,
    image,
    detailImages,
    baseName,
    tag,
    basePrice,
    baseOriginalPrice,
    baseSales,
    baseRating,
    baseStock,
    features,
    variants
  } = config;

  return variants.map((variant, index) => createProduct({
    id: startId + index,
    name: `${variant.prefix}${baseName}`,
    subtitle: variant.subtitle,
    price: basePrice + (variant.priceOffset || 0),
    originalPrice: baseOriginalPrice + (variant.originalPriceOffset || 0),
    sales: baseSales + index * 137,
    rating: Number(Math.max(4.6, (baseRating - index * 0.03)).toFixed(1)),
    tag: variant.tag || tag,
    image,
    detailImages,
    features: variant.features || features,
    stock: baseStock + index * 9
  }));
}

const fashionProducts = [
  createProduct({
    id: 101,
    name: "云感短风衣",
    subtitle: "轻防泼水面料，版型利落，不过分正式。",
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
  }),
  createProduct({
    id: 102,
    name: "杏色针织套衫",
    subtitle: "柔软触感，单穿和叠搭都很稳。",
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
  }),
  ...createBatchProducts({
    startId: 103,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "通勤衬衫",
    tag: "通勤",
    basePrice: 149,
    baseOriginalPrice: 219,
    baseSales: 1600,
    baseRating: 4.9,
    baseStock: 88,
    features: ["微挺版型", "好打理", "四季可穿"],
    variants: [
      { prefix: "白色", subtitle: "基础款最好搭，适合日常通勤。" },
      { prefix: "雾蓝", subtitle: "冷淡低饱和配色，办公室不突兀。" },
      { prefix: "奶油", subtitle: "柔和暖调，和针织外套很搭。" },
      { prefix: "条纹", subtitle: "视觉更利落，适合单穿出门。" },
      { prefix: "宽松", subtitle: "更偏休闲，适合周末和旅途。" },
      { prefix: "轻薄", subtitle: "适合换季，塞进裤腰也不臃肿。" }
    ]
  }),
  ...createBatchProducts({
    startId: 109,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "半裙",
    tag: "气质",
    basePrice: 179,
    baseOriginalPrice: 249,
    baseSales: 1200,
    baseRating: 4.8,
    baseStock: 76,
    features: ["高腰修饰", "后腰松紧", "垂坠面料"],
    variants: [
      { prefix: "直筒", subtitle: "线条利落，适合衬衫和针织。" },
      { prefix: "伞摆", subtitle: "走动更轻盈，拍照也更出片。" },
      { prefix: "牛仔", subtitle: "休闲感更强，适合周末通勤。" },
      { prefix: "亚麻", subtitle: "透气不闷，适合春夏换季。" },
      { prefix: "褶裥", subtitle: "层次感更明显，上身更灵动。" },
      { prefix: "长款", subtitle: "覆盖性更好，适合通勤场景。" }
    ]
  }),
  ...createBatchProducts({
    startId: 115,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "T恤",
    tag: "基础",
    basePrice: 89,
    baseOriginalPrice: 129,
    baseSales: 2200,
    baseRating: 4.9,
    baseStock: 120,
    features: ["纯棉手感", "不易透", "打底百搭"],
    variants: [
      { prefix: "短袖", subtitle: "衣橱常备款，单穿打底都合适。" },
      { prefix: "落肩", subtitle: "肩线更松弛，搭配阔腿裤更自然。" },
      { prefix: "罗纹", subtitle: "领口更挺，耐穿不易变形。" },
      { prefix: "宽版", subtitle: "偏中性廓形，日常出门很省心。" },
      { prefix: "轻磅", subtitle: "适合夏季内搭，不闷热。" },
      { prefix: "重磅", subtitle: "更有挺度，单穿更显质感。" }
    ]
  }),
  ...createBatchProducts({
    startId: 121,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "针织开衫",
    tag: "换季",
    basePrice: 199,
    baseOriginalPrice: 279,
    baseSales: 1500,
    baseRating: 4.8,
    baseStock: 84,
    features: ["细针织法", "贴肤不扎", "叠穿友好"],
    variants: [
      { prefix: "米色", subtitle: "和衬衫、半裙都很顺手。" },
      { prefix: "浅灰", subtitle: "低对比色调，更适合通勤。" },
      { prefix: "雾粉", subtitle: "更柔和，适合春季搭配。" },
      { prefix: "燕麦", subtitle: "不挑肤色，作为外搭也稳。" },
      { prefix: "短款", subtitle: "显比例，搭配高腰下装更合适。" },
      { prefix: "长款", subtitle: "包裹感更强，办公室空调房好用。" }
    ]
  })
];

const homeProducts = [
  createProduct({
    id: 201,
    name: "陶土香薰蜡烛",
    subtitle: "雪松与无花果香型，适合卧室和书桌。",
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
  }),
  createProduct({
    id: 202,
    name: "原木早餐托盘",
    subtitle: "圆角打磨，兼顾餐盘和桌面收纳。",
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
  }),
  ...createBatchProducts({
    startId: 203,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "收纳盒",
    tag: "收纳",
    basePrice: 59,
    baseOriginalPrice: 89,
    baseSales: 1900,
    baseRating: 4.8,
    baseStock: 110,
    features: ["分区合理", "桌面友好", "轻量耐用"],
    variants: [
      { prefix: "藤编", subtitle: "适合客厅和玄关的小物整理。" },
      { prefix: "透明", subtitle: "一眼看到内容物，整理成本更低。" },
      { prefix: "抽屉式", subtitle: "适合桌面文具和杂物收纳。" },
      { prefix: "折叠", subtitle: "不用时可收起，更省空间。" },
      { prefix: "带盖", subtitle: "减少落灰，适合长期囤放。" },
      { prefix: "叠放", subtitle: "适合柜内纵向整理，提高空间利用。" }
    ]
  }),
  ...createBatchProducts({
    startId: 209,
    image: "https://images.unsplash.com/photo-1602874801006-4cfba60db106?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1602874801006-4cfba60db106?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "香薰摆件",
    tag: "治愈",
    basePrice: 79,
    baseOriginalPrice: 109,
    baseSales: 1380,
    baseRating: 4.9,
    baseStock: 70,
    features: ["香味柔和", "颜值在线", "适合礼赠"],
    variants: [
      { prefix: "陶瓷", subtitle: "极简器型，适合卧室床头。" },
      { prefix: "木质", subtitle: "更温润，适合书桌和茶几。" },
      { prefix: "无火", subtitle: "使用更省心，扩香更稳定。" },
      { prefix: "侘寂风", subtitle: "和浅木色家具更协调。" },
      { prefix: "礼盒", subtitle: "适合节日送礼，开箱完整。" },
      { prefix: "迷你", subtitle: "占地小，租房桌面也能放。" }
    ]
  }),
  ...createBatchProducts({
    startId: 215,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "抱枕",
    tag: "家居",
    basePrice: 69,
    baseOriginalPrice: 99,
    baseSales: 1020,
    baseRating: 4.8,
    baseStock: 66,
    features: ["回弹柔软", "可拆洗", "沙发友好"],
    variants: [
      { prefix: "亚麻", subtitle: "更有纹理感，适合客厅主沙发。" },
      { prefix: "绒面", subtitle: "触感更软，卧室也适合。" },
      { prefix: "云朵", subtitle: "造型更轻松，适合氛围布置。" },
      { prefix: "拼色", subtitle: "层次更丰富，搭配更有重点。" },
      { prefix: "奶茶色", subtitle: "百搭中性色，换季不突兀。" },
      { prefix: "靠背", subtitle: "支撑更强，久坐沙发更舒服。" }
    ]
  }),
  ...createBatchProducts({
    startId: 221,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "床品四件套",
    tag: "卧室",
    basePrice: 269,
    baseOriginalPrice: 369,
    baseSales: 860,
    baseRating: 4.8,
    baseStock: 44,
    features: ["亲肤透气", "简约配色", "机洗方便"],
    variants: [
      { prefix: "水洗棉", subtitle: "轻松蓬松，适合日常居家。" },
      { prefix: "浅咖", subtitle: "中性色调，卧室更显干净。" },
      { prefix: "雾灰", subtitle: "不挑风格，适合出租屋升级。" },
      { prefix: "奶白", subtitle: "更明亮，适合小空间卧室。" },
      { prefix: "格纹", subtitle: "有一点层次，但不过于复杂。" },
      { prefix: "双人", subtitle: "尺寸更实用，适合主卧床型。" }
    ]
  })
];

const freshProducts = [
  createProduct({
    id: 301,
    name: "有机蔬果盒",
    subtitle: "7 种当季鲜蔬，适合两到三人家庭。",
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
  }),
  createProduct({
    id: 302,
    name: "手作酸种面包",
    subtitle: "48 小时发酵，外皮酥脆内里湿润。",
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
  }),
  ...createBatchProducts({
    startId: 303,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "净菜包",
    tag: "补货",
    basePrice: 29,
    baseOriginalPrice: 39,
    baseSales: 2600,
    baseRating: 4.9,
    baseStock: 180,
    features: ["搭配省心", "冷藏发货", "适合家常菜"],
    variants: [
      { prefix: "家常炒菜", subtitle: "适合一顿两菜，省去前处理时间。" },
      { prefix: "火锅拼配", subtitle: "一包搞定火锅基础配菜。" },
      { prefix: "轻食沙拉", subtitle: "适合工作日快速备餐。" },
      { prefix: "菌菇组合", subtitle: "炖汤炒菜都能用，香气更足。" },
      { prefix: "番茄炖煮", subtitle: "酸甜更稳，适合意面和炖菜。" },
      { prefix: "根茎杂粮", subtitle: "适合慢炖和焖煮，饱腹感更强。" }
    ]
  }),
  ...createBatchProducts({
    startId: 309,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "欧包",
    tag: "烘焙",
    basePrice: 28,
    baseOriginalPrice: 38,
    baseSales: 1720,
    baseRating: 4.8,
    baseStock: 90,
    features: ["长时间发酵", "麦香明显", "适合早餐"],
    variants: [
      { prefix: "核桃", subtitle: "坚果香更突出，越嚼越香。" },
      { prefix: "全麦", subtitle: "更扎实，适合搭配咖啡早餐。" },
      { prefix: "葡萄干", subtitle: "带一点甜感，适合下午茶。" },
      { prefix: "蔓越莓", subtitle: "酸甜更明显，适合女性用户。" },
      { prefix: "芝士", subtitle: "奶香更重，热一下更好吃。" },
      { prefix: "黑麦", subtitle: "口感更厚重，适合喜欢原麦风味的人。" }
    ]
  }),
  ...createBatchProducts({
    startId: 315,
    image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "水果组合",
    tag: "鲜果",
    basePrice: 49,
    baseOriginalPrice: 65,
    baseSales: 2100,
    baseRating: 4.8,
    baseStock: 140,
    features: ["当季组合", "适合囤一周", "清洗即食"],
    variants: [
      { prefix: "周补给", subtitle: "适合办公和家庭冰箱常备。" },
      { prefix: "早餐杯", subtitle: "适合切块即食，备餐省心。" },
      { prefix: "轻卡", subtitle: "更适合健身和轻食场景。" },
      { prefix: "亲子", subtitle: "偏甜口，适合家庭共享。" },
      { prefix: "单人", subtitle: "份量更小，减少浪费。" },
      { prefix: "大份", subtitle: "适合多人分食和聚会准备。" }
    ]
  }),
  ...createBatchProducts({
    startId: 321,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "早餐轻食盒",
    tag: "即食",
    basePrice: 24,
    baseOriginalPrice: 32,
    baseSales: 1980,
    baseRating: 4.7,
    baseStock: 124,
    features: ["开盒即食", "冷藏配送", "通勤友好"],
    variants: [
      { prefix: "鸡胸肉", subtitle: "蛋白质更高，适合健身用户。" },
      { prefix: "金枪鱼", subtitle: "海味更明显，口味更扎实。" },
      { prefix: "玉米蛋", subtitle: "适合大众口味，早餐更稳。" },
      { prefix: "牛油果", subtitle: "口感更丰富，适合轻食用户。" },
      { prefix: "杂粮", subtitle: "饱腹更久，工作日上午更顶。" },
      { prefix: "经典", subtitle: "均衡不踩雷，适合首次尝试。" }
    ]
  })
];

const beautyProducts = [
  createProduct({
    id: 401,
    name: "修护精华油",
    subtitle: "角鲨烷基底，适合夜间密集修护。",
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
  }),
  createProduct({
    id: 402,
    name: "温和洁面慕斯",
    subtitle: "氨基酸表活，洗后不紧绷。",
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
  }),
  ...createBatchProducts({
    startId: 403,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "面霜",
    tag: "保湿",
    basePrice: 139,
    baseOriginalPrice: 189,
    baseSales: 1700,
    baseRating: 4.9,
    baseStock: 112,
    features: ["肤感轻盈", "保湿稳定", "适合日常"],
    variants: [
      { prefix: "清透", subtitle: "春夏用更合适，上脸更轻。" },
      { prefix: "高保湿", subtitle: "偏干皮更友好，夜间使用更稳。" },
      { prefix: "维稳", subtitle: "换季泛红时更适合日常兜底。" },
      { prefix: "屏障修护", subtitle: "适合熬夜后和干燥环境。" },
      { prefix: "轻龄", subtitle: "质地更轻，适合年轻肤质。" },
      { prefix: "滋润", subtitle: "更偏秋冬，保湿感更持久。" }
    ]
  }),
  ...createBatchProducts({
    startId: 409,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "爽肤水",
    tag: "基础护肤",
    basePrice: 79,
    baseOriginalPrice: 109,
    baseSales: 2300,
    baseRating: 4.8,
    baseStock: 150,
    features: ["好吸收", "清爽不黏", "湿敷友好"],
    variants: [
      { prefix: "舒缓", subtitle: "适合泛红和换季不稳定时期。" },
      { prefix: "补水", subtitle: "作为基础补水很稳，不挑肤质。" },
      { prefix: "平衡", subtitle: "适合混合皮，夏天也不闷。" },
      { prefix: "喷雾型", subtitle: "补涂方便，办公桌也能放。" },
      { prefix: "轻拍型", subtitle: "更适合手拍吸收，不费化妆棉。" },
      { prefix: "保湿型", subtitle: "秋冬更友好，肤感更柔润。" }
    ]
  }),
  ...createBatchProducts({
    startId: 415,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "面膜",
    tag: "急救",
    basePrice: 59,
    baseOriginalPrice: 79,
    baseSales: 1960,
    baseRating: 4.8,
    baseStock: 136,
    features: ["贴合度高", "补水快", "旅行友好"],
    variants: [
      { prefix: "补水", subtitle: "最稳的基础款，适合多数用户。" },
      { prefix: "舒缓", subtitle: "熬夜后和晒后使用更合适。" },
      { prefix: "提亮", subtitle: "重要日子前临时急救更方便。" },
      { prefix: "保湿", subtitle: "秋冬更好用，干皮更友好。" },
      { prefix: "熬夜", subtitle: "第二天状态更在线一些。" },
      { prefix: "修护", subtitle: "作为屏障期补充也更合适。" }
    ]
  }),
  ...createBatchProducts({
    startId: 421,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
    ],
    baseName: "防晒乳",
    tag: "日常防晒",
    basePrice: 99,
    baseOriginalPrice: 139,
    baseSales: 2400,
    baseRating: 4.8,
    baseStock: 118,
    features: ["成膜快", "不搓泥", "通勤友好"],
    variants: [
      { prefix: "轻薄", subtitle: "通勤日常最省心，肤感更轻。" },
      { prefix: "润色", subtitle: "素颜也能提一点气色。" },
      { prefix: "敏感肌", subtitle: "更温和，日常上脸更稳。" },
      { prefix: "户外", subtitle: "更适合长时间在外活动。" },
      { prefix: "控油", subtitle: "混油皮更友好，夏天更稳。" },
      { prefix: "保湿", subtitle: "秋冬干皮更合适，不易起皮。" }
    ]
  })
];

const categories = [
  {
    id: "fashion",
    name: "服饰穿搭",
    cover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    description: "低饱和配色，适合通勤和周末。",
    products: fashionProducts
  },
  {
    id: "home",
    name: "家居生活",
    cover: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description: "让空间更整洁，也更有氛围。",
    products: homeProducts
  },
  {
    id: "fresh",
    name: "精选食品",
    cover: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    description: "适合周补货，厨房常备更省心。",
    products: freshProducts
  },
  {
    id: "beauty",
    name: "护肤个护",
    cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    description: "温和稳定，适合日常回购。",
    products: beautyProducts
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
  { key: "coupon", title: "优惠券", subtitle: "查看可用优惠券" },
  { key: "member", title: "会员中心", subtitle: "MORI BLACK 年度会员" },
  { key: "support", title: "客服与帮助", subtitle: "7 x 24 在线服务" }
];

const serviceContent = {
  address: {
    title: "收货地址",
    desc: "管理常用收货信息。",
    records: []
  },
  coupon: {
    title: "优惠券中心",
    desc: "领取后可在结算时直接使用。",
    records: []
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
    desc: "演示帮助中心，适合后续接 FAQ、工单和在线客服入口。",
    records: [
      { title: "配送说明", text: "现货商品 48 小时内发货，生鲜支持次日达。" },
      { title: "售后规则", text: "签收后 7 天内支持申请售后，虚拟商品除外。" },
      { title: "联系客服", text: "工作日 09:00 - 22:00，节假日 10:00 - 18:00。" }
    ]
  },
  new: {
    title: "新品速览",
    desc: "给首页快捷入口使用的演示页面。",
    records: [
      { title: "春季新品", text: "当前分类总商品数已经扩充到 80+，首页和搜索也会同步更丰富。" },
      { title: "编辑推荐", text: "云感短风衣、原木早餐托盘、手作酸种面包、修护精华油。" }
    ]
  }
};

const profile = {
  name: "MORI 会员",
  memberId: "ID 20260420",
  level: "BLACK CARD",
  avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Mori&backgroundColor=fde3d5,e9d5ff,dbeafe",
  stats: [
    { label: "成长值", value: "3,680" },
    { label: "优惠券", value: "6" },
    { label: "全部订单", value: "12" }
  ]
};

const deliveryAddress = {
  name: "张女士",
  phone: "13800001234",
  detail: "上海市 徐汇区 田林路 388 号 2 栋 1201"
};

const cartSeed = {
  101: 1,
  202: 2
};

function getCatalog() {
  return categories;
}

function getAllProducts() {
  return categories.reduce((items, group) => items.concat(group.products), []);
}

function getProductById(id) {
  return getAllProducts().find((item) => String(item.id) === String(id)) || null;
}

module.exports = {
  flashSale,
  categories,
  quickEntries,
  orderTabs,
  orderList,
  profileTools,
  serviceContent,
  profile,
  deliveryAddress,
  cartSeed,
  getCatalog,
  getAllProducts,
  getProductById
};
