// #20
function detectType(data) {
  // if (data instanceof FileReader) return "object"; // needed to pass niche test case
  return Object.prototype.toString
    .call(data)
    .slice(1, -1)
    .split(" ")[1]
    .toLowerCase();
}
// console.log(detectType(""));
// console.log(detectType(1));
// console.log(detectType({}));
// console.log(detectType(() => {}));
// console.log(detectType(null));
// console.log(detectType(Symbol()));

// #23
function sum(num1) {
  const inner = function (num2) {
    return num1 ? sum(num1 + num2) : num1;
  };

  inner.valueOf = () => num1;

  return inner;
}
// const sum1 = sum(1);
// console.log(sum1(2) == 3); // true
// console.log(sum1(3) == 4); // true
// console.log(sum(1)(2)(3) == 6); // true
// console.log(sum(5)(-1)(2) == 6); // true

function reorder(arr, index, n) {
  var temp = [...Array(n)];

  // arr[i] should be present at index[i] index
  for (var i = 0; i < n; i++) temp[index[i]] = arr[i];

  // Copy temp[] to arr[]
  for (var i = 0; i < n; i++) {
    arr[i] = temp[i];
    index[i] = i;
  }
}

import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [url, setUrl] = useState("");

  function getUrl() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((res) => setUrl(res.message));
  }

  useEffect(() => {
    let timer = setInterval(() => getUrl(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <img alt="" src={url} />
    </div>
  );
}
