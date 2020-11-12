let storage = sessionStorage;

function storeNew(key, value) {
  return storage.setItem(keu, value);
}

function removeItem(key) {
  return storage.removeItem(key);
}

function getItem(key) {
  return storage.getItem(key);
}

function flush() {
  storage.clear();
}

module.exports = {
  storeNew,
  removeItem,
  getItem,
  flush,
};
