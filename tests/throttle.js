function throttle(func, wait = 0) {
  throw "Not implemented";
}

module.exports = throttle;

/*
Throttling is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is said to be throttled with a wait time of X milliseconds, it can only be invoked at most once every X milliseconds. The callback is invoked immediately and cannot be invoked again for the rest of the wait duration.

Implement a throttle function which accepts a callback function and a wait duration. Calling throttle() returns a function which throttled invocations of the callback function following the behavior described above.

Examples
let i = 0;
function increment() {
  i++;
}
const throttledIncrement = throttle(increment, 100);

// t = 0: Call throttledIncrement(). i is now 1.
throttledIncrement(); // i = 1

// t = 50: Call throttledIncrement() again.
//  i is still 1 because 100ms have not passed.
throttledIncrement(); // i = 1

// t = 101: Call throttledIncrement() again. i is now 2.
//  i can be incremented because it has been more than 100ms
//  since the last throttledIncrement() call at t = 0.
throttledIncrement(); // i = 2
Follow Up
Throttle with cancel and leading/trailing options.
Reading
Throttle on Lodash Documentation
*/

/*
Throttle, along with debounce, are among the most common front end interview questions; it's the front end equivalent of inverting a binary tree. Hence you should make sure that you are very familiar with both questions.

Solution
A throttled function can be in two states: it's either:

Idle: The throttled function was not invoked in the last wait duration. Calling the throttled function will immediately execute the callback function without any need to throttle. After this happens, the function enters the "Active" state.
Active: The throttled function was invoked within the last wait duration. Subsequent calls should not execute the callback function until wait is over.
Given that there's a wait duration before the function can be invoked again, we know that we will need a timer, and setTimeout is the first thing that comes to mind. Since there are only two states, we can use a boolean variable to model the state.

We will also need to return a function which contains logic surrounding when to invoke the func. This function needs to do a few things:

1) Throttle invocation
The callback function is invoked immediately and doesn't allow only invocations again until a duration of wait has passed. As mentioned earlier, we can use a boolean variable shouldThrottle to model the states.

When the function is called in the "Idle" state, a few things are done:

shouldThrottle is set to true. The function is now in the "Active" state.
Invoke func with the appropriate arguments.
Use setTimeout to schedule releasing of the lock (shouldThrottle = false) after wait duration.
While the lock is active, calls to the throttled function will not invoke func because of the shouldThrottle check at the top of the function.

2) Invoke func with the appropriate arguments
Throttled functions are used like the original functions, so we should forward the value of this and function arguments when invoking the original callback functions.

Invoking the original callback function func has to preserve the reference to this. Therefore:

Arrow functions cannot be used to declare the inner function due to lexical binding of this.
Invoking the original callback function via func(...args) will not forward the correct this reference and cannot be used.
Hence we have to use Function.prototype.apply()/Function.prototype.call() which allows us to specify this as the first argument:

func.apply(thisArg, args)
func.call(thisArg, ...args)

JavaScript

TypeScript
/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 *
export default function throttle(func, wait = 0) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}
Note that there are many variations of throttle and this implementation only covers the most common behavior. Some other variations:

Have leading and trailing options, including methods to flush and cancel delayed func invocations, like Lodash's _.throttle.
Collect all the throttled invocations and spread them out by executing them at every wait intervals in the future, respecting the rule that there can only be at most one invocation every wait duration. In contrast, this current implementation ignores all throttled function invocations when the lock is active.
Techniques
Using setTimeout.
Closures.
How this works.
Invoking functions via Function.prototype.apply()/Function.prototype.call().
Resources
Debouncing and Throttling Explained Through Examples
*/
