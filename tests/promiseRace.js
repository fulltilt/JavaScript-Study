function promiseRace(iterable) {
  throw "Not implemented!";
}

module.exports = promiseRace;

// function promiseRace(iterable) {
//   return new Promise((resolve, reject) => {
//     iterable.forEach((i) => {
//       Promise.resolve(i).then(resolve, reject);
//     });
//   });
// }

/*
The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

If the iterable passed is empty, the promise returned will be forever pending.

If the iterable contains one or more non-promise value and/or an already settled promise, then Promise.race() will resolve to the first of these values found in the iterable.

Source: Promise.race() - JavaScript | MDN

Let's implement our own version of Promise.race(), a promiseRace function, with the difference being the function takes in an array instead of an iterable. Be sure to read the description carefully and implement accordingly!

Examples
const p0 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 400);
});

await promiseRace([p0, p1]); // 42
const p0 = Promise.resolve(42);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

await promiseRace([p0, p1]); // 42

const p0 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 400);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});

try {
  await promiseRace([p0, p1]);
} catch (err) {
  console.log(err); // 'Err!'
}
*/

/*
Async programming is frequently tested during interviews. Understanding how Promise.race works under the hood will help you in understanding the mechanisms behind similar Promise-related functions like Promise.any, Promise.all, Promise.allSettled etc.

Solution
There are a few aspects to this question we need to bear in mind and handle:

Promises are meant to be chained, so the function needs to return a Promise.
If the input array is empty, the returned Promise will be forever pending.
The input array can contain non-Promises.
Solution 1: Using await
We'll return a Promise at the top level of the function. First check if the input array is empty, if so we need to return a forever-pending promise. That can be done by return-ing without calling resolve() or reject().

We then need to attempt resolving every item in the input array. This can be achieved using Array.prototype.forEach or Array.prototype.map.

If an item is resolved, resolve() with the result.
If an item is rejected, reject() with the reason.
Since it's a race, we don't have to do much coordination unlike in Promise.all. Whichever item resolves/rejects first wins the race and calls the resolve/reject function respectively to determine the final state and value/reason of the returned Promise.

One thing to note here is that because the input array can contain non-Promise values, if we are not await-ing them, we need to wrap each value with Promise.resolve() which allows us to use .then() on each of them so we don't have to differentiate between Promise vs non-Promise values and whether they need to be resolved.


JavaScript

TypeScript
/**
 * @param {Array} iterable
 * @return {Promise}
 *
export default function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      return;
    }

    iterable.forEach(async (item) => {
      try {
        const result = await item;
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}
Solution 2: Using Promise.then()
Here's an alternative version which uses Promise.then() if you prefer not to use async/await, which is much shorter.

Note that rejected promises also call .then() and the second parameter of .then() is the callback to handle rejected promises.

/**
 * @param {Array} iterable
 * @return {Promise}
 *
export default function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      return;
    }

    iterable.forEach((item) => Promise.resolve(item).then(resolve, reject));
  });
}
It's important to reject() rejected promises in the .then() call (via the second callback parameter) and not within catch(). The approach below looks similar but doesn't work for cases where the iterable contains both immediately resolved and rejected promises (e.g. [Promise.reject(42), Promise.resolve(2)]).

.catch() is scheduled, and does not run immediately after .then(). For immediately settled promises, then() run before any .catch(), hence the overall Promise is fulfilled with 2 instead of rejected with 42.

export default function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      return;
    }

    iterable.forEach((item) =>
      // Incorrect to use `catch()`, use onReject in `then()`.
      Promise.resolve(item).then(resolve).catch(reject),
    );
  });
}
Edge Cases
Empty input array. A forever-pending promise should be returned.
If the array contains non-Promise values, Promise.race() will resolve to the first of these values found in the iterable.
Techniques
Knowledge of Promises, how to construct one, how to use them.
Async programming.
Resources
Promise.race() - JavaScript | MDN
*/
