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
