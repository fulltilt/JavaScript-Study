async function promiseMerge(p1, p2) {
  throw "Not implemented";
}

module.exports = promiseMerge;

/*
Implement a function that accepts two promises and returns a single Promise. This returned promise fulfills when both input promises fulfill, with a single value according to the order and types of the fulfillment values:

Numbers should be added together.
Strings should be concatenated.
Arrays should be combined into a single array.
Plain objects should be merged into a single object.
Other types aren't supported.
The return promise can also be rejected if one of the following happens:

The types of the fulfilled results do not match, reject with the string 'Unsupported data types'.
One of the promises fail, reject with the rejected promise's reason.
Examples
await promiseMerge(Promise.resolve(1), Promise.resolve(2)); // 3
await promiseMerge(Promise.resolve('abc'), Promise.resolve('def')); // 'abcdef'
await promiseMerge(Promise.resolve([1, 2, 3]), Promise.resolve([4, 5, 6])); // [1, 2, 3, 4, 5, 6]
await promiseMerge(Promise.resolve({ foo: 1 }), Promise.resolve({ bar: 2 })); // { foo: 1, bar: 2}

await promiseMerge(Promise.resolve(1), Promise.resolve([])); // Rejected with 'Unsupported data types'
await promiseMerge(Promise.reject(1), Promise.resolve(2)); // Rejected with 1
*/

/*
Clarification Questions
What happens if there are overlapping properties on objects to be merged?
They can be overridden simply, a deep merge doesn't need to be performed.
Solution
Solution 1: Manual coordination
We can keep track of the state of the promises by tracking the number of unresolved promises and storing the values of the resolved promises. If there are no unresolved promises left, we can proceed to merge the results and resolve() the returned promise with that result.

Merging the results is straightforward if you know how to check for the common data types, which we have covered in Type Utilities and Type Utilities II. Since only merging of plain objects is supported, we need to differentiate between plain objects and other objects like Sets and Maps.


JavaScript

TypeScript
/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
 *
export default function promiseMerge(p1, p2) {
  let unresolved = 2;
  let p1Result, p2Result;

  return new Promise((resolve, reject) => {
    function then() {
      unresolved--;
      if (unresolved === 0) {
        resolve(mergeResult(p1Result, p2Result));
      }
    }

    p1.then((result) => {
      p1Result = result;
      then();
    }).catch(reject);
    p2.then((result) => {
      p2Result = result;
      then();
    }).catch(reject);
  });
}

function mergeResult(result1, result2) {
  try {
    if (typeof result1 === 'number' && typeof result2 === 'number') {
      return result1 + result2;
    }

    if (typeof result1 === 'string' && typeof result2 === 'string') {
      return result1 + result2;
    }

    if (Array.isArray(result1) && Array.isArray(result2)) {
      return [...result1, ...result2];
    }

    if (isPlainObject(result1) && isPlainObject(result2)) {
      return { ...result1, ...result2 };
    }

    throw 'Unsupported data types';
  } catch {
    throw 'Unsupported data types';
  }
}

function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
Notice that the logic to keep track of the resolved promise results can get repetitive, and it gets worse if the function supports more than 2 promises. Thankfully, there's actually a built-in construct to help with managing state of multiple promises: Promise.all, which we can use to simplify the code.

Solution 2: Using Promise.all()
Using Promise.all() will simplify the code a lot. However, you might not be allowed to use that during interviews, so it's still useful to know how track the states of the promises manually.

/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
 *
export default function promiseMerge(p1, p2) {
  return Promise.all([p1, p2]).then(([result1, result2]) => {
    try {
      if (typeof result1 === 'number' && typeof result2 === 'number') {
        return result1 + result2;
      }

      if (typeof result1 === 'string' && typeof result2 === 'string') {
        return result1 + result2;
      }

      if (Array.isArray(result1) && Array.isArray(result2)) {
        return [...result1, ...result2];
      }

      if (isPlainObject(result1) && isPlainObject(result2)) {
        return { ...result1, ...result2 };
      }

      throw 'Unsupported data types';
    } catch {
      throw 'Unsupported data types';
    }
  });
}

function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
Solution 3: Using serial await (non-optimal)
This solution is very simple but is non-optimal because the promises are resolved serially instead of in parallel.



/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
 *
export default async function promiseMerge(p1, p2) {
  const result1 = await p1;
  const result2 = await p2;

  try {
    if (typeof result1 === 'number' && typeof result2 === 'number') {
      return result1 + result2;
    }

    if (typeof result1 === 'string' && typeof result2 === 'string') {
      return result1 + result2;
    }

    if (Array.isArray(result1) && Array.isArray(result2)) {
      return [...result1, ...result2];
    }

    if (isPlainObject(result1) && isPlainObject(result2)) {
      return { ...result1, ...result2 };
    }

    throw 'Unsupported data types';
  } catch {
    throw 'Unsupported data types';
  }
}

function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
*/
