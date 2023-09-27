/* 26,27,53,60,61,63,90,94,116,148,154
// Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
-[[Prototype]] is a hidden private property that all objects have in Javascript, it holds a reference to the object’s prototype
 An object’s prototype is the object that an object inherits or descends from
-The __proto__ accessor property of Object instances exposes the [[Prototype]] (either an object or null) of this object.
The __proto__ property can also be used in an object literal definition to set the object [[Prototype]] on creation, as an alternative to Object.create()
__proto__ is deprecated and the modern way of accessing an object’s prototype is by using Object.getPrototypeOf(obj). You can also modify an object’s 
prototype using Object.setPrototypeOf(obj, prototype)
-Object.prototype properties (dunder properties are deprecated):
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
constructor
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
valueOf

-.prototype is a special property that almost all functions have that is only used when a function is invoked as a constructor function. I say almost all because arrow functions and methods defined using the concise syntax do not have .prototype properties and cannot be used as constructors.

The .prototype property contains a reference to an object and when a constructor is used to instantiate or create a new object, .prototype is set as the prototype of the new object.
*/
// 26. implement Object.assign()
// *can't do let prop of Object.keys(source)
// Fails test case: expect(objectAssign({}, {a: 3}, null, undefined, NaN, 1, true, 1n)).toEqual({a: 3})
// Error message: non-string primitives in source are ignored  TypeError: Cannot convert undefined or null to object
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) throw "err";

  // there are a couple test cases where numbers/string/booleans/etc in target are wrapped
  // and this seems to cover them for some reason
  target = Object(target);

  for (let source of sources) {
    for (let prop in source) {
      // *
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];

        // this is to cover situations when target[prop]? is a read-only property
        if (target[prop] !== source[prop]) throw new Error();
      }

      for (const symbol of Object.getOwnPropertySymbols(source)) {
        target[symbol] = source[symbol];
      }
    }
  }
  return target;
}

// this also works for #27
function objectAssign(target, ...sources) {
  if (target === undefined || target === null) {
    throw "err";
  }

  target = Object(target);

  sources.forEach((source) => {
    if (source === undefined || source === null) {
      return;
    }

    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

    // Object.getOwnPropertyDescriptors handles Symbols so need for the following:
    // for (const symbol of Object.getOwnPropertySymbols(source)) {
    //   target[symbol] = source[symbol]
    // }
  });

  return target;
}

// #27. implement completeAssign()
// Exactly the same answer as #26 if we use Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
function completeAssign(target, ...sources) {
  if (target == null) throw Error("target cannot be null or undefined");

  target = Object(target);

  for (let source of sources) {
    if (source == null) continue;

    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

    // not needed as it's covered by above
    // for(const symb of Object.getOwnPropertySymbols(source)){
    //   target[symb] = source[symb];
    // }
  }
  return target;
}

// #53. write your own `extends` in es5
/*
const InheritedSubType = myExtends(SuperType, SubType)
const instance = new InheritedSubType()

// above should work (almost) the same as follows
class SubType extends SuperType {}
const instance = new SubType()


SuperType ->            prototype
                            ^
                            |
                            |
SubType -> prototype -> __proto__
             ^
             |
             |
this -> __proto__
*/
const myExtends = (SuperType, SubType) => {
  function Child(...args) {
    SuperType.apply(this, args);
    SubType.apply(this, args);

    // Important to make ALL instances directly from SubType
    // instanceChild.__proto__ === Student.prototype
    // Object.setPrototypeOf(this, SubType.prototype); does the same as line below
    this.__proto__ = SubType.prototype;
  }

  // instanceChild.__proto__.__proto__ === Person.prototype
  // Object.setPrototypeOf(SubType.prototype, SuperType.prototype); does the same as line below
  SubType.prototype.__proto__ = SuperType.prototype;

  // This is ONLY on static method Child, NO effects on instances
  // NOT needed on creating instances
  // Child.prototype = Object.create(SubType.prototype);

  // For test case: ExtendedType.prototype should be SuperType
  // NOT needed on creating instances
  Child.__proto__ = SuperType;

  return Child;
};

