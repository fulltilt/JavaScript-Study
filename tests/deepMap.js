function deepMap(value, fn) {
  throw "Not implemented";
}

module.exports = deepMap;

/*
Implement a function deepMap(value, fn) to return a new value containing the results of calling a provided function on every non-Array and non-Object element in the value input, including elements within nested Arrays and Objects. The function fn is called with a single argument, the element that is being mapped/transformed.

Examples
const double = (x) => x * 2;

deepMap(2, double); // 4
deepMap([1, 2, 3], double); // [4, 5, 6]
deepMap({ a: 1, b: 2, c: 3 }, double); // { a: 2, b: 4, c: 6 }
deepMap(
  {
    foo: 1,
    bar: [2, 3, 4],
    qux: { a: 5, b: 6 },
  },
  double,
); // => { foo: 2, bar: [4, 6, 8], qux: { a: 10, b: 12 } }
*/

/*
Clarification Questions
Should we recurse into Maps and Sets?
To keep the question simple, no. There are no tests cases containing Maps and Sets but you are free to add support if you wish.
What should the value of this be within the callback function?
The input value.
Solution
Since the input value can be a deeply nested structure, a recursive solution will be handy for traversing the nested values. The idea is to recursively visit all elements in value and transforming each element using the fn function except if the element is an Array or an Object, recursion needs to take place instead.

Since arrays and objects need special handling, there are three categories of values we need to handle:

Arrays: Use Array.isArray() to check for this type. Iterate through the array and return a new array of each mapped element. However, we shouldn't directly call fn on array elements, instead we should recurse into each element. This is because array elements can be non-primitives as well and more recursing can be required.
Objects: A helper function isPlainObject() (from Type Utilities II) is used to check for plain object types. Doing typeof element === 'object' && element !== null won't work because there are other value types like Date and Set that will pass the check. Iterate through the entries of the object and recurse into each object value, similar to array elements.
Primitives: This is the base case for the recursion and we can return the value after mapping it with fn.
The next tricky part of the question is to provide the value of this for the fn via Function.prototype.call()/Function.prototype.apply(). In Array.prototype.map(), the thisArg value can be provided as a second argument to the .map() function and the callback function will be invoked with thisArg as the this value. In our case, the this value within callbacks is not explicitly specified but a reasonable assumption is to use the value input as this. We need to pass the original value object across recursion calls, hence we create a mapHelper() helper function that takes in an extra parameter original, so that all recursive calls have access to both the current element and the original value.

/**
 * @param {any} value
 * @param {Function} fn
 * @returns any
 *
export default function deepMap(value, fn) {
    return mapHelper(value, fn, value);
  }
  
  function isPlainObject(value) {
    if (value == null) {
      return false;
    }
  
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  }
  
  function mapHelper(element, fn, original) {
    // Handle arrays.
    if (Array.isArray(element)) {
      return element.map((item) => mapHelper(item, fn, original));
    }
  
    // Handle plain objects.
    if (isPlainObject(element)) {
      return Object.fromEntries(
        Object.entries(element).map(([key, value]) => [
          key,
          mapHelper(value, fn, original),
        ]),
      );
    }
  
    // Handle other types.
    return fn.call(original, element);
  }
  Edge Cases
  Accessing this within the callback function.
  Values with null, Date, Symbol, etc.
*/
