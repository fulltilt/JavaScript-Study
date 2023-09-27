function deepClone(value) {
  throw "Not implemented!";
}

module.exports = deepClone;

/*
Note: This is an advanced version of the Deep Clone question, which you should complete first before attempting this question.

It is not realistic to expect candidates to produce a complete deep clone solution in typical interview settings, though the interviewer might ask you a simple version a la Deep Clone and engage you in a discussion regarding the edge cases and how you would handle them.

Implement a deepClone function that performs a deep clone as thoroughly as possible, while also handling the following:

The input object can contain any data type.
Handle the edge case where the input object is cyclic, i.e. the circular references should also be cloned.
Examples

const obj1 = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: 'foo', id: 1 },
  arr: [0, 1, 2],
  date: new Date(),
  reg: new RegExp('/bar/ig'),
  [Symbol('s')]: 'baz',
};

const clonedObj1 = deepClone(obj1);
clonedObj1.arr.push(3);
obj1.arr; // Should still be [0, 1, 2]

const obj2 = { a: {} };
obj2.a.b = obj2; // Circular reference

const clonedObj2 = deepClone(obj2); // Should not cause a stack overflow by recursing into an infinite loop.

clonedObj2.a.b = 'something new';

obj2.a.b === obj2; // This should still be true
*/

/*
Note: This is an advanced version of the Deep Clone question, which you should complete first before attempting this question.

This is a follow-up question based on Deep Clone, with much more depth and obscure corners of the JavaScript language covered.

It is not realistic to expect anyone to come up with a complete deep clone solution in typical interview settings. However, this question serves a good tool to test your knowledge on checking various data types, object properties, leverage various built-in APIs and Object methods to traverse a given object and various edge cases you might only encounter when writing library code.

Solution
Before we go about writing out the deep clone function, we need a way to identify the data type of a given JavaScript value. It is ok to go with typeof and instanceof but you have to be aware of their limitations. In this solution, we leverage Object.prototype.toString. Check out Zhenghao's post "A Complete Guide To Check Data Types In JavaScript" if you like to understand how this works exactly.

Since we want to implement it as thoroughly as possible, here are a few things to consider:

This advanced deepClone should work with objects that have symbol-keyed properties. That is, symbol-keyed properties are also copied. On top of that, non-enumerable properties should also be copied. Neither the for ... in statement or the Object.entries()/Object.keys() reveals them, so we need to leverage a lesser-known API called Reflect.ownKeys(). Check out this MDN page to learn more about it.
The input object's property descriptors should also be copied. For that, we can use the method Object.getOwnPropertyDescriptors().
The input object's prototype should not be lost after the copying. We can use Object.getPrototypeOf() to get a reference to the prototype of a given object.
We should account for circular references in the input object and avoid erroring. We can achieve this by having a cache (a Map underneath) that acts as a cache to store visited properties. After cloning an object, we can put the cloned object in cache with the original object as the key. If we encounter the same value again in the original object while cloning, we can retrieve the cloned value from the cache.

JavaScript

TypeScript
function isPrimitiveTypeOrFunction(value) {
  return (
    typeof value !== 'object' || typeof value === 'function' || value === null
  );
}

function getType(value) {
  const type = typeof value;
  if (type !== 'object') {
    return type;
  }

  return Object.prototype.toString
    .call(value)
    .replace(/^\[object (\S+)\]$/, '$1')
    .toLowerCase();
}

function deepCloneWithCache(value, cache) {
  if (isPrimitiveTypeOrFunction(value)) {
    return value;
  }

  const type = getType(value);

  if (type === 'set') {
    const cloned = new Set();
    value.forEach((item) => {
      cloned.add(deepCloneWithCache(item, cache));
    });
    return cloned;
  }

  if (type === 'map') {
    const cloned = new Map();
    value.forEach((value_, key) => {
      cloned.set(key, deepCloneWithCache(value_, cache));
    });
    return cloned;
  }

  if (type === 'function') {
    return value;
  }

  if (type === 'array') {
    return value.map((item) => deepCloneWithCache(item));
  }

  if (type === 'date') {
    return new Date(value);
  }

  if (type === 'regexp') {
    return new RegExp(value);
  }

  if (cache.has(value)) {
    return cache.get(value);
  }

  const cloned = Object.create(Object.getPrototypeOf(value));

  cache.set(value, cloned);
  for (const key of Reflect.ownKeys(value)) {
    const item = value[key];
    cloned[key] = isPrimitiveTypeOrFunction(item)
      ? item
      : deepCloneWithCache(item, cache);
  }

  return cloned;
}

/**
 * @template T
 * @param {T} value
 * @return {T}
 *
export default function deepClone(value) {
    return deepCloneWithCache(value, new Map());
  }
  One-liner Solution
  As of writing, all major browsers have native support for performing deep clone via the structuredClone API. Check out "Deep-copying in JavaScript using structuredClone" on web.dev if you want to learn more about structuredClone's features and limitations.
  
  const clonedObj = structuredClone(obj);
  Edge Cases
  Property descriptors are not copied.
*/
