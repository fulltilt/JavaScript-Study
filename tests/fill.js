function fill(array, value, start = 0, end = array.length) {
  throw "Not implemented!";
}

module.exports = fill;

/*
Implement a function fill(array, value, [start=0], [end=array.length]) that fills an array with values from start up to, but not including, end.

Note: This method mutates array.

Arguments
array (Array): The array to fill.
value (*): The value to fill array with.
[start=0] (number): The start position.
[end=array.length] (number): The end position.
Returns
(Array): Returns array.

Examples
fill([1, 2, 3], 'a'); // ['a', 'a', 'a']
fill([4, 6, 8, 10], '*', 1, 3); // [4, '*', '*', 10]
fill([4, 6, 8, 10, 12], '*', -3, -1); // [4, 6, '*', '*', 12]
Make sure to handle negative indices and out of bound indices.

Resources
Lodash _.fill
*/
