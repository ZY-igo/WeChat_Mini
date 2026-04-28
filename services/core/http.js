const DEFAULT_DELAY = 120;

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function mockRequest(options) {
  const {
    url,
    method = "GET",
    data = {},
    delay = DEFAULT_DELAY,
    mockData
  } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: "ok",
        meta: {
          url,
          method,
          mocked: true
        },
        data: clone(typeof mockData === "function" ? mockData(data) : mockData)
      });
    }, delay);
  });
}

module.exports = {
  mockRequest
};
