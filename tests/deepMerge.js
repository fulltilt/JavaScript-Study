function deepMerge(objA, objB) {
  throw "Not implemented";
}

module.exports = deepMerge;

/*
Implement a function deepMerge(objA, objB) to takes in two objects and returns a new object after deep merging them:

The resulting object should contain a union of the keys/values of both objects.
If the same key is present on both objects, the merged value will be from objB, unless:
Both values are arrays: the elements from objB will be appended behind objA's.
Both values are objects: merge the objects as per the same rules for deepMerge.
Arrays and objects within the merged object should be new instances.
The input objects should not be modified.

Examples
deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
deepMerge({ a: 1 }, { a: 2 }); // { a: 2 }
deepMerge({ a: 1, b: [2] }, { b: [3, 4] }); // { a: 1, b: [2, 3, 4] }
*/

/*
Clarification Questions
Can non-primitives values in the merged object reference the original objects?
Yes, as long as the original objects are not modified.
Solution
Since the input objects can be deeply nested structures, a recursive solution can be used to traversing both values at the same time. The idea is to recursively visit all object values and combine the contents depending on the type of values at the same position in the objects.

Based on the rules, we only need to combine overlapping values that are arrays or objects. Hence there are three cases we need to handle:

Both values are arrays: Combine the values by building a new array from the contents of both arrays.
Both values are objects: Create a clone of objA, then iterate through keys in objB, calling deepMerge on the values for the keys that exist in both objects. The returned value is the value that should exist within the merged object. We need to do strict checks for whether an object is a plain JavaScript object as there could be object-like values within the input like null, Date, RegExp where typeof value will return 'object' for these values.
Values are neither both arrays or both objects: Return objB since it comes later and should overwrite the value at the same position within objA.
/**
 * @param {Object} objA
 * @param {Object} objB
 * @returns Object
 *
export default function deepMerge(objA, objB) {
    // Both values are arrays.
    if (Array.isArray(objA) && Array.isArray(objB)) {
      return [...objA, ...objB];
    }
  
    // Both values are objects.
    if (isPlainObject(objA) && isPlainObject(objB)) {
      const newObj = { ...objA };
      for (const key in objB) {
        if (Object.prototype.hasOwnProperty.call(objA, key)) {
          newObj[key] = deepMerge(objA[key], objB[key]);
        } else {
          newObj[key] = objB[key];
        }
      }
      return newObj;
    }
  
    // Return the second value as it will "win" in case of an overlap.
    return objB;
  }
  
  function isPlainObject(value) {
    if (value == null) {
      return false;
    }
  
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  }
  Note that the merged object can contain references to values in the original objects. This happens in the case where arrays contains objects and these objects aren't directly processed with deepMerge. If a full copy of the objects is desired, you can deep clone both objects first before merging or deep clone the resulting object.
  
  Edge Cases
  Non-plain JavaScript object values like null, Date, Symbol should be treated as non-objects.
*/
