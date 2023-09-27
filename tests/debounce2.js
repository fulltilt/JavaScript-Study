function debounce(func, wait) {
  throw "Not implemented";
}

module.exports = debounce;

/*
Note: This is an advanced version of Debounce, you should complete that first before attempting this question.

Debouncing is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called. You almost certainly have encountered debouncing in your daily lives before — when entering an elevator. Only after X duration of not pressing the "Door open" button (the debounced function not being called) will the elevator door actually close (the callback function is executed).

Implement a debounce function which accepts a callback function and a wait duration. Calling debounce() returns a function which has debounce invocations of the callback function following the behavior described above.

Additionally, the debounce function comes with two extra methods:

cancel() method to cancel pending invocations.
flush() method to immediately invoke any delayed invocations.
Examples
let i = 0;
function increment() {
  i++;
}
const debouncedIncrement = debounce(increment, 100);

// t = 0: Call debouncedIncrement().
debouncedIncrement(); // i = 0

// t = 50: Cancel the delayed increment.
debouncedIncrement.cancel();

// t = 100: increment() was not invoked and i is still 0.
Flushing to instantly call the debounced function.

let i = 0;
function increment() {
  i++;
}
const debouncedIncrement = debounce(increment, 100);

// t = 0: Call debouncedIncrement().
debouncedIncrement(); // i = 0

// t = 50: i is still 0 because 100ms have not passed.
// t = 51:
debouncedIncrement.flush(); // i is now 1 because flush causes() the callback to be immediately invoked.

// t = 100: i is already 1. The callback has been called before
// and won't be called again.
Note: Due to the use of delays in the tests for this question, tests can take a while to complete execution.
*/

/*
Note: This is an advanced version of Debounce, you should complete that first before attempting this question.

Solution
Observe that the function is more complicated now that we have to implement two additional methods, cancel and flush. There's also duplicate functionality here:

Flow	Cancel existing timer	Invoke original function
Debounced function called before wait is up	✅	✅
cancel()	✅	
flush()	✅	✅
We can create two helper functions:

invoke to call the original function with the latest provided arguments.
clearTimer to cancel an existing timer/timeout.
invoke
Unlike in the first Debounce question, the callback can be prematurely invoked via flush(). Once a delayed callback is flush()-ed, further flush()es shouldn't do anything. So we need to keep track of whether there is an existing pending callback to be invoked and we can use timeoutId to do that. If timeoutId is null, there's no pending callback. If it's a number (value returned from setTimeout), then there's a pending callback.

Hence we should check if timeoutId == null before we proceed with the invocations. We should also clear any existing timers.

Since invoke can be called from two places (within the setTimeout after a delay and manually through flush), we need to save a reference to the arguments the original function needs (this and the arguments) by creating two new function-level variables context and argsToInvoke. They are written to when the debounced function is being called and when invoke is being called, its values will then be used and the original function is called using func.apply/func.call.

clearTimer
The implementation of clearTimer is simple, we can do setTimeout(timeoutId) and set timeoutId to be null.


JavaScript
/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 *
export default function debounce(func, wait = 0) {
    let timeoutId = null;
    let context = undefined;
    let argsToInvoke = undefined;
  
    function clearTimer() {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  
    function invoke() {
      // Don't invoke if there's no pending callback.
      if (timeoutId == null) {
        return;
      }
  
      clearTimer();
      func.apply(context, argsToInvoke);
    }
  
    function fn(...args) {
      clearTimer();
      argsToInvoke = args;
      context = this;
      timeoutId = setTimeout(function () {
        invoke();
      }, wait);
    }
  
    fn.cancel = clearTimer;
    fn.flush = invoke;
    return fn;
  }
  Edge Cases
  The main pitfall in this question is invoking the callback function with the correct this and the arguments. Since the callback function will be invoked by other objects, the value of this will be lost. We retain a reference to this outside the setTimeout (by saving it in a function-level variable called context) and pass it into func.apply()/func.call() as the first argument. The same is done for the arguments the function expects.
  
  We should not implement fn using an arrow function because the value of this within arrow functions has lexical scope, i.e., it is bound to the context in which the function is created, not to the environment in which the function is called. For the other functions, it doesn't matter if we use function declarations or arrow functions.
  
  Techniques
  Using setTimeout.
  Closures.
  How this works.
  Invoking functions via Function.prototype.apply()/Function.prototype.call().
  Notes
  clearTimeout() is a forgiving function and passing an invalid ID to clearTimeout() silently does nothing; no exception is thrown. Hence we don't have to check for timeoutID == null before using clearTimeout().
  
  Resources
  Debouncing and Throttling Explained Through Examples
  Implementing Debounce in JavaScript
  clearTimeout() - Web APIs | MDN
  */
