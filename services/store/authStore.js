const { profile } = require("../mock/shopData");
const { buildPasswordHash, isPasswordValid, normalizeAccount } = require("../../utils/password");

const ACCOUNTS_KEY = "mori_accounts";
const CURRENT_USER_KEY = "mori_current_user";

const DEFAULT_ACCOUNTS = [
  {
    username: "mori",
    passwordHash: buildPasswordHash("mori", "123456"),
    nickname: "MORI Member",
    avatar: profile.avatar,
    createdAt: "2026-04-20 10:00",
    passwordUpdatedAt: "2026-04-20 10:00"
  },
  {
    username: "demo",
    passwordHash: buildPasswordHash("demo", "demo123"),
    nickname: "Demo User",
    avatar: profile.avatar,
    createdAt: "2026-04-21 09:30",
    passwordUpdatedAt: "2026-04-21 09:30"
  },
  {
    username: "guestvip",
    passwordHash: buildPasswordHash("guestvip", "888888"),
    nickname: "Guest VIP",
    avatar: profile.avatar,
    createdAt: "2026-04-22 14:20",
    passwordUpdatedAt: "2026-04-22 14:20"
  }
];

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function readStorage(key, fallback) {
  try {
    const value = wx.getStorageSync(key);
    return value || fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  wx.setStorageSync(key, value);
}

function ensureAccounts() {
  const accounts = readStorage(ACCOUNTS_KEY, null);
  if (accounts && Array.isArray(accounts) && accounts.length) {
    const normalizedAccounts = accounts.map(normalizeAccount);
    const needsMigration = normalizedAccounts.some((item, index) => {
      return item.passwordHash !== accounts[index].passwordHash || item.password !== accounts[index].password;
    });

    if (needsMigration) {
      writeStorage(ACCOUNTS_KEY, normalizedAccounts);
    }

    return normalizedAccounts;
  }

  writeStorage(ACCOUNTS_KEY, clone(DEFAULT_ACCOUNTS));
  return clone(DEFAULT_ACCOUNTS);
}

function sanitizeUser(account) {
  if (!account) {
    return null;
  }

  return {
    username: account.username,
    nickname: account.nickname,
    avatar: account.avatar || profile.avatar,
    createdAt: account.createdAt
  };
}

function getAccounts() {
  return ensureAccounts().map(sanitizeUser);
}

function getAccountList() {
  return ensureAccounts();
}

function getCurrentUser() {
  return readStorage(CURRENT_USER_KEY, null);
}

function isLoggedIn() {
  return Boolean(getCurrentUser());
}

function login(username, password) {
  const nextUsername = String(username || "").trim();
  const account = getAccountList().find(
    (item) => item.username === nextUsername && isPasswordValid(item, password)
  );

  if (!account) {
    return {
      ok: false,
      message: "账号或密码不正确"
    };
  }

  const user = sanitizeUser(account);
  writeStorage(CURRENT_USER_KEY, user);

  return {
    ok: true,
    user
  };
}

function register(payload) {
  const username = String(payload.username || "").trim();
  const password = String(payload.password || "").trim();
  const nickname = String(payload.nickname || "").trim() || username;

  if (!username || !password) {
    return {
      ok: false,
      message: "请完整填写账号和密码"
    };
  }

  const accounts = getAccountList();
  const exists = accounts.some((item) => item.username === username);
  if (exists) {
    return {
      ok: false,
      message: "该账号已存在"
    };
  }

  const account = {
    username,
    passwordHash: buildPasswordHash(username, password),
    nickname,
    avatar: profile.avatar,
    createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    passwordUpdatedAt: new Date().toISOString().slice(0, 16).replace("T", " ")
  };

  accounts.unshift(account);
  writeStorage(ACCOUNTS_KEY, accounts);

  const user = sanitizeUser(account);
  writeStorage(CURRENT_USER_KEY, user);

  return {
    ok: true,
    user
  };
}

function logout() {
  try {
    wx.removeStorageSync(CURRENT_USER_KEY);
  } catch (error) {
    writeStorage(CURRENT_USER_KEY, null);
  }
}

module.exports = {
  DEFAULT_ACCOUNTS,
  getAccounts,
  getCurrentUser,
  isLoggedIn,
  login,
  register,
  logout
};
