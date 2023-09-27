export default function curry(func) {
  throw "Not implemented!";
}

module.exports = curry;

/*
Note: This is an advanced version of Curry II, you should complete that first before attempting this question. Also, this is a hard question and resembles a brainteaser more than an actual question candidates are expected to solve. However, solving this question is rewarding and is sure to improve your knowledge of JavaScript.

Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

Implement the curry function which accepts a function as the only argument and returns a function that accepts a variadic number of arguments (vs only one argument at a time in Curry and a fixed number of arguments in Curry II) and returns a function which can be repeatedly called.

Expected Behaviour of Output
When the returned function is in an expression that suggests the value should be a string or a number, the initial function argument is then invoked with the provided arguments and the result is used as the value.

Examples
function multiply(...numbers) {
  return numbers.reduce((a, b) => a * b, 1);
}
const curriedMultiply = curry(multiply);
const multiplyByThree = curriedMultiply(3);
console.log(multiplyByThree); // 3
console.log(multiplyByThree(4)); // 12

const multiplyByFifteen = multiplyByThree(5);
console.log(multiplyByFifteen); // 15
console.log(multiplyByFifteen(2)); // 30

console.log(curriedMultiply(1)(2)(3)(4)); // 24
console.log(curriedMultiply(1, 2, 3, 4)); // 24
Hint
Look up the Symbol.toPrimitive, Object.prototype.toString() and Object.prototype.valueOf() functions.
*/

/*
his solution assumes you have completed the Curry II question and fully understand its solution.

Solution
Implicit type conversion is the fundamental concept that we need to be aware of here. When variable are used in scenarios with mismatched types, implicit type conversion happens as an attempt to make the operation succeed. Here are some examples from MDN regarding type conversions:

const foo = 42; // foo is a number
const result = foo + '1'; // JavaScript coerces foo to a string, so it can be concatenated with the other operand.
console.log(result); // 421

const bar = '42'; // bar is a string
const result2 = 2 * bar; // JavaScript coerces bar to a number, so it can be multiplied with the other operand.
console.log(result2); // 84
The function returned by curry (we call it curried) is a function, which is a JavaScript object. Under usual circumstances, when a function is coerced into a string, the function's code is used as the string value:

function foo(a, b) {
  return a + b;
}
console.log('hey ' + foo); // hey function foo(a, b) { return a + b }
This is not what we want. We want to call arbitrary logic when a function is used as a primitive value. In order for objects to be used as a primitive value (when being used in console.log() or in expressions), we can override the Symbol.toPrimitive property on objects, which is a method that accepts a preferred type and returns a primitive representation of an object.

Hence the solution to this question can be obtained by modifying the solution of Curry II slightly and calling func.apply(this, args) within the method of Symbol.toPrimitive.


JavaScript

TypeScript
/**
 * @param {Function} func
 * @return {Function}
 *
export default function curry(func) {
    return function curried(...args) {
      const fn = curried.bind(this, ...args);
  
      // Define using an arrow function to preserve `this`.
      fn[Symbol.toPrimitive] = () => func.apply(this, args);
      return fn;
    };
  }
  Edge Cases
  Functions which access this.
  Techniques
  Closures.
  Invoking functions via Function.prototype.apply()/Function.prototype.call().
  Type coercion.
  Notes
  this should be preserved when calling the original function, which can be achieved by using an arrow function.
  Overriding Object.prototype.valueOf and Object.prototype.toString works as well, but defining an implementation for Symbol.toPrimitive is more reliable.
  Resources
  Lodash curry
  Symbol.toPrimitive
*/
