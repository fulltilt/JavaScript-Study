function get(object, path, defaultValue) {
  throw "Not implemented!";
}

module.exports = get;

/*
Before the optional chaining operator (?.) existed, it was sometimes troublesome to access deeply-nested properties in huge JavaScript objects when some of the intermediate properties might not be present.

const john = {
  profile: {
    name: { firstName: 'John', lastName: 'Doe' },
    age: 20,
    gender: 'Male',
  },
};

const jane = {
  profile: {
    age: 19,
    gender: 'Female',
  },
};

function getFirstName(user) {
  return user.profile.name.firstName;
}
Doing getFirstName(john) works but getFirstName(jane) will error because the name property doesn't exist for jane.profile.

Lodash's Get method
Lodash's _.get method was created as a solution for such use cases.

Let's write our own version as a get function. The function gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place. The function signature is as such:

get(object, path, [defaultValue]);
object: The object to query.
path: The path of the property to get. It can be a string with . as the separator between fields, or an array of path strings.
defaultValue: Optional parameter. The value returned if the resolved value is undefined.
Examples
get(john, 'profile.name.firstName'); // 'John'
get(john, 'profile.gender'); // 'Male'
get(jane, 'profile.name.firstName'); // undefined
Arrays can also be accessed if numerical indices are provided.

get({ a: [{ b: { c: 3 } }] }, 'a.0.b.c'); // 3
There's no need to support syntax resembling get(object, 'a[0].b.c').
*/

/*
The tricky part of the question is to see that some form of iteration/recursion has to be done on the object to access nested fields.

Solution
The first step is to split up the path by the delimiter, which is a period. Then we have to recursively traverse the object given each token in the path, which can be done either with while/for loops or recursions. The looping should stop when a null-ish value is encountered.

Array index accessing doesn't require special handling and can be treated like accessing string-based fields on objects.

const arr = [10, 20, 30];
arr[1] === 20; // true
arr['1'] === 20; // true

JavaScript

TypeScript
/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 *
export default function get(objectParam, pathParam, defaultValue) {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split('.');

  let index = 0;
  let length = path.length;
  let object = objectParam;

  while (object != null && index < length) {
    object = object[String(path[index])];
    index++;
  }

  const value = index && index === length ? object : undefined;
  return value !== undefined ? value : defaultValue;
}
Edge Cases
Bad path inputs like get(obj, 'a.b..c') and get(obj, '') are unresolved and the defaultValue should be returned.
The solution only works for simple objects. It doesn't work with objects with
Symbols as keys.
Map and Set as values.
For these cases you can (and should) clarify the expected behavior with the interviewer.

Notes
null should be differentiated from undefined. Hence we should not use value != undefined (which is false when value = null) to check whether to return the defaultValue.
*/

/*
The tricky part of the question is to see that some form of iteration/recursion has to be done on the object to access nested fields.

Solution
The first step is to split up the path by the delimiter, which is a period. Then we have to recursively traverse the object given each token in the path, which can be done either with while/for loops or recursions. The looping should stop when a null-ish value is encountered.

Array index accessing doesn't require special handling and can be treated like accessing string-based fields on objects.

const arr = [10, 20, 30];
arr[1] === 20; // true
arr['1'] === 20; // true

JavaScript

TypeScript
/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 *
export default function get(objectParam, pathParam, defaultValue) {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split('.');

  let index = 0;
  let length = path.length;
  let object = objectParam;

  while (object != null && index < length) {
    object = object[String(path[index])];
    index++;
  }

  const value = index && index === length ? object : undefined;
  return value !== undefined ? value : defaultValue;
}
Edge Cases
Bad path inputs like get(obj, 'a.b..c') and get(obj, '') are unresolved and the defaultValue should be returned.
The solution only works for simple objects. It doesn't work with objects with
Symbols as keys.
Map and Set as values.
For these cases you can (and should) clarify the expected behavior with the interviewer.

Notes
null should be differentiated from undefined. Hence we should not use value != undefined (which is false when value = null) to check whether to return the defaultValue.
Resources
Lodash _.get
*/
