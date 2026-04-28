const { mockRequest } = require("../core/http");
const { orderTabs, deliveryAddress } = require("../mock/shopData");
const cartApi = require("./cart");
const orderStore = require("../store/orderStore");

function buildOrderId() {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("");
  const tail = String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
  return `MO${stamp}${tail}`;
}

function getOrders() {
  return mockRequest({
    url: "/api/orders",
    mockData: {
      orderList: orderStore.getOrders(),
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
  const orderId = buildOrderId();
  const nextOrder = {
    id: orderId,
    status: "待发货",
    items: previewResponse.data.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    amount: previewResponse.data.totalAmount,
    time: new Date().toISOString().slice(0, 16).replace("T", " ")
  };

  orderStore.prependOrder(nextOrder);
  await cartApi.clearCart();

  return mockRequest({
    url: "/api/orders",
    method: "POST",
    mockData: {
      orderId,
      ...previewResponse.data
    }
  });
}

module.exports = {
  getOrders,
  getCheckoutPreview,
  createOrder
};
