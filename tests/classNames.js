function classNames(...args) {
  throw "Not implemented";
}

module.exports = classNames;

/*
classnames is a commonly-used utility in modern front end applications to conditionally join CSS class names together. If you've written React applications, you likely have used a similar library.

Implement the classnames function.

Examples
classNames('foo', 'bar'); // 'foo bar'
classNames('foo', { bar: true }); // 'foo bar'
classNames({ 'foo-bar': true }); // 'foo-bar'
classNames({ 'foo-bar': false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames({ foo: true, bar: true }); // 'foo bar'
classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
Arrays will be recursively flattened as per the rules above.

classNames('a', ['b', { c: true, d: false }]); // 'a b c'
Values can be mixed.

classNames(
  'foo',
  {
    bar: true,
    duck: false,
  },
  'baz',
  { quux: true },
); // 'foo bar baz quux'
Falsey values are ignored.

classNames(null, false, 'bar', undefined, { baz: null }, ''); // 'bar 1'
*/

/*
Solution
The tricky part of this solution is in the recursive nature of the function. Hence we can separate out the solution into two parts:

Handling of each data type
Recursing for array type
We will need a data structure, classes to collect all the classes for the lifetime of the function that the recursive calls have access to. This can either be defined as a variable in the top level of the function, or the variable can be passed as an argument into the recursive calls. In our solution we use an Array, but you could use a Set.

Here's how we will handle each data type:

Falsey values: Ignore
String: Add it to the classes collection
Number: Add it to the classes collection
Array: Invoke the classNames function recursively
Object: Loop through the key/value pairs and add the keys with truthy values into the classes collection

JavaScript

TypeScript
/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 *
export default function classNames(...args) {
  const classes = [];

  args.forEach((arg) => {
    // Ignore falsey values.
    if (!arg) {
      return;
    }

    const argType = typeof arg;

    // Handle string and numbers.
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
      return;
    }

    // Handle arrays.
    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
      return;
    }

    // Handle objects.
    if (argType === 'object') {
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }

      return;
    }
  });

  return classes.join(' ');
}
Follow Up: De-duplicating classes
The provided solution doesn't handle de-duplicating classes, which would be a nice optimization and in some cases affect the output, for example, if { foo: true } and { foo: false } are present at the same time and false appears later in the arguments.

This can be handled by using Set to collect the classes from the start, or de-duplicating the final array of classes by turning into a Set. De-duplicating classes is usually out of the scope of interviews but is a possible follow-up question.

Techniques
Familiar with JavaScript value types and how to check for them
Recursion
Converting from Arrays to Sets and vice versa (for the unique classes follow-up)
Handling of variadic arguments
Notes
typeof [] gives 'object', so you need to handle arrays before objects.
You likely don't have to handle these scenario, but you should mention them:
Possibility of stack overflow. This applies to any recursive solution.
Possibility of circular references for arrays and objects. This applies to any input which has arbitrary depth.
Library implementation
For reference, this is how the classnames library is implemented.

var hasOwn = {}.hasOwnProperty;

export default function classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(' ');
}
Resources
classnames library on GitHub
clsx library on GitHub - A newer version which serves as a faster and smaller drop-in replacement for classnames.
*/
