function $(selector) {
  //   throw "Not implemented";
  const element = document.querySelector(selector);

  return {
    /**
     * @param {string} className
     * @param {boolean} [state]
     * @return {Object|void}
     */
    toggleClass: function (className, state) {
      if (state !== undefined) {
        if (state) this.addClass(className);
        else this.removeClass(className);
        return;
      }
      let classes = element.className.split(" ");
      let newClasses = className.split(" ").filter(Boolean);
      for (let c of newClasses) {
        if (classes.includes(c)) classes.splice(classes.indexOf(c), 1);
        else classes.push(c);
      }
      element.className = classes.join(" ");
      return this;
    },
    /**
     * @param {string} className
     * @return {Object}
     */
    addClass: function (className) {
      let classes = Array.from(element.classList);
      let newClasses = className.split(" ").filter(Boolean);
      for (let c of newClasses) {
        if (!classes.includes(c)) classes.push(c);
      }

      element.className = classes.join(" ");
      return this;
    },
    /**
     * @param {string} className
     * @return {Object}
     */
    removeClass: function (className) {
      let classes = Array.from(element.classList);
      let classesToRemove = className.split(" ").filter(Boolean);
      for (let c of classesToRemove) {
        if (classes.includes(c)) classes.splice(classes.indexOf(c), 1);
      }

      element.className = classes.join(" ");
      return this;
    },
  };
}

module.exports = $;

/*
Note: If you haven't completed the jQuery.css question, you should attempt that first.

Before Element.classList and DOMTokenList were part of the browser standards, it was a hassle to manipulate classes on a DOM element.

jQuery is a library that simplifies DOM manipulation (among other things). jQuery (using the $ alias function), provided convenient APIs to toggle, add, and remove classes from elements via .toggleClass(), .addClass() and .removeClass().

// <button class="foo bar">Click me</button>
$('button').toggleClass('bar'); // <button class="foo">Click me</button>
$('button').addClass('baz'); // <button class="foo baz">Click me</button>
$('button').removeClass('foo'); // <button class="baz">Click me</button>
$('button').toggleClass('bar'); // <button class="baz bar">Click me</button>
The return value of most jQuery manipulation APIs is the jQuery object itself so that method calls can be chained. The above can be further simplified again:

// <button class="foo bar">Click me</button>
$('button')
  .toggleClass('bar')
  .addClass('baz')
  .removeClass('foo')
  .toggleClass('bar');
// <button class="baz bar">Click me</button>
Implement the toggleClass(), addClass() and removeClass() methods according to the following specifications. Do not use Element.classList and methods to manipulate DOMTokenList otherwise the problem becomes quite trivial.

Note: The official jQuery library selects all matched elements and modified all matched elements. However, for this question we can assume there will only be a maximum of one element matching the selector.

toggleClass(className, state)
Add or remove one or more classes from the matched element, depending on either the class's presence or the value of the state argument.

Parameter	Type	Description
className	string	One or more classes (separated by spaces) to be toggled for the matched element.
state	boolean	An optional boolean value to determine whether the class(es) should be added or removed.
addClass(className)
Parameter	Type	Description
className	string	One or more classes (separated by spaces) to be added to the matched element.
removeClass(className)
Parameter	Type	Description
className	string	One or more classes (separated by spaces) to be removed from the matched element.
*/

/*
Note: If you haven't completed the jQuery.css question, you should attempt that first.

Clarification Questions
What should happen if there are no elements match the selector?
In jQuery when there are no matched elements, nothing occurs, so we can follow that.
Can there be duplicate classes in the parameters and on the element?
Yes there can be.
Solution
Method chaining is not the focus of the question given you just have to return this at the end of every method in the skeleton which already contains the structure of an object-based approach. Hence it's important to have completed the jQuery.css question first.

The bulk of the complexity is in the toggleClass method. We first need to parse the className parameter and the element's className properties into a set of class strings. Then that's followed by manipulation of the element's class set according to the className input. We iterate through the classes in the className input and depending on whether state is explicitly defined and whether the element's classes contain the input class, add/delete the class from the set.

Lastly, we modify the element's className by concatenating the classes back into a single string.

addClass and removeClass can be implemented trivially by using toggleClass with state set as true and false respectively.


JavaScript

TypeScript
/**
 * @param {string} className
 * @return {Set<string>}
 *
function classNameTokenSet(className) {
  return new Set(className.trim().split(/\s+/));
}

/**
 * @param {string} selector
 * @return {{toggleClass: Function, addClass: Function, removeClass: Function}}
 *
export default function $(selector) {
  const element = document.querySelector(selector);

  return {
    /**
     * @param {string} className
     * @param {boolean} state
     * @return {Object|void}
     *
    toggleClass: function (className, state) {
      // No-op if there is no matching element.
      if (element == null) {
        return this;
      }

      const classes = classNameTokenSet(className);
      const elementClasses = classNameTokenSet(element.className);

      classes.forEach((cls) => {
        const shouldRemove =
          state === undefined ? elementClasses.has(cls) : !state;
        shouldRemove
          ? elementClasses.delete(cls) // Remove if state is not defined and element contains the class or state is false.
          : elementClasses.add(cls);
      });

      element.className = Array.from(elementClasses).join(' ');
      return this;
    },
    /**
     * @param {string} className
     * @return {Object}
     *
    addClass: function (className) {
      this.toggleClass(className, true);
      return this;
    },
    /**
     * @param {string} className
     * @return {Object}
     *
    removeClass: function (className) {
      this.toggleClass(className, false);
      return this;
    },
  };
}
Alternative Solution
An alternative class-based approach can be found below which is a bit longer and overkill.

function classNameTokenSet(className) {
  return new Set(className.trim().split(/\s+/));
}

class jQuery {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  toggleClass(className, state) {
    // No-op if there is no matching element.
    if (this.element == null) {
      return undefined;
    }

    const classes = classNameTokenSet(className);
    const elementClasses = classNameTokenSet(this.element.className);

    classes.forEach((cls) => {
      const shouldRemove =
        state === undefined ? elementClasses.has(cls) : !state;
      shouldRemove
        ? elementClasses.delete(cls) // Remove if state is not defined and element contains the class or state is false.
        : elementClasses.add(cls);
    });

    this.element.className = Array.from(elementClasses).join(' ');
    return this;
  }
  addClass(className) {
    this.toggleClass(className, true);
    return this;
  }
  removeClass(className) {
    this.toggleClass(className, false);
    return this;
  }
}

export default function $(element) {
  return new jQuery(element);
}
Edge Cases
No elements match the selector. We should handle gracefully instead of erroring.
The className string can contain duplicate classes.
The className string can contain leading/trailing whitespace and also more than one space character between classes.
The element's className can contain uppercase classes which shouldn't be matched in Standards Mode for browsers.
Techniques
CSS fundamentals.
Notes
Arrow functions has a lexical scoping to the this context, and should not be used as methods on objects as the this will not be referring to the object. Thus the methods cannot be defined as an arrow function if the return value is an object.
Resources
.toggleClass() | jQuery API Documentation
.addClass() | jQuery API Documentation
.removeClass() | jQuery API Documentation
*/
