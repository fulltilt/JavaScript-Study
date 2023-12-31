function intersectionWith(comparator, ...arrays) {
  throw "Not Implemented";
}

module.exports = intersectionWith;

/*
The intersectionWith function takes a custom comparator function and multiple arrays as arguments. It compares the elements of the arrays using the comparator function to determine equality. The function returns a new array containing the elements that are present in all given arrays.

intersectionWith(comparator, ...arrays);
Arguments
comparator (Function): The comparator function used to determine equality between elements. The function will be invoked with two arguments (arrVal, othVal) representing the two elements being compared. It should return true if the elements are considered equal, and false otherwise.
arrays (...Array): The arrays to inspect.
Returns
(Array): Returns the array after intersection of arrays.

Examples
const arr1 = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
];
const arr2 = [
  { y: 2, x: 1 },
  { x: 3, y: 4 },
];

const result = intersectionWith(
  (a, b) => a.x === b.x && a.y === b.y,
  arr1,
  arr2,
); // => [{ x: 1, y: 2 }]
Notes
In Lodash, comparator is optional and is the last parameter, but in this question it is a required parameter for simplicity.
The order of elements in the resulting array is determined by the order in which they appear in the first array.
If no arrays are provided, the function will return an empty array.
If any of the arrays are empty, the function will return an empty array.
Resources
Lodash _.intersectionWith
*/

/*
Solution

JavaScript

TypeScript
/**
 * @param {Function} comparator - The comparator function used to determine equality between elements.
 * @param {...Array} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the elements that are present in all given arrays.
 *
export default function intersectionWith(comparator, ...arrays) {
  if (!arrays.length) {
    return [];
  }

  const firstArray = arrays[0];

  // Perform intersection
  return firstArray.filter((value) =>
    arrays
      .slice(1)
      .every((arr) => arr.some((otherValue) => comparator(value, otherValue))),
  );
}
The solution first maps each array using the iteratee function to transform the values. Then, it filters the values from the first mapped array that are present in all the other mapped arrays. Finally, it maps the intersected values back to the original values from the first array.

Resources
Lodash _.intersectionWith
*/
