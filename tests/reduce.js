/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  throw "Not implemented!";
};

module.exports = Array.prototype.myReduce;

/*
Array.prototype.reduce
Completed
Languages
JS
TS
Difficulty
Easy
Recommended duration to spend during interviews
15 mins
Users completed
991 completed
Array.prototype.reduce is a way of "reducing" elements in an array by calling a "reducer" callback function on each element of the array in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

Implement Array.prototype.reduce. To avoid overwriting the actual Array.prototype.reduce which is being used by the autograder, we shall instead implement it as Array.prototype.myReduce.

Examples
[1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
[1, 2, 3].myReduce((prev, curr) => prev + curr, 4); // 10
Notes
There are some nuances regarding how the Array.prototype.reduce function works and what values are being passed to the reducer callback. You are recommended to read the specification for Array.prototype.reduce on MDN Docs before attempting.
*/

/*
This question might seem easy on first glance, but the nuances make the question trickier than it seems on the surface. Knowing the nuances differentiates senior candidates and gives you bonus points. Are you aware that:

The reducer callback is passed the currentIndex and array as the third and fourth argument respectively?
If there is no initial value supplied to the reduce function, the array element at index 0 is used and the iteration starts from the next element (index 1 instead of index 0).
Solution
The rest of the implementation is straightforward with these nuances taken into account. As we loop through the array (via this), call the callback on each array element with the following parameters: acc, element, index, and this. The returned value will become the new acc to be passed to the next call of the callbackFn.


JavaScript

TypeScript
/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 *
Array.prototype.myReduce = function (callbackFn, initialValue) {
    const noInitialValue = initialValue === undefined;
    const len = this.length;
  
    if (noInitialValue && len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  
    let acc = noInitialValue ? this[0] : initialValue;
    let startingIndex = noInitialValue ? 1 : 0;
  
    for (let k = startingIndex; k < len; k++) {
      if (Object.hasOwn(this, k)) {
        acc = callbackFn(acc, this[k], k, this);
      }
    }
  
    return acc;
  };
  Edge Cases
  Empty array, with and without the initialValue argument.
  Single-value array, with and without the initialValue argument.
  Passing the index and array to the reducer callback.
  Sparse arrays, e.g. [1, 2, , 4]. The empty values should be ignored while traversing the array.
  Notes
  Mutating the array in the reduce callback is a bad idea and can cause unintended consequences. It is a positive signal to mention that mutation of the array within the callback is possible. The provided solution follows the TC39 specification for array mutation scenarios:
  
  The range of elements processed by reduce is set before the first callback is called.
  Elements appended to the array after the call to reduce begins will not be visited by the callback.
  If existing elements of the array are changed, their value as passed to the callback will be the value at the time reduce visits them.
  Elements that are deleted after the call to reduce begins and before being visited are not visited.
  One-liner Solution
  You can cheat the autograder by doing this:
  
  Array.prototype.myReduce = Array.prototype.reduce;
  Spec Solution
  Here's a solution that is based off the Array.prototype.reduce ECMAScript specification.
  
  Array.prototype.myReduce = function (callbackFn, initialValue) {
    const len = this.length;
  
    if (
      typeof callbackFn !== 'function' ||
      !callbackFn.call ||
      !callbackFn.apply
    ) {
      throw new TypeError(`${callbackFn} is not a function`);
    }
  
    if (len === 0 && initialValue === undefined) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  
    let k = 0;
    let accumulator = undefined;
  
    if (initialValue !== undefined) {
      accumulator = initialValue;
    } else {
      let kPresent = false;
      while (!kPresent && k < len) {
        // Ignore index if value is not defined for index (e.g. in sparse arrays).
        kPresent = Object.hasOwn(this, k);
        if (kPresent) {
          accumulator = this[k];
        }
        k = k + 1;
      }
  
      if (!kPresent) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
    }
  
    while (k < len) {
      const kPresent = Object.hasOwn(this, k);
      if (kPresent) {
        const kValue = this[k];
        accumulator = callbackFn(accumulator, kValue, k, this);
      }
      k = k + 1;
    }
  
    return accumulator;
  };
  Resources
  Array.prototype.reduce | MDN
  Array.prototype.reduce ECMAScript specification
*/
