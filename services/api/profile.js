const { mockRequest } = require("../core/http");
const { profile, profileTools, orderTabs } = require("../mock/shopData");

function getProfilePage() {
  return mockRequest({
    url: "/api/profile",
    mockData: {
      profile,
      profileTools,
      orderTabs
    }
  });
}

module.exports = {
  getProfilePage
};
