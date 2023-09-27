function deepOmit(obj, keys) {
  throw "Not implemented";
}

module.exports = deepOmit;

/*
Implement a function deepOmit(obj, keys) that removes specified keys and their corresponding values from an object, including nested objects or arrays. It works recursively to traverse through the entire object structure, ensuring that all occurrences of the specified keys are removed at all levels. The function takes in an object (obj) and a array of string keys (keys).

Examples
deepOmit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
A more complicated example with nested objects:


const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
deepOmit(obj, ['b', 'c', 'e']); // { a: 1, f: [5, 6] }
*/

/*
Clarification Questions
Can there be values like Date, Symbol, RegExp within the objects?
Yes, there can be.
Should we recurse into Maps and Sets?
To keep the question simple, no. There are no tests cases containing Maps and Sets but you are free to add support if you wish.
Solution
Since the input value can be deeply nested, a recursive solution will be handy for traversing the nested values. The idea is to recursively visit all values in the input, iterating through array items and object entries, filtering out object entries where keys are within the keys parameter.

Since arrays and objects need special handling, there are three categories of values we need to handle:

Arrays: Use Array.isArray() to check for this type. Iterate through the array and return a new array of each element after mapping with deepOmit().
Objects: A helper function isPlainObject() (from Type Utilities II) is used to check for plain object types. Doing typeof element === 'object' && element !== null won't work because there are other values like Date and Set that will pass the check. Iterate through the keys of the object, filter out keys that are within keys, recursively call deepOmit on the values, for non-omitted keys, adding the return values to newObj.
Others: This is the base case for the recursion and we can return the value directly since we don't need to recurse into it.
/**
 * @param {Object} obj
 * @param {Array<string>} keys
 * @returns any
 *
export default function deepOmit(obj, keys) {
    // Handle arrays.
    if (Array.isArray(obj)) {
      return obj.map((item) => deepOmit(item, keys));
    }
  
    // Handle objects.
    if (isPlainObject(obj)) {
      const newObj = {};
      for (const key in obj) {
        if (!keys.includes(key)) {
          newObj[key] = deepOmit(obj[key], keys);
        }
      }
  
      return newObj;
    }
  
    // Other values can be returned directly.
    return obj;
  }
  
  function isPlainObject(value) {
    if (value == null) {
      return false;
    }
  
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  }
  Both arrays and objects can be iterated using for...of loops. A shorter version is as follows. This is safe because the keys inputs are strings and will not match the array keys, which are integers. However, writing it this way is not recommended as the code becomes harder to understand. It also becomes more challenging to write a typesafe version if you are using TypeScript.
  
  
  /**
   * @param {Object} obj
   * @param {Array<string>} keys
   * @returns any
   *
  export default function deepOmit(obj, keys) {
    if (!Array.isArray(obj) && !isPlainObject(obj)) {
      return obj;
    }
  
    // Both arrays and objects can be traversed using `for...in` statements.
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(obj[key], keys);
      }
    }
  
    return newObj;
  }
  
  function isPlainObject(value) {
    if (value == null) {
      return false;
    }
  
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  }
*/
