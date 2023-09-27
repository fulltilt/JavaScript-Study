function intersectionBy(iteratee, ...arrays) {
  throw "Not implemented!";
}

module.exports = intersectionBy;

/*
The intersectionBy function takes an iteratee function and multiple arrays as arguments. It creates an array of unique values that are included in all given arrays based on the result of applying the iteratee function to each value. The order and references of result values are determined by the first array.

The iteratee function is invoked with one argument: value, where value is the current value being iterated.

intersectionBy(iteratee, ...arrays);
Arguments
iteratee (Function): The iteratee invoked per element.
arrays (Array): The arrays to inspect.
Returns
(Array): Returns the new array of intersecting values.

Examples
// Get the intersection based on the floor value of each number
const result = intersectionBy(Math.floor, [1.2, 2.4], [2.5, 3.6]); // => [2]

// Get the intersection based on the lowercase value of each string
const result2 = intersectionBy(
  (str) => str.toLowerCase(),
  ['apple', 'banana', 'orange'],
  ['Apple', 'Banana', 'Orange'],
);
// => ['apple']
Notes
In Lodash, iteratee is optional and is the last parameter, but in this question it is a required parameter for simplicity.
If no arrays are provided, the function will return an empty array.
If any of the arrays are empty, the function will return an empty array.
Resources
Lodash _.intersectionBy
*/

/*
/**
 * @param {Function} iteratee - The iteratee function to apply to each value.
 * @param {Array[]} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the unique values present in all given arrays.
 *
export default function intersectionBy(iteratee, ...arrays) {
    if (arrays.length === 0) {
      return [];
    }
  
    const mappedArrays = arrays.map((array) => array.map(iteratee));
    const intersectedValues = mappedArrays[0].filter((value) => {
      return mappedArrays.every((mappedArray) => mappedArray.includes(value));
    });
  
    return intersectedValues.map((value) => {
      const index = mappedArrays[0].indexOf(value);
      return arrays[0][index];
    });
  }
The solution first maps each array using the iteratee function to transform the values. Then, it filters the values from the first mapped array that are present in all the other mapped arrays. Finally, it maps the intersected values back to the original values from the first array.
*/
