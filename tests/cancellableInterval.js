function setCancellableInterval(callback, delay, ...args) {
  throw "Not implemented";
}

module.exports = setCancellableInterval;

/*
Implement a function setCancellableInterval, that acts like setInterval but instead of returning a timer ID, it returns a function that when called, cancels the interval. The setCancellableInterval function should have the exact same signature as setInterval:

setCancellableInterval(callback);
setCancellableInterval(callback, delay);
setCancellableInterval(callback, delay, param1);
setCancellableInterval(callback, delay, param1, param2);
setCancellableInterval(callback, delay, param1, param2, ..., paramN);
You are recommended to read up on for setInterval on MDN Docs if you are unfamiliar.

Examples

let i = 0;
// t = 0:
const cancel = setCancellableInterval(() => {
  i++;
}, 10);
// t = 10: i is 1
// t = 20: i is 2
cancel(); // Called at t = 25
// t = 30: i is still 2 because cancel() was called and the interval callback has stopped running.
*/

/*
Solution
The benefit of returning a cancel function as opposed to a timerId is that the interval mechanism is abstracted away, and can be swapped for something else. Realistically though, there aren't many other good ways to achieved interval execution in JavaScript and that's why you probably don't see this outside of interviews.

Solution 1: Return a function that calls clearInterval
setInterval returns a timer ID. To cancel the timer, we can call clearInterval(timerId). One simple way to solve this question is to return a function that does exactly that. We can forward all the parameters to setInterval.


JavaScript

TypeScript
/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 *
export default function setCancellableInterval(callback, delay, ...args) {
  const timerId = setInterval(callback, delay, ...args);

  return () => {
    clearInterval(timerId);
  };
}
We can simplify the code a little and forward all the parameters to setInterval.

/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 *
export default function setCancellableInterval(...args) {
  const timerId = setInterval(...args);

  return () => {
    clearInterval(timerId);
  };
}
We don't have to worry about this within the callback function because there's no option to pass a thisArg to setInterval unlike Array.prototype.forEach()/Array.prototype.reduce(). Read more about this on MDN.

Solution 2: Maintain a cancelled flag (non-optimal)
Another way is to maintain a cancelled flag that the returned function will set to true when called. Before the setInterval callback is called, check the value of cancelled before executing the callback. This is non-optimal because the setInterval callback will run forever without doing nothing!

/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 *
export default function setCancellableInterval(callback, delay, ...args) {
  let cancelled = false;
  setInterval(() => {
    if (cancelled) {
      return;
    }

    callback(...args);
  }, delay);

  return () => {
    cancelled = true;
  };
}
Resources
setInterval() | MDN
*/
