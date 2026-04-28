const { mockRequest } = require("../core/http");
const { serviceContent } = require("../mock/shopData");

function getServicePage(type = "support") {
  const current = serviceContent[type] || serviceContent.support;

  return mockRequest({
    url: `/api/service/${type}`,
    mockData: current
  });
}

module.exports = {
  getServicePage
};
