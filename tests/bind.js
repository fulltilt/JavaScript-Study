Function.prototype.myBind = function (thisArg, ...boundArgs) {
  throw "Not implemented!";
};

module.exports = Function.prototype.myBind;

/*
The Function.prototype.bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

Source: Function.prototype.bind() - JavaScript | MDN

Implement your own Function.prototype.bind without calling the native bind method. To avoid overwriting the actual Function.prototype.bind, implement the function as Function.prototype.myBind.

Examples

const john = {
  age: 42,
  getAge: function () {
    return this.age;
  },
};

const unboundGetAge = john.getAge;
console.log(unboundGetAge()); // undefined

const boundGetAge = john.getAge.myBind(john);
console.log(boundGetAge()); // 42
*/

/*
This question asks us to implement the Function.prototype.bind method, which should behave exactly like the native one. It is a common practice to implement modern, shiny new additions to JavaScript using older, more mature language features so that these APIs can still be used on older browsers. This practice is called polyfilling.

However, writing polyfills that are faithful to the specification and fully compatible with legacy browsers is not an easy task. It is unrealistic to be expected to write one in interview settings. For this question, the interviewers are typically more interested in your familiarity with the native bind method and the this keyword.

Clarification Questions
Can I use other related native methods such Function.prototype.apply and Function.prototype.call?
Yes, you may.
Can I use other modern JavaScript features?
Yes, as long as you do not use Function.prototype.bind.
A refresher on Function.prototype.bind and this
The native bind is a method on Function.prototype, so every function you declare in your program automatically inherits such a method from the prototype chain.

One common use case for bind is to preserve the binding of a method when called as a function. A method call is a function on an object that is being called. For example:

const person = {
  name: 'John',
  getName() {
    return this.name;
  },
};

person.getName(); // 'John'
In a method call, this is implicitly bound to the object that is calling it. Object here refers generally to either a plain old JavaScript object or a function (as we will see later).

person.getName(); // In this case the `this` bound to the method call `getName()` is `person`.
However that's not the case for function calls. A function call is different in that it doesn't get invoked on an object.

For example, we can assign person.getName to another variable so it contains a reference to the same function as person.getName:

const getName = person.getName;
const name = getName(); // In strict mode, this raises a TypeError: Cannot read properties of undefined (reading 'name')
When the same method is called as a function call, there is no implicit binding, thus resulting in this bound to the global object (in non-strict mode) or an error being thrown (in strict mode).

This is where bind comes in handy - we can preserve the context of the method call to person via person.getName.bind(person):

const getName = person.getName.bind(person);
const name = getName(); // 'John'
If you found this confusing, it is normal. this is arguably one of the bad parts about JavaScript, as unlike everything else which is statically bound, only this is dynamically bound, which means that the caller of the function, not the maker of the function, determines its binding. This deviation is a source of confusion.

Another use case for bind is to create partially applied functions with pre-specified initial arguments. Check out the MDN's section on "Partially applied functions" if you need a refresher.

Now that we understand how bind works and its use case, let's try to implement it.

Solution
Solution 1: Using call/apply
Firstly, since the native bind is on Function.prototype, our bind also has to be on it. We'll implement it as Function.prototype.myBind.

Function.prototype.myBind = function () {
  // Implementation goes here...
};
Secondly, the arguments Function.prototype.myBind accepts should be identical to the native one, where the first argument is the this keyword that the target function is bound to, after that it takes a variadic list of arguments to prepend to the arguments of the bound function.

Next, it returns a new function, with its this bound to the previous context passed to Function.prototype.myBind method. When the returned function is invoked, it gets the prepended arguments passed from Function.prototype.myBind as well.

How do we refer to the original method that bind is called upon in the new returned function? Turns out we can access it via this inside Function.prototype.myBind, as Function.prototype.myBind is invoked as a method call, thus resulting in its this bound to the method foo implicitly.

person.getAge.myBind(person); // myBind is a method call and its `this` is bound implicitly to the method `getAge`
Lastly, we can use Function.prototype.call or Function.prototype.apply inside the returned function, to call the original method with the thisArg passed to the myBind method.


JavaScript

TypeScript
/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 *
Function.prototype.myBind = function (thisArg, ...argArray) {
  const originalMethod = this;
  return function (...args) {
    return originalMethod.apply(thisArg, [...argArray, ...args]);
  };
};
Solution 2: Using Reflect
Another thing we need to watch out for: we invoke apply directly on originalFunc. While this is fine most of the time but it does impose a reliability hazard in rare cases. Because of how the property resolution mechanism works in JavaScript, if originalFunc contains a user-defined method/property with the same name call, that shadows Function.prototype.call. As a result, it is the user-defined apply that (if it exists on originalFunc) gets called.

To make our code more robust, we need to be more explicit here. We can either

Call apply via Function.prototype.call: Function.prototype.apply.call as in Function.prototype.apply.call(originalFunc, context, [...argArray, ...args]).
Use Reflect.apply(): A lesser known API added to JavaScript in ES6 to call a target function with arguments as specified.
Here is the robust solution:

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 *
Function.prototype.myBind = function (thisArg, ...argArray) {
  const originalFunc = this;
  if (typeof originalFunc !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  return function (...args) {
    return Reflect.apply(originalFunc, thisArg, [...argArray, ...args]);
    // This also works 👇
    // return Function.prototype.apply.call(originalFunc, thisArg, [
    //   ...argArray,
    //   ...args,
    // ]);
  };
};
Solution 3: Using Symbol
Another approach is to create a Symbol and add it as a property to a newly-created Object with thisArg bound to it.

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 *
Function.prototype.myBind = function (thisArg, ...argArray) {
  const sym = Symbol();
  const wrapperObj = Object(thisArg);
  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  });

  return function (...args) {
    return wrapperObj[sym](...argArray, ...args);
  };
};
Edge Cases
There are still some edge cases with this current solution if we dig deep enough:

We didn't cover the use case where bound functions can be used as constructors with the new operator. This usage rarely comes up in modern web development and should be considered an obscure corner of the language. Check out this MDN page if you are interested in this peculiar behavior of bind.
Note that bind is an ES5 feature. Realistically speaking, if we were to write a bind polyfill, we can't use any features introduced after ES4; otherwise it defeats the purpose because our polyfill with ES5+ features would break on legacy browsers anyway. However, our solution uses the const keyword, the rest operator ..., and Reflect, which are all ES6 features. Refer to this implementation from core-js if you are interested in seeing how the polyfill of bind is implemented.
*/
