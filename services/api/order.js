const { mockRequest } = require("../core/http");
const { orderList, orderTabs, deliveryAddress } = require("../mock/shopData");
const cartApi = require("./cart");

function getOrders() {
  return mockRequest({
    url: "/api/orders",
    mockData: {
      orderList,
      orderTabs
    }
  });
}

async function getCheckoutPreview() {
  const cartResponse = await cartApi.getCartSummary();

  return mockRequest({
    url: "/api/orders/preview",
    mockData: {
      items: cartResponse.data.items,
      totalAmount: cartResponse.data.totalAmount,
      totalCount: cartResponse.data.totalCount,
      savedAmount: cartResponse.data.savedAmount,
      address: deliveryAddress
    }
  });
}

async function createOrder() {
  const previewResponse = await getCheckoutPreview();
  await cartApi.clearCart();

  return mockRequest({
    url: "/api/orders",
    method: "POST",
    mockData: {
      orderId: "MO20260428001",
      ...previewResponse.data
    }
  });
}

module.exports = {
  getOrders,
  getCheckoutPreview,
  createOrder
};
