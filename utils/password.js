const PASSWORD_SALT = "mori-mini-auth-v1";

function rightRotate(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

function sha256(ascii) {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = "length";
  let result = "";
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  const hash = [];
  const k = [];
  let primeCounter = 0;
  const isComposite = {};

  for (let candidate = 2; primeCounter < 64; candidate += 1) {
    if (!isComposite[candidate]) {
      for (let multiple = 0; multiple < 313; multiple += candidate) {
        isComposite[multiple] = candidate;
      }

      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter += 1;
    }
  }

  ascii += "\x80";
  while ((ascii[lengthProperty] % 64) - 56) {
    ascii += "\x00";
  }

  for (let index = 0; index < ascii[lengthProperty]; index += 1) {
    const code = ascii.charCodeAt(index);
    words[index >> 2] |= code << (((3 - index) % 4) * 8);
  }

  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (let chunkIndex = 0; chunkIndex < words[lengthProperty];) {
    const w = words.slice(chunkIndex, (chunkIndex += 16));
    const oldHash = hash.slice(0);

    for (let index = 0; index < 64; index += 1) {
      const w15 = w[index - 15];
      const w2 = w[index - 2];
      const a = hash[0];
      const e = hash[4];
      const temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[index]
        + (w[index] = index < 16
          ? w[index]
          : (
            w[index - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[index - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
      const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash.unshift((temp1 + temp2) | 0);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }

    for (let index = 0; index < 8; index += 1) {
      hash[index] = (hash[index] + oldHash[index]) | 0;
    }
  }

  for (let index = 0; index < 8; index += 1) {
    for (let offset = 3; offset + 1; offset -= 1) {
      const byte = (hash[index] >> (offset * 8)) & 255;
      result += ((byte < 16) ? 0 : "") + byte.toString(16);
    }
  }

  return result;
}

function buildPasswordHash(username, password) {
  return sha256(`${PASSWORD_SALT}:${String(username || "").trim()}:${String(password || "")}`);
}

function isPasswordValid(account, password) {
  if (!account) {
    return false;
  }

  const hashed = buildPasswordHash(account.username, password);
  if (account.passwordHash) {
    return account.passwordHash === hashed;
  }

  return account.password === password;
}

function normalizeAccount(account) {
  if (!account) {
    return account;
  }

  if (account.passwordHash) {
    const { password, ...rest } = account;
    return rest;
  }

  const { password, ...rest } = account;
  return {
    ...rest,
    passwordHash: buildPasswordHash(account.username, password),
    passwordUpdatedAt: new Date().toISOString().slice(0, 16).replace("T", " ")
  };
}

module.exports = {
  buildPasswordHash,
  isPasswordValid,
  normalizeAccount
};
