// #15. implement a simple DOM wrapper to support method chaining like jQuery
function $(el) {
  return {
    css: function (property, value) {
      el.style[property] = value;
      return this;
    },
  };
}

// #38. implement jest.spyOn()
function spyOn(obj, methodName) {
  let calls = [];

  let fxnCopy = obj[methodName];

  if (!fxnCopy || typeof fxnCopy !== "function") throw new Error();

  obj[methodName] = function (...args) {
    calls.push(args);
    return fxnCopy.apply(this, args);
  };

  return {
    calls,
  };
}

// #54. flatten Thunk
/*
type Callback = 
  (error: Error, result: any | Thunk) => void

A Thunk is a function that take a Callback as parameter

type Thunk = (callback: Callback) => void
*/
function flattenThunk(thunk) {
  return function (callback) {
    function wrapper(err, res) {
      if (typeof res === "function") {
        res(wrapper);
      } else {
        callback(err, res);
      }
    }
    thunk(wrapper);
  };
}
// const func1 = (cb) => {
//   setTimeout(() => cb(null, "ok"), 1000);
// };
// const func2 = (cb) => {
//   setTimeout(() => cb(null, func1), 1000);
// };
// const func3 = (cb) => {
//   setTimeout(() => cb(null, func2), 1000);
// };
// flattenThunk(func3)((error, data) => {
//   console.log(data); // 'ok'
// });

// #56. call APIs with pagination
// NOTE: amount is the total amount of items we want
const fetchListWithAmount = async (amount = 5) => {
  const result = [];

  function wrapper(id) {
    return fetchList(id).then(({ items }) => {
      result.push(...items);
      if (items.length === 0 || result.length >= amount)
        return result.slice(0, amount);
      return wrapper(result[result.length - 1].id);
    });
  }

  return wrapper();
};

// #64. auto-retry Promise on rejection
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise((resolve, reject) => {
    let count = 0;
    function retry() {
      fetcher()
        .then((res) => resolve(res))
        .catch((err) => {
          if (++count <= maximumRetryCount) retry();
          else reject(err);
        });
    }
    retry();
  });
}

function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return fetcher()
    .then((res) => res)
    .catch((e) => {
      if (maximumRetryCount === 0) {
        throw e;
      } else {
        return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
      }
    });
}

// #83. create an interval
// NOTE: intervalIdMap and globalId part was added to get the clearInterval stuff to work
/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
let intervalIdMap = new Map();
let globalId = 0;
/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
function mySetInterval(func, delay, period) {
  let count = 0;
  let id = globalId++;

  function wrapper() {
    let _id = window.setTimeout(() => {
      func();
      wrapper();
    }, delay + period * count++);
    intervalIdMap.set(id, _id);
  }
  wrapper();

  return id;
}

/**
 * @param { number } id
 */
function myClearInterval(id) {
  window.clearTimeout(intervalIdMap.get(id));
  intervalIdMap.delete(id);
}

// #92. throttle Promises
// NOTE: you need to map the funcs array to call each fxn as funcs is an array of fxns returning promises
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max) {
  return new Promise((resolve, reject) => {
    let res = [];
    let count = 0;
    function wrapper() {
      Promise.all(funcs.slice(count, count + max).map((fn) => fn()))
        .then((data) => {
          res = res.concat(data);
          count += 5;
          if (count < funcs.length) wrapper();
          else resolve(res);
        })
        .catch((err) => reject(err));
    }
    wrapper();
  });
}
