function squashObject(obj) {
  throw "Not implemented";
}

module.exports = squashObject;

/*
Implement a function that returns a new object after squashing the input object into a single level of depth where nested keys are "squashed" together with a period delimiter (.).

Examples
const object = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3,
    },
  },
};

squashObject(object); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }
Any keys with null-ish values (null and undefined) are still included in the returned object.

const object = {
  a: { b: null, c: undefined },
};
squashObject(object); // { 'a.b': null, 'a.c': undefined }
It should also work with properties that have arrays as the value:

const object = { a: { b: [1, 2, 3], c: ['foo'] } };
squashObject(object); // { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }
Empty keys should be treated as if that "layer" doesn't exist.


const object = {
  foo: {
    '': { '': 1, 1bar: 2 },
  },
};
squashObject(object); // { foo: 1, 'foo.bar': 2 }
*/

/*
This is a pretty tricky question, because not only do we need to traverse the object using recursion, but we also have to change the shape of the object, i.e. glueing all keys of a given path when we reach a primitive value. This also requires we keep track of the keys while traversing down the tree (the object).

There are generally two ways we can explore an object:

Loop through the keys with the old school for ... in statement.
Converting the object into an array of keys with Object.keys, or an array of a key-value tuple with Object.entries.
With the for ... in statement, inherited enumerable properties are be processed as well. So normally you'd add a Object.hasOwn() check to make sure the property is not inherited from its prototype. On the other hand, Object.keys and Object.entries only care about the properties directly defined on the object, and this is usually what we want.

Here is how we would go about visiting each property. When the value of a given property is an object, we would have to repeat the process with recursion.

function squashObject(object) {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value !== 'object' || value !== null) {
      // Add props with glued/squashed keys.
    } else {
      // Recursion by calling squashObject.
    }
  }
}
We also need to keep track of the keys that are on the path to the current value so that we can squash them to form the new keys of the output object. To do that, we need to pass the keys down to the recursion call. We add a new parameter call path that is an array of strings that stores the key explored on a given path. When the current value is a primitive value, i.e. we are the end of the object, we join path together to form the key and assign the value to it.

Here is the solution.

/**
 * @param {Object} obj
 * @param {Array} path
 * @param {Object} output
 * @return {Object}
 *
export default function squashObject(object, path = [], output = {}) {
    for (const [key, value] of Object.entries(object)) {
      if (typeof value !== 'object' || value === null) {
        output[path.concat(key).filter(Boolean).join('.')] = value;
      } else {
        squashObject(value, path.concat(key), output);
      }
    }
  
    return output;
  }
  If this still looks confusing to you, no worries because most people find recursion to be hard to follow and comprehend. The thinking involves holding in your head multiple levels of the call stack at the same time and it takes time and practice to get used to.
  
  Alternative Solution
  This question is interesting in the sense that it asks you to make a new object based on the current object with a different shape. In the previous solution, we achieved that by recursively passing down the output object and assigning the new key directly to the output object when the value is a primitive.
  
  Another technique we can use to process objects is to convert the objects into an array of key-value tuples with Object.entries and transform those tuples with array methods such as Array.prototype.map and then convert it back to an object by Object.fromEntries.
  
  Let's say we have the following object:
  
  const object = {
    a: 5,
    c: {
      f: 9,
    },
  };
  Object.entries(object) would give us [['a', 5], ['c', { f: 9 }]]. To get the object with the squashed keys, i.e. { a: 5, 'c.f': 9 }, we need to transform array [['a', 5], ['c', { f: 9 }]] into [['a', 5], ['c.f', 9]] and pass it to Object.fromEntries.
  
  Here is the second solution and you might find it easier to understand than the previous solution.
  
  function chunk(array, size = 2) {
    // Helper function that groups two adjacent items in an array into one subarray.
    const chunkedArray = [];
    while (array.length) {
      chunkedArray.push(array.splice(0, size));
    }
    return chunkedArray;
  }
  
  function traverse(object, path = []) {
    if (typeof object !== 'object' || object === null) {
      return [path.join('.'), object];
    }
  
    return Object.entries(object).flatMap(([key, value]) => {
      const newPath = key === '' ? [...path] : [...path, key];
      return traverse(value, newPath);
    });
  }
  
  export default function squashObject(object) {
    const flattened = traverse(object);
    return Object.fromEntries(chunk(flattened));
  }
  Edge Cases
  The input has to be an object, not a primitive value.
  Symbol-keyed properties and non-enumerable properties are ignored.
  Cyclic objects are not handled properly.
  Conflicting keys with different values. JavaScript keys can contain . too, and existing keys which contain . may conflict with a resulting key. E.g. { a: { b: 1 }, 'a.b': 2 }.
  You should point this case out during interviews but probably won't have to handle it.
  Keys which are empty strings.
*/
