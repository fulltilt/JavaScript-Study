function camelCaseKeys(object) {
  throw "Not implemented";
}

module.exports = camelCaseKeys;

/*
Implement a function camelCaseKeys, that takes an object and returns a new object with all its keys converted to camel case.

Camel case is a format where words are separated with a single capitalized letter and the first letter of the word will be lower case. Some examples:

String	camelCase
foo	Yes
fooBar	Yes
Foo_Bar	No
foo_bar	No
For simplicity, we only need to consider the 4 string formats above, there will not be keys containing spaces, hyphens, or PascalCase.

Examples
camelCaseKeys({ foo_bar: true });
// { fooBar: true }

camelCaseKeys({ foo_bar: true, bar_baz: { baz_qux: '1' } });
// { fooBar: true, barBaz: { bazQux: '1' } }

camelCaseKeys([{ baz_qux: true }, { foo: true, bar: [{ foo_bar: 'hello' }] }]);
// [{ bazQux: true }, { foo: true, bar: [{ fooBar: 'hello' }] }]
Notes
You can assume the input is always a valid, plain JavaScript object or array.
*/

/*
This question is similar to Squash Object, where we need a function to apply some changes to the keys of an object.

Clarification Questions
Is every key going to be snake-cased? What if there are keys that use other naming conventions?
Ignore these keys and skip processing of such keys.
Do we only care about enumerable, non-inherited string keys? Are we interested in converting inherited keys?
They can be ignored.
Can the object contain cyclic references?
We can ignore that case.
Solution
The solution can be broken down into two main parts:

Traverse the objects and apply changes to every key (i.e. snake case to camel case).
Return a new object with the changes applied without modifying the existing input object.
There are generally two ways we can explore an object:

Looping through the keys with the old school for ... in statement. This approach reveals inherited, enumerable properties, which is normally not what we want. Instead we should add an additional check with hasOwnProperty or Object.hasOwn to make sure the properties are not from the prototypal inheritance.
Converting the object into an array of keys with Object.keys, or an array of a key-value tuple with Object.entries. This approach works if we don't care about Symbol keys and non-enumerable keys. Often, this is indeed the case.
Also note we need to traverse recursively if we find the value of the current property is also an object. And recursion comes with its own caveats and overhead we need to be aware of:

What if the object has too many levels of nesting, then the recursion stack gets too deep? In that case we would either face a stack overflow error or risk the UI remaining unresponsive for too long.
What if the object is cyclic, i.e. it has circular references, then a naive recursion implementation would never exit.
Now that we have figured out how to traverse the object, next we need to check the type of the current input and handle each type differently:

If the input is an object, we traverse that object using the aforementioned approaches. We can use the typeof operator to check its type. Be careful with null as typeof null results in 'object', which is a known issue in JavaScript.
If the input is an array, we iterate through the array with the Array.prototype.map() method, which gives us a new array, and invoke the function recursively on each item of the array. We can use Array.isArray() to check if the input is an array.
For anything else, we return it as-is.
The next thing to talk about is how we can should identify snake-cased keys and camel case-ify them. One simple way to achieve that is to use String.prototype.split() to divide keys into substrings separated by _, and join them back to a new string with substrings being capitalized (except for the first one). Another way to do is to use regex, which can be extended easily if we want to support other naming conventions, such as Pascal case.


JavaScript

TypeScript
/**
 * @param {string} str
 * @return {string}
 *
function camelCase(str) {
  return str
    .toLowerCase()
    .replace(/([_])([a-z])/g, (_match, _p1, p2) => p2.toUpperCase());
}

/**
 * @param Object
 * @return Object
 *
export default function camelCaseKeys(object) {
  if (Array.isArray(object)) {
    return object.map((item) => camelCaseKeys(item));
  }

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      camelCase(key),
      camelCaseKeys(value),
    ]),
  );
}
Resources
camelcase-keys library on GitHub
*/
