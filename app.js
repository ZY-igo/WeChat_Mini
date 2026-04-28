const { getCartSummary } = require("./services/api/cart");
const authStore = require("./services/store/authStore");

App({
  async getCartCount() {
    if (!authStore.isLoggedIn()) {
      return 0;
    }

    const response = await getCartSummary();
    return response.data.totalCount;
  }
});
