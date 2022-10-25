const debounce = (callback: (...callBackargs: any[]) => void, wait: number) => {
  let timeoutId: number;
  return (...args: []) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
let lastId = 0;
const getUniqueId = (prefix: string = "id") => {
  lastId++;
  return `${prefix}_${lastId}`;
};
const toggleObjectKey = (obj: any, key: string) => {
  const newObj = { ...obj };
  if (newObj[key]) {
    delete newObj[key];
  } else {
    newObj[key] = key;
  }
};

export { debounce, getUniqueId, toggleObjectKey };
