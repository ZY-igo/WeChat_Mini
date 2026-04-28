const { mockRequest } = require("../core/http");
const { categories, getProductById, getAllProducts } = require("../mock/shopData");

function getCategoryPage(categoryId) {
  return mockRequest({
    url: "/api/catalog",
    data: {
      categoryId
    },
    mockData: ({ categoryId: currentId }) => {
      const activeIndex = categories.findIndex((item) => item.id === currentId);

      return {
        categories,
        activeIndex: activeIndex >= 0 ? activeIndex : 0
      };
    }
  });
}

function getProductDetail(id) {
  return mockRequest({
    url: `/api/products/${id}`,
    mockData: {
      product: getProductById(id),
      recommendList: getAllProducts().filter((item) => String(item.id) !== String(id)).slice(0, 3)
    }
  });
}

module.exports = {
  getCategoryPage,
  getProductDetail
};