// #60. create your own `new` operator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
const myNew = function (constructor, ...args) {
  /* 1. A new object is created, inheriting from constructor's prototype.
     using #94: obj = {}; obj.__proto__ = constructor.prototype; return obj => that = obj
     FROM MDN:
     1. Creates a blank, plain JavaScript object. For convenience, let's call it newInstance(that).
     2. Points newInstance's [[Prototype]] to the constructor function's prototype property, if the 
        prototype is an Object. Otherwise, newInstance stays as a plain object with Object.prototype 
        as its [[Prototype]]. 
     */
  let that = Object.create(constructor.prototype);

  /* 2. The constructor function is called with the specified arguments,
        and with this bound to the newly created object.
     FROM MDN:
     3. Executes the constructor function with the given arguments, binding newInstance(that) as the this context 
        (i.e. all references to this in the constructor function now refer to newInstance(that)).
  */
  let obj = constructor.apply(that, args);

  /* 3. The object (not null, false, 3.1415 or other primitive types) returned by the constructor function becomes the result of the whole new expression.
  //    If the constructor function doesn't explicitly return an object,
  //    the object created in step 1 is used instead (normally constructors don't return a value, but they can choose to do so if they want to override the normal object creation process).
     FROM MDN:
     4. If the constructor function returns a non-primitive, this return value becomes the result of the 
        whole new expression. Otherwise, if the constructor function doesn't return anything or returns a 
        primitive, newInstance(that) is returned instead. (Normally constructors don't return a value, but
        they can choose to do so to override the normal object creation process.)
  */
  if (obj && typeof obj === "object") return obj;
  return that;
};

// #61. create your own `Function.prototype.call`
Function.prototype.mycall = function (thisArg, ...args) {
  thisArg = thisArg || window; // thisArg can be empty
  thisArg = Object(thisArg); // transform primitive value
  let func = Symbol(); // create a unique property
  thisArg[func] = this; // assign the function to a unique method created on the context
  let res = thisArg[func](...args); // call the method with passed args
  delete thisArg[func]; // delete this unique method so as to not cause any sideeffects
  return res;
};

// #63. create `_.cloneDeep()`
function cloneDeep(data, map = new Map()) {
  if (!data || typeof data !== "object") return data;

  // map is to deal with circular references
  if (map.has(data)) return map.get(data);

  if (Array.isArray(data)) {
    let arr = [];
    map.set(data, arr);
    for (let i = 0; i < data.length; ++i) {
      arr[i] = cloneDeep(data[i], map);
    }
    return arr;
  } else if (typeof data === "object") {
    let obj = {};
    map.set(data, obj);
    for (let [key, value] of Object.entries(data)) {
      obj[key] = cloneDeep(value, map);
    }
    for (let key of Object.getOwnPropertySymbols(data)) {
      obj[key] = cloneDeep(data[key], map);
    }

    return obj;
  }

  return data;
}

// #90. write your own `instanceof`
function myInstanceOf(obj, target) {
  if (obj == null || typeof obj !== "object") return false;
  while (obj) {
    if (obj.__proto__ === target.prototype) return true;
    obj = obj.__proto__;
  }
  return false;
}

// #94. implement your own `Object.create`
// The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.
// https://stackoverflow.com/questions/18198178/null-prototype-object-prototype-and-object-create
function myObjectCreate(proto) {
  // you must confirm that proto is an object and not null or undefined
  if (!proto || typeof proto !== "object") throw new Error();
  let obj = {};
  obj.__proto__ = proto;
  return obj;

  // this also works: return Object.create(proto)
}

// #116. implement Object.is()
/*
Object.is(0, -0) // false
0 === -0 // true

Object.is(NaN, NaN) // true
NaN === NaN // false
*/
function is(a, b) {
  if (a !== a) {
    // Only NaN is not equal to itself
    return b !== b; // returns true if the second parameter is NaN too
  }

  if (a === 0 && b === 0) {
    // -0 === 0 is true, so when both parameters equals to 0
    return 1 / a === 1 / b; // 1 / -0 is -Infinity and -Infinity === -Infinity
  }

  return a === b; // All other cases with regular === comparison
}

// #148. create a counter object
function createCounter() {
  return {
    i: 0,
    get count() {
      return this.i++; // used i because if I used 'count' it would create an infinite loop
    },
  };
}

// #154. Two-way binding
// function model(state: {value: string}, element: HTMLInputElement) {
function model(state, element) {
  element.value = state.value;
  Object.defineProperty(state, "value", {
    get: () => element.value,
    set: (value) => (element.value = value),
  });
}
