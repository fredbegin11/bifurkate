export const setWithExpiry = (key, value, ttl) => {
  const item = { value, expiry: new Date().getTime() + ttl };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = key => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);

  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};
