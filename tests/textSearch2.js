function textSearch(string, queries) {
  throw "Not implemented!";
}

module.exports = textSearch;

/*
In browsers, we are able to find specific words or phrases within a webpage by using Ctrl + F (Windows, Linux) or ⌘ + F (Mac) and entering the search term. Matches which appear will be highlighted in yellow.

Let's implement a simple version of a browser's in-webpage search with the difference being we're given a string (as opposed to HTML) and search matches appear bolded.

Given a string and an array of queries, implement a function textSearch that finds all case-insensitive matches from the queries array within the string, wrapping the matches in <b>...</b> tags.

Examples
textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', ['fox']);
// 'The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog'
textSearch('The quick brown fox jumps over the lazy dog', ['fox', 'dog']);
// 'The quick brown <b>fox</b> jumps over the lazy <b>dog</b>'
If two such queries overlap or are consecutive, they should be wrapped in a single pair of <b> tags.

textSearch('This is Uncopyrightable!', ['copy', 'right']);
// 'This is Un<b>copyright</b>able!'
textSearch('This is Uncopyrightable!', ['copy', 'right', 'table']);
// 'This is Un<b>copyrightable</b>!'
A character will not match the same query more than once, with earlier letters taking priority.

textSearch('aaa', ['aa']);
// '<b>aa</b>a'
// This is because the second character cannot be used as a match again.
textSearch('aaaa', ['aa']);
// '<b>aaaa</b>'
You can assume there are no duplicate strings in the queries array.
*/

/*
This question evaluates one's ability to manipulate arrays and strings in JavaScript, which is certainly an essential skill for Front End development.

Clarification Questions
Your interviewer might not necessarily spell out all the requirements for you upfront. Ideally you start by thinking about all the possible situations and edge cases.

What if the queries array is an empty array? Or the input string string is an empty string?
Return the string as-is.
What if any query inside the queries array is an empty string?
Skip that query.
Solution
One might think of leveraging regular expressions (regex), via RegExp. Regex is very hard to use here but because the characters within the string can match multiple queries. There are ways to get around that but it's non-trivial.

One idea is to process one query at a time, adding the <b> tag for the current query, but this will ruin the string for subsequent queries. Imagine this scenario:

textSearch('aaabc', ['aaa', 'abc']);
After processing 'aaa', the string is now <b>aaa</b>bc, which won't match 'abc'. Hence this approach is not feasible too.

Working backwards
Let's try to think backwards from the desired output: we want to output a string with the substrings that exist in the queries array wrapped in <b> tags. Therefore we need to know where exactly to insert the opening <b> tags and closing </b> tags. We can create a boolean array of same length as the string with every value defaulting to false. The value of boldChars[index] indicates whether the character at that index in the original string needs to be bold.

// #1: Basic case.
// string: "aaabcaa", queries: ['abc']
// boldChars: [false, false, true, true, true, false, false]
// result: "aa<b>abc</b>aa"

// #2: Non-overlapping case.
// string: "aaabcaabc", queries: ['abc']
// boldChars: [false, false, true, true, true, false, true, true, true]
// result: "aa<b>abc</b>a<b>abc</b>"

// #3: Overlapping case.
// string: "baabcaa", queries: ['abc', 'aa']
// boldChars: [false, true, true, true, true, true true]
// result: "a<b>aabcaa</b>"
The beginning of a span of consecutive chunks of true is where we insert the opening tag <b> and the end is where we add a closing </b>.

To identify which characters need to be bold, we do a naive substring match at each character in string for each query. Flipping the boolean value at each matching character's index to true. However, because of the "one character can only match the same query once" condition, we have to increment i to go past the current query when there's a match.

/**
 * @param {string} string
 * @param {Array<string>} queries
 * @return {string}
 *
export default function textSearch(string, queries) {
    if (string.trim() === '') {
      return string;
    }
  
    const boldChars = Array.from({ length: string.length }, () => 0);
  
    for (const query of queries) {
      if (query.trim() === '') continue;
      for (let i = 0; i < string.length; ) {
        const substr = string.slice(i, i + query.length);
        if (substr.toLowerCase() === query.toLowerCase()) {
          boldChars.fill(1, i, i + query.length);
          // Start from next character if there's a match since one
          // character cannot match the same query more than once.
          i = i + query.length;
        } else {
          i++;
        }
      }
    }
  
    let highlightedString = '';
    for (let i = 0; i < string.length; i++) {
      // When the current character should be bolded
      // and the previous character should not be bolded,
      // append an opening tag to the final string.
      const shouldAddOpeningTag = boldChars[i] === 1 && boldChars[i - 1] !== 1;
      // When the current character should be bolded
      // and the next character should not be bolded,
      // append a closing tag to the final string.
      const shouldAddClosingTag = boldChars[i] === 1 && boldChars[i + 1] !== 1;
      let char = string[i];
  
      if (shouldAddOpeningTag) {
        char = '<b>' + char;
      }
  
      if (shouldAddClosingTag) {
        char = char + '</b>';
      }
      highlightedString += char;
    }
  
    return highlightedString;
  }
  Notes
  We use Array.prototype.fill() to mutate the boolean array conveniently when we find a substring match. The method fill is one of the few methods that mutate arrays. As of writing, there are 9 methods in total that mutates arrays: pop, push, reverse, shift, sort, splice, unshift, copyWithin and fill. Check out Does it mutate where there is a nice list of mutating array methods with more details.
  */
