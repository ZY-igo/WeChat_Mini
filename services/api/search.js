const { mockRequest } = require("../core/http");
const { categories, getAllProducts } = require("../mock/shopData");

function normalizeKeyword(keyword) {
  return String(keyword || "").trim().toLowerCase();
}

function searchProducts(keyword = "") {
  const currentKeyword = normalizeKeyword(keyword);
  const productList = getAllProducts();
  const results = currentKeyword
    ? productList.filter((item) => {
      const target = [item.name, item.subtitle, item.tag].join(" ").toLowerCase();
      return target.includes(currentKeyword);
    })
    : productList;

  return mockRequest({
    url: "/api/search",
    data: { keyword },
    mockData: {
      keyword,
      hotKeywords: [
        "风衣",
        "针织",
        "香薰",
        "餐盘",
        "面包",
        "精华"
      ],
      categorySuggestions: categories.map((item) => item.name),
      results
    }
  });
}

module.exports = {
  searchProducts
};
