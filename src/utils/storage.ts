const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const get = (key) => {
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

const clear = () => localStorage.clear();

export const Storage = {
  get,
  set,
  clear
};
