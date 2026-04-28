const authStore = require("../../services/store/authStore");
const { navigateAfterLogin } = require("../../utils/auth");

Page({
  data: {
    mode: "login",
    redirect: "/pages/profile/index",
    loginForm: {
      username: "",
      password: ""
    },
    registerForm: {
      nickname: "",
      username: "",
      password: ""
    },
    demoAccounts: []
  },

  onLoad(options) {
    this.setData({
      redirect: options.redirect ? decodeURIComponent(options.redirect) : "/pages/profile/index",
      demoAccounts: authStore.getAccounts()
    });
  },

  switchMode(event) {
    this.setData({
      mode: event.currentTarget.dataset.mode
    });
  },

  fillDemo(event) {
    const { username } = event.currentTarget.dataset;
    const presetMap = {
      mori: "123456",
      demo: "demo123",
      guestvip: "888888"
    };

    this.setData({
      mode: "login",
      "loginForm.username": username,
      "loginForm.password": presetMap[username] || ""
    });
  },

  updateLoginField(event) {
    const { field } = event.currentTarget.dataset;
    this.setData({
      [`loginForm.${field}`]: event.detail.value
    });
  },

  updateRegisterField(event) {
    const { field } = event.currentTarget.dataset;
    this.setData({
      [`registerForm.${field}`]: event.detail.value
    });
  },

  submitLogin() {
    const result = authStore.login(this.data.loginForm.username, this.data.loginForm.password);
    if (!result.ok) {
      wx.showToast({
        title: result.message,
        icon: "none"
      });
      return;
    }

    wx.showToast({
      title: "登录成功",
      icon: "success"
    });
    navigateAfterLogin(this.data.redirect);
  },

  submitRegister() {
    const result = authStore.register(this.data.registerForm);
    if (!result.ok) {
      wx.showToast({
        title: result.message,
        icon: "none"
      });
      return;
    }

    wx.showToast({
      title: "注册成功",
      icon: "success"
    });
    navigateAfterLogin(this.data.redirect);
  }
});
