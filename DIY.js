// #146. implement Array.prototype.reduce()
Array.prototype.myReduce = function (...args) {
  let [cb, init] = args;
  if (!init && this.length === 0) throw new Error();

  if (init === undefined) init = this[0];

  for (let i = init !== undefined ? 0 : 1; i < this.length; ++i) {
    init = cb(init, this[i], i, this);
  }

  return init;
};

console.log([1, 2, 3, 4, 5, 6].myReduce((a, b) => a + b, -1));

// const arr = [1,2,3,4,5,6]
// const reducer = (a, b) => a + b
// Array.prototype.myReduce = function (...args) {
//     const hasInitialValue = args.length > 1;
//     if (!hasInitialValue && this.length === 0) {
//       throw new Error();
//     }

//     let res = hasInitialValue ? args[1] : this[0];
//     let reducer = args[0];

//     for (let i = hasInitialValue ? 0 : 1; i < this.length; ++i) {
//       res = reducer(res, this[i], i, this);
//     }

//     return res;
//   };

// #151. implement Array.prototype.map()
Array.prototype.myMap = function (callback, context) {
  const length = this.length;
  const res = [];

  // NOTE: for whatever reason if I do this.length, an infinite loop happens. I don't
  // know the test case that triggers this
  for (let i = 0; i < length; ++i) {
    // NOTE: doing it by index for the sparse array possibility
    if (i in this) res[i] = callback.call(context, this[i], i, this);
  }
  return res;
};
// [1, 2, 3].myMap((num) => num * 2); //[2,4,6]

Array.prototype.myMap = function (callback, thisObj) {
  const result = [];
  this.forEach((item, index) => {
    result[index] = callback.call(thisObj, item, index, this);
  });
  return result;
};
