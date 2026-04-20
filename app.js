App({
  globalData: {
    cartMap: {
      "101": 1,
      "202": 2
    }
  },

  getCatalog() {
    return require("./utils/data").catalog;
  },

  getAllProducts() {
    return this.getCatalog().reduce((items, group) => items.concat(group.products), []);
  },

  getProductById(id) {
    return this.getAllProducts().find((item) => String(item.id) === String(id));
  },

  getCartItems() {
    const cartMap = this.globalData.cartMap || {};
    return Object.keys(cartMap)
      .map((id) => {
        const product = this.getProductById(id);
        if (!product || cartMap[id] <= 0) {
          return null;
        }

        return {
          ...product,
          quantity: cartMap[id]
        };
      })
      .filter(Boolean);
  },

  getCartSummary() {
    const items = this.getCartItems();
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const originalAmount = items.reduce((sum, item) => sum + item.quantity * item.originalPrice, 0);

    return {
      items,
      totalCount,
      totalAmount: Number(totalAmount.toFixed(2)),
      savedAmount: Number((originalAmount - totalAmount).toFixed(2))
    };
  },

  updateCart(id, quantity) {
    const next = {
      ...this.globalData.cartMap
    };

    if (quantity <= 0) {
      delete next[id];
    } else {
      next[id] = quantity;
    }

    this.globalData.cartMap = next;
    return this.getCartSummary();
  },

  addToCart(id, count = 1) {
    const current = this.globalData.cartMap[id] || 0;
    return this.updateCart(id, current + count);
  }
});
