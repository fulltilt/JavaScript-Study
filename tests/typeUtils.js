export function isArray(value) {
  throw "Not implemented!";
}

export function isFunction(value) {
  throw "Not implemented!";
}

export function isObject(value) {
  throw "Not implemented!";
}

export function isPlainObject(value) {
  throw "Not implemented!";
}

// function isArray(value) {
//   return Array.isArray(value);
// }

// function isFunction(value) {
//   return typeof value === "function";
// }

// function isObject(value) {
//   if (value === null) return false;
//   return typeof value === "object" || typeof value === "function";
// }

// function isPlainObject(value) {
//   if (!value) return false;
//   const prototype = Object.getPrototypeOf(value);
//   return prototype === null || prototype === Object.prototype;
// }

module.exports = { isArray, isFunction, isObject, isPlainObject };
