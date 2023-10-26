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

/*
JavaScript is a dynamically typed language, which means the types of variable can be changed during runtime. Many interview questions involve recursion of values that contain values of different types and how to handle each value type differs according to the type (e.g. different code is needed to iterate over an array vs an object). Knowledge of handling the JavaScript types is crucial to solving questions like Deep Clone and Deep Equal.

In this question, we will implement the following utility functions to determine the types of primitive values.

isBoolean(value): Return true if value is a boolean, false otherwise.
isNumber(value): Return true if value is a number, false otherwise. Note that NaN is considered a number.
isNull(value): Return true if value is null, false otherwise.
isString(value): Return true if value is a String, else false.
isSymbol(value): Return true if value is a Symbol primitive, else false.
isUndefined(value): Return true if value is undefined, else false.
*/
