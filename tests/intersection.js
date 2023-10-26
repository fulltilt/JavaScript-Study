function intersection(...arrays) {
  throw "Not implemented!";
}

module.exports = intersection;

/*
Implement a JavaScript function intersection(arrays) that takes multiple arrays as input and returns a new array containing the unique values that are present in all given arrays SameValueZero for equality comparisons. The order and references of result values are determined by the first array.

intersection(...arrays);
Arguments
[arrays] (...Array): The arrays to perform the intersection on.
Returns
(Array): Returns a new array containing the unique values present in all given arrays.

Examples
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const arr3 = [3, 4, 5];

intersection(arr1, arr2, arr3); // => [3]
Constraints
The input arrays may contain any type of values.
The input arrays may have varying lengths.
The input arrays may be empty.
The function should not modify the original arrays.
Resources
Lodash _.intersection
*/
