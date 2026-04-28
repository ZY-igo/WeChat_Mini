const { getCartSummary } = require("./services/api/cart");

App({
  async getCartCount() {
    const response = await getCartSummary();
    return response.data.totalCount;
  }
});
