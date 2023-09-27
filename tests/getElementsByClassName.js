function getElementsByClassName(element, classNames) {
  throw "Not implemented";
}

module.exports = getElementsByClassName;

/*
getElementsByClassName() is a method which exists on HTML Documents and Elements to return an HTMLCollection of descendant elements within the Document/Element which has the specified class name(s).

Let's implement our own Element.getElementsByClassName() that is similar but slightly different:

It is a pure function which takes in an element and a classNames string, a string containing one or more class names to match on, separated by whitespace.
Like Element.getElementsByClassName(), only descendants of the specified element are searched, not the element itself.
Return an array of Elements, instead of an HTMLCollection of Elements.
Examples
const doc = new DOMParser().parseFromString(
  `<div class="foo bar baz">
    <span class="bar baz">Span</span>
    <p class="foo baz">Paragraph</p>
    <div class="foo bar"></div>
  </div>`,
  'text/html',
);

getElementsByClassName(doc.body, 'foo bar');
// [div.foo.bar.baz, div.foo.bar] <-- This is an array of elements.
Resources
Element.getElementsByClassName() - MDN
*/

/*
This question assesses you on the basic DOM traversal APIs, recursion, and knowledge of CSS - how elements are matched according to the element's class name. The approach to solve this question is similar to getElementsByTagName.

Solution
The solution is pretty straightforward if you are familiar with the HTML DOM APIs. In particular, we need to know the following:

Element.classList which returns a live DOMTokenList of class attributes of the element. This is preferred over className because className is a string and needs to be manually parsed.
Element.children which returns a live HTMLCollection of the child elements. We use this over Node.childNodes which returns a live NodeList of child Nodes because childNodes will include non-element nodes like text and comment nodes, which are not relevant in this question.
However HTMLCollection does not have .forEach, so we have to iterate through it using traditional for loops.
For the class name to match, they have to be a subset of the classList of an element. The matching is also case-sensitive and duplicate class names (in both the input and on the elements) do not matter.

We can maintain an elements array to collect the matching elements while recursively traversing the root element. A depth-first traversal is performed.

Remember that the element argument itself is not included in the results.


JavaScript

TypeScript
function isSubset(a, b) {
  return Array.from(a).every((value) => b.contains(value));
}

/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 *
export default function getElementsByClassName(element, classNames) {
    const elements = [];
    const classNamesSet = new Set(classNames.trim().split(/\s+/));
  
    function traverse(el) {
      if (el == null) {
        return;
      }
  
      if (isSubset(classNamesSet, el.classList)) {
        elements.push(el);
      }
  
      for (const child of el.children) {
        traverse(child);
      }
    }
  
    for (const child of element.children) {
      traverse(child);
    }
  
    return elements;
  }
  Edge Cases
  Element argument is not included in the results even if it matches the tag name.
  Duplicate class names in both the input and on the element's class are ignored.
  Whitespace in input and on the element's class are handled properly.
  Techniques
  Recursion
  DOM APIs
  How to get an Element's class
  How to traverse an Element's children
  CSS: class matching algorithm
  Resources
  Element.getElementsByClassName() - MDN
*/
