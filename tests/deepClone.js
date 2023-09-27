function deepClone(value) {
  throw "Not implemented";
}

module.exports = deepClone;

/*
The term "deep clone" is not formally defined in JavaScript's language specification, but is generally well understood in the community. A deep clone makes a copy of JavaScript value, leading to a completely new value that has no references pointing back to the properties in the original object (if it's an object). Any changes made to the deep-copied object will not affect the original object.

Implement a deepClone function that performs a deep clone operation on JavaScript objects. You can assume the input only contains JSON-serializable values (null, boolean, number, string, Array, Object) and will not contain any other objects like Date, Regex, Map or Set.

Examples

const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.
*/

/*
Writing out a complete deep clone solution from scratch is almost impossible under typical interview constraints. In typical interview settings, the scope is fairly limited, and interviewers are more interested in how you would detect different data types and your ability to leverage various built-in APIs and Object methods to traverse a given object.

Solution
Solution 1: JSON.stringify
The easiest (but flawed) way to deep copy an object in JavaScript is to first serialize it and then deserialize it back via JSON.stringify and JSON.parse.

export default function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}
Although this approach is acceptable given the input object only contains null, boolean, number, string, you should be aware of the downsides of this approach:

We can only copy non-symbol-keyed properties whose values are supported by JSON. Unsupported data types are simply ignored.
JSON.stringify also has other a few surprising behaviors such as converting Date objects to ISO timestamp strings, NaN and Infinity becoming null etc.
Obviously, your interviewer will not allow you to use this.

Solution 2: Recursion
Here is a solution that doesn't rely on JSON.stringify and JSON.parse.


JavaScript

TypeScript
/**
 * @template T
 * @param {T} value
 * @return {T}
 *
export default function deepClone(value) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
  
    if (Array.isArray(value)) {
      return value.map((item) => deepClone(item));
    }
  
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
    );
  }
  There are generally two ways we can traverse an object:
  
  Loop through the keys with the good old for ... in statement.
  Converting the object into an array of keys with Object.keys(), or an array of a key-value tuple with Object.entries().
  With the for ... in statement, inherited enumerable properties are processed as well. On the other hand, Object.keys() and Object.entries() only care about the properties directly defined on the object, and this is usually what we want.
  
  Edge Cases
  Non-enumerable and symbol-keyed properties are ignored.
  Property descriptors are not respected and copied into the cloned object.
  If the object has circular references, the current solution will break and cause a stack overflow by recursing into an infinite loop.
  Prototypes are not copied.
  We will address these edge cases in Deep Clone II.
  
  One-liner Solution
  As of writing, all major browsers have native support for performing deep clone via the structuredClone API. Check out "Deep-copying in JavaScript using structuredClone" on web.dev if you want to learn more about structuredClone's features and limitations.
  
  
  const clonedObj = structuredClone(obj);
*/
