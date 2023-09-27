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
