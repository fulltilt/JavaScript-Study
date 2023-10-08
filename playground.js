/*
Symbol 17
25,32-35,36,38,41?(but in-place, also 81),52,54,55?(LC 616),61,63,64,101,112?(Leetcode 316),119,
122,124 (a lot more complicated than I though),125,130,146,153,155
NonJS: 82

prototypes & objects: 26,27,53,60,61,90,94,116,154
wrappers: 15,52,54,56,64,83,92
async: 29-35,123
timers: 28, 36, 83, 84
object traversal: 12,21,63,69,85,125,156,164
virtual: 113,118,140,150
iterators & generators: 39, 56, 119
regex: 55,78,85,95,98,99,119,149,156,165
good to know: 8 (fisher-yates), 41 (merge sort), 43 (quick sort), 110
getters and setters: 161
binary search: 10, 37, 48-51
 -it seems to always be: while (lo <= hi)
practice: 16 (emitter for closure and this practice), 24 (priority queue), 41 (merge sort), 43 (quicksort), 130 (lazy man), 152 (top K)
didn't understand: 59
skipped: 5 (throttle with options), 67 (create your own Promise), 57 & 70-74 (Observables), 80 (URLSearchParams),
         88 (proxy for negative array index),
         124 (calc arithmetic expression), 132 (angle between hour and minute hand), 134 (create cookie),
         141 (btoa), 142 (tagged templates), 144 (serialize unsupported types), 160 (atob), 164 (immer produce)
revisit: 7,17,22,25 (reorder with new indexes), 61 (Function.protoype.call), 66 (remove duplicates in place), 
         78 (hex to rgba), 79 (snake to camel), 153
self usage: 36
-#16 I have two different implementations of release(). The one I used function()… I had to use let self = this while another I used an arrow fxn and didn’t have to do that since arrow fxns don’t have a this
 -when you have an inner function, you have to consider whether you need to do a self = this
-JavaScript arrays and strings have a slice fxn which accepts negative args: [1,2,3].slice(1,-1) = [2]. ’123’.slice(-1) = 3
-JavaScript Map is more time and space efficient than {}
-for problems that mention placeholder: const _ = partial.placeholder
 reference the placeholder inside the function as 'partial.placeholder'
-be cognizant of when spreading arguments. Sometimes it needs to be an array, other times it has to be spread
-compareFn
A function that defines the sort order. The return value should be a number whose sign indicates the relative order of the two elements: negative if a is less than b, positive if a is greater than b, and zero if they are equal. NaN is treated as 0
-#139 one reason we should do fn.apply/call
const func = function(...args){
  return [this.prop, ...args]
}
const _ = partial.placeholder
const func12_4 = partial(func, 1,2,_,4)
const a = {
  prop: 1,
  func12_4
}
const b = {
  prop: 2,
  func12_4
}
expect(a.func12_4(3,5)).toEqual([1,1,2,3,4,5])
expect(a.func12_4(3,5)).toEqual([1,1,2,3,4,5])
expect(b.func12_4(3,5)).toEqual([2,1,2,3,4,5])
*/

function partition(arr, start, end) {
  let pivot = arr[start][1]; // pivot will be the start index
  let lo = start + 1; // low will always be pivot + 1
  let hi = end;
  while (lo <= hi) {
    while (lo < arr.length && arr[lo][1] < pivot) ++lo;
    while (hi >= 0 && arr[hi][1] > pivot) --hi;

    // swap hi and lo and continue iterating until hi < lo
    if (lo <= hi) {
      [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
      ++lo;
      --hi;
    }
  }
  // move the pivot value into the correct position. If you write out an example, you'll see that you want to swap start with hi
  [arr[start], arr[hi]] = [arr[hi], arr[start]];
  return hi; // hi index contains pivot value so return it
}

function shuffle(arr) {
  for (let i = arr.length - 1; i >= 0; --i) {
    // index can be anything from 0 up to i. Going backwards makes getting the random int easier
    // if we are starting from 0, index = i + Math.floor(Math.random() * (arr.length - i)) (i, arr.length - 1)
    let index = Math.floor(Math.random() * (i + 1)); // i + 1 so it will be inclusive to i (i.e. the current index) can swap with itself)
    [arr[i], arr[index]] = [arr[index], arr[i]];
    console.table([i, index, arr]);
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

// console.log(removeNthFromEnd(root, 2));
function getIndex(letter) {
  return letter.charCodeAt(0) - "a".charCodeAt(0);
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// let root1 = new TreeNode(3);
// let t1 = new TreeNode(9);
// let t2 = new TreeNode(20);
// let t3 = new TreeNode(15);
// let t4 = new TreeNode(7);
// let t5 = new TreeNode(7);

// root1.left = t1;
// root1.right = t2;
// t2.left = t3;
// t2.right = t4;
// t4.right = t5;

// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101
// 6 --> 110
// 7 --> 111
// 8 --> 1000
// 0,1,1,2,1,2,2,3,1

function reverseBits(n) {
  let res = 0;
  for (let i = 0; i < 32; ++i) {
    let bit = (n >> i) & 1;
    res |= bit << (31 - i);
  }
  return res;
}

// 1001011101 = 605
//  100101110 = 302

// 1101110011 =
//              907
// 1+2+16+32+64+256+512
// carry = 0
// a ^ b = 1101110011
// b = 0

var getSum = function (a, b) {
  while (b) {
    let carry = a & b;
    a ^= b;
    b = carry << 1;
  }
  return a;
};
// console.log(getSum(605, 302));

class PQ {
  heap = [];
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare) {
    this.compare = compare;
  }

  leftChild = (index) => index * 2 + 1;
  rightChild = (index) => index * 2 + 2;
  parent = (index) => Math.floor((index - 1) / 2);

  /**
   * return {number} amount of items
   */
  size() {
    return this.heap.length;
  }

  /**
   * returns the head element
   */
  peek() {
    if (this.size() === 0) throw new Error("PQ is empty");
    return this.heap[0];
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    this.heap.push(element);

    let index = this.heap.length - 1;
    // while (index !== 0 && this.heap[index] > this.heap[this.parent(index)]) {
    while (
      index !== 0 &&
      this.compare(this.heap[index], this.heap[this.parent(index)]) > 0
    ) {
      [this.heap[index], this.heap[this.parent(index)]] = [
        this.heap[this.parent(index)],
        this.heap[index],
      ];
      index = this.parent(index);
    }
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    const root = this.heap.shift();

    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();

    this.heapify(0);

    return root;
  }

  heapify(index) {
    let left = this.leftChild(index);
    let right = this.rightChild(index);
    let smallest = index;

    // if the left child is bigger than the node we are looking at
    // if (left < this.heap.length && this.heap[smallest] < this.heap[left]) {
    if (
      left < this.heap.length &&
      this.compare(this.heap[smallest], this.heap[left]) < 0
    ) {
      smallest = left;
    }

    // if the right child is bigger than the node we are looking at
    // if (right < this.heap.length && this.heap[smallest] < this.heap[right]) {
    if (
      right < this.heap.length &&
      this.compare(this.heap[smallest], this.heap[right]) < 0
    ) {
      smallest = right;
    }

    // if the value of smallest has changed, then some swapping needs to be done
    // and this method needs to be called again with the swapped element
    if (smallest != index) {
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];

      this.heapify(smallest);
    }
  }

  print() {
    return this.heap;
  }
}

var threeSum = function (nums) {
  function twoSum(i, target) {
    let lo = i;
    let hi = nums.length - 1;

    while (lo < hi) {
      let sum = target + nums[lo] + nums[hi];
      if (sum === 0) {
        res.push([target].concat([nums[lo], nums[hi]]));
        ++lo;
      } else if (sum > 0) --hi;
      else ++lo;
    }
    return false;
  }

  let res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; ++i) {
    if (i !== 0 && nums[i] === nums[i - 1]) continue;
    twoSum(i + 1, nums[i]);
  }
  return res;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// console.log(threeSum([0, 1, 1]));
// console.log(threeSum([0, 0, 0]));

// Wigglytuff Jungle 1st
// Pidgeot Jungle 1st
// Vileplume Jungle 1st
// Smeargle Neo Discovery 1st (if holo)
// Sableeye Sandstorm 10 holo
// Gardevoir Ruby Sapphire 7 (if holo)
// Banette Hidden Legends 1
// Wartortle Crystal Guardians 43 reverse holo
// Snorlax Firered Leafgreen 15
// Gengar Legend Maker 5
// Dark Tyranitar Team Rocket Returns 20 reverse holo
// Ninetales Dragon Frontiers 8 reverse holo
// Rayquaza Delta Species 13

// Flareon Unseen Forces 5 reverse holo
// Flareon Delta Species 5 holo
// Espeon Delta Species

function deduplicate(arr) {
  // arr.sort((a, b) => a - b);
  // let i = 0;
  // let j = 1;
  // for (; j < arr.length; ++j) {
  //   let dupe = false;
  //   while (arr[i] === arr[j] && j < arr.length) {
  //     ++j;
  //     dupe = true;
  //   }
  //   if (j !== arr.length && dupe) {
  //     [arr[i + 1], arr[j]] = [arr[j], arr[i + 1]];
  //     i = j - 1;
  //   } else ++i;
  // }
  // return arr.slice(0, i - 1);
}

// console.log(deduplicate([0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4]));

function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

let rootx = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let n5 = new Node(5);
let n6 = new Node(6);
let n7 = new Node(7);
let n8 = new Node(8);
let n9 = new Node(9);
rootx.left = n2;
rootx.right = n3;
n2.left = n4;
n4.left = n6;
n4.right = n7;
n7.right = n9;
n3.right = n5;
n5.left = n8;

// console.log(deserialize(serialize(rootx)).right);

var findCheapestPricex = function (n, flights, src, dst, k) {
  let totalCost = -1;
  let adj = {};
  for (let i = 0; i < flights.length; ++i) {
    let [from, to, weight] = flights[i];
    if (adj[from] === undefined) adj[from] = [];
    adj[from].push([to, weight]);
  }

  let visited = {};
  function bfs(node, k, costSoFar, frontier) {
    let [n, cost] = node;

    if (k === -1 && n !== dst) return;

    visited[n] = true;
    costSoFar += cost;
    if (n === dst) {
      totalCost = totalCost === -1 ? costSoFar : Math.min(totalCost, costSoFar);
      return;
    }

    let neighbors = adj[n];
    if (neighbors !== undefined) {
      for (let neigh of neighbors) {
        if (!visited[neigh[0]]) frontier.push(neigh);
      }
    }

    while (frontier.length) {
      let neigh = frontier.shift();
      bfs(neigh, k - 1, costSoFar, frontier);
    }
  }
  bfs([src, 0], k, 0, []);
  return totalCost;
};

// console.log(
//   findCheapestPrice(
//     4,
//     [
//       [0, 1, 100],
//       [1, 2, 100],
//       [2, 0, 100],
//       [1, 3, 600],
//       [2, 3, 200],
//     ],
//     0,
//     3,
//     1
//   )
// );
// console.log(
//   findCheapestPrice(
//     3,
//     [
//       [0, 1, 100],
//       [1, 2, 100],
//       [0, 2, 500],
//     ],
//     0,
//     2,
//     1
//   )
// );
// console.log(
//   findCheapestPrice(
//     5,
//     [
//       [4, 1, 1],
//       [1, 2, 3],
//       [0, 3, 2],
//       [0, 4, 10],
//       [3, 1, 1],
//       [1, 4, 3],
//     ],
//     2,
//     1,
//     1
//   )
// );

var findCheapestPrice = function (n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; ++i) {
    let tmpPrices = prices.slice();
    for (let [s, d, p] of flights) {
      if (prices[s] === Infinity) continue;
      if (prices[s] + p < tmpPrices[d]) tmpPrices[d] = prices[s] + p;
    }
    prices = tmpPrices;
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
};

var minInterval = function (intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  let sortedQueries = [...queries].sort((a, b) => a - b);

  let minHeap = new PQ((a, b) => b[0] - a[0] || b[1] - a[1]);
  let res = {};
  let i = 0;

  for (let q of sortedQueries) {
    while (i < intervals.length && intervals[i][0] <= q) {
      let [l, r] = intervals[i];
      minHeap.add([r - l + 1, r]);
      ++i;
    }

    while (minHeap.size() && minHeap.peek()[1] < q) {
      minHeap.poll();
    }
    console.log(minHeap.peek());
    res[q] = minHeap.size() ? minHeap.peek()[0] : -1;
  }

  let res2 = [];
  for (let i = 0; i < queries.length; ++i) {
    res2[i] = res[queries[i]];
  }
  return res2;
};

// console.log(
//   minInterval(
//     [
//       [1, 4],
//       [2, 4],
//       [3, 6],
//       [4, 4],
//     ],
//     [2, 3, 4, 5]
//   )
// );

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  let res = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    let v1 = i < left.length ? left[i] : Infinity;
    let v2 = j < right.length ? right[j] : Infinity;

    if (v1 <= v2) {
      res.push(v1);
      ++i;
    } else {
      res.push(v2);
      ++j;
    }
  }
  res = res.concat(left.slice(i)).concat(right.slice(j));
  return res;
}

// console.log(mergeSort([4, 2, 100, 99, 10000, -1, 99, 2]));

var Twitter = function () {
  this.count = 0;
  this.tweetMap = {};
  this.followMap = {};
};

Twitter.prototype.postTweet = function (userId, tweetId) {
  if (this.tweetMap[userId] === undefined) this.tweetMap[userId] = [];
  this.tweetMap[userId].push([this.count, tweetId]);
  this.count++;
};

Twitter.prototype.getNewsFeed = function (userId) {
  let res = [];
  let minHeap = new PQ((a, b) => a[0] - b[0]);

  if (this.followMap[userId] === undefined) this.followMap[userId] = new Set();
  this.followMap[userId].add(userId);

  for (let followeeId of Array.from(this.followMap[userId])) {
    if (this.tweetMap[followeeId] !== undefined) {
      let idx = this.tweetMap[followeeId].length - 1;
      let [count, tweetId] = this.tweetMap[followeeId][idx];
      minHeap.add([count, tweetId, followeeId, idx - 1]);
    }
  }

  while (minHeap.size() && res.length < 10) {
    let [count, tweetId, followeeId, idx] = minHeap.poll();
    res.push(tweetId);
    if (idx >= 0) {
      [count, tweetId] = this.tweetMap[followeeId][idx];
      minHeap.add([count, tweetId, followeeId, idx - 1]);
    }
  }

  return res;
};

Twitter.prototype.follow = function (followerId, followeeId) {
  if (this.followMap[followerId] === undefined)
    this.followMap[followerId] = new Set();
  this.followMap[followerId].add(followeeId);
};

Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (this.followMap[followerId] !== undefined)
    this.followMap[followerId].delete(followeeId);
};

// let twitter = new Twitter();
// twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
// console.log(twitter.getNewsFeed(1)); // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
// twitter.getNewsFeed(1);
// twitter.follow(1, 2); // User 1 follows user 2.
// twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
// console.log(twitter.getNewsFeed(1)); // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
// twitter.unfollow(1, 2); // User 1 unfollows user 2.
// console.log(twitter.getNewsFeed(1)); // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.

// var maxCoins = function (nums) {
//   nums.unshift(1);
//   nums.push(1);
//   let dp = {};

//   function dfs(l, r) {
//     console.log(l, r);
//     if (l > r) return 0;
//     let key = `${l} ${r}`;
//     if (dp[key] !== undefined) return dp[key];

//     dp[key] = 0;
//     for (let i = l; i < r + 1; ++i) {
//       if (l === 1 && r === nums.length - 2) console.log(i);
//       let coins = nums[l - 1] * nums[i] * nums[r + 1];
//       coins += dfs(l, i - 1) + dfs(i + 1, r);
//       dp[key] = Math.max(dp[key], coins);
//     }
//     return dp[key];
//   }

//   return dfs(1, nums.length - 2);
// };

// console.log(maxCoins([3, 1, 5, 8]));
// console.log(maxCoins([1, 5]));
//

var isMatch = function (s, p) {
  function dfs(i, j) {
    console.log(i, j);
    if (j === p.length) {
      return i === s.length ? true : false;
    }
    if (i === s.length) {
      return j === p.length ? true : false;
    }

    let match = false;
    if (j <= p.length - 2 && p[j + 1] === "*") {
      let k = 0;
      while (s[i + k] === p[j] || p[j] === ".") {
        match = match || dfs(i + k, j + 2);
        ++k;
      }
    } else if (s[i] === p[j] || p[j] === ".") {
      match = match || dfs(i + 1, j + 1);
    }

    return match;
  }
  return dfs(0, 0);
};

// console.log(isMatch("aa", "a"));
// console.log(isMatch("aa", "a*"));
// console.log(isMatch("ab", ".*"));

var maxProfit = function (prices) {
  let dp = new Map();

  function dfs(i, buying) {
    if (i >= prices.length) return 0;

    let key = `${i} ${buying}`;
    if (dp.has(key)) return dp.get(key);

    let cooldown = dfs(i + 1, buying);
    if (buying) {
      let buy = dfs(i + 1, !buying) - prices[i]; // buy stock
      dp.set(key, Math.max(cooldown, buy));
    } else {
      let sell = dfs(i + 2, !buying) + prices[i]; // sell stock
      dp.set(key, Math.max(cooldown, sell));
    }

    return dp.get(key);
  }
  return dfs(0, true);
};
// console.log(maxProfit([1, 2, 3, 0, 2]));
// console.log(maxProfit([2, 1, 4]));
// console.log(maxProfit([1, 2, 4]));

// console.log(
//   maxProfit([
//     70, 4, 83, 56, 94, 72, 78, 43, 2, 86, 65, 100, 94, 56, 41, 66, 3, 33, 10, 3,
//     45, 94, 15, 12, 78, 60, 58, 0, 58, 15, 21, 7, 11, 41, 12, 96, 83, 77, 47,
//     62, 27, 19, 40, 63, 30, 4, 77, 52, 17, 57, 21, 66, 63, 29, 51, 40, 37, 6,
//     44, 42, 92, 16, 64, 33, 31, 51, 36, 0, 29, 95, 92, 35, 66, 91, 19, 21, 100,
//     95, 40, 61, 15, 83, 31, 55, 59, 84, 21, 99, 45, 64, 90, 25, 40, 6, 41, 5,
//     25, 52, 59, 61, 51, 37, 92, 90, 20, 20, 96, 66, 79, 28, 83, 60, 91, 30, 52,
//     55, 1, 99, 8, 68, 14, 84, 59, 5, 34, 93, 25, 10, 93, 21, 35, 66, 88, 20, 97,
//     25, 63, 80, 20, 86, 33, 53, 43, 86, 53, 55, 61, 77, 9, 2, 56, 78, 43, 19,
//     68, 69, 49, 1, 6, 5, 82, 46, 24, 33, 85, 24, 56, 51, 45, 100, 94, 26, 15,
//     33, 35, 59, 25, 65, 32, 26, 93, 73, 0, 40, 92, 56, 76, 18, 2, 45, 64, 66,
//     64, 39, 77, 1, 55, 90, 10, 27, 85, 40, 95, 78, 39, 40, 62, 30, 12, 57, 84,
//     95, 86, 57, 41, 52, 77, 17, 9, 15, 33, 17, 68, 63, 59, 40, 5, 63, 30, 86,
//     57, 5, 55, 47, 0, 92, 95, 100, 25, 79, 84, 93, 83, 93, 18, 20, 32, 63, 65,
//     56, 68, 7, 31, 100, 88, 93, 11, 43, 20, 13, 54, 34, 29, 90, 50, 24, 13, 44,
//     89, 57, 65, 95, 58, 32, 67, 38, 2, 41, 4, 63, 56, 88, 39, 57, 10, 1, 97, 98,
//     25, 45, 96, 35, 22, 0, 37, 74, 98, 14, 37, 77, 54, 40, 17, 9, 28, 83, 13,
//     92, 3, 8, 60, 52, 64, 8, 87, 77, 96, 70, 61, 3, 96, 83, 56, 5, 99, 81, 94,
//     3, 38, 91, 55, 83, 15, 30, 39, 54, 79, 55, 86, 85, 32, 27, 20, 74, 91, 99,
//     100, 46, 69, 77, 34, 97, 0, 50, 51, 21, 12, 3, 84, 84, 48, 69, 94, 28, 64,
//     36, 70, 34, 70, 11, 89, 58, 6, 90, 86, 4, 97, 63, 10, 37, 48, 68, 30, 29,
//     53, 4, 91, 7, 56, 63, 22, 93, 69, 93, 1, 85, 11, 20, 41, 36, 66, 67, 57, 76,
//     85, 37, 80, 99, 63, 23, 71, 11, 73, 41, 48, 54, 61, 49, 91, 97, 60, 38, 99,
//     8, 17, 2, 5, 56, 3, 69, 90, 62, 75, 76, 55, 71, 83, 34, 2, 36, 56, 40, 15,
//     62, 39, 78, 7, 37, 58, 22, 64, 59, 80, 16, 2, 34, 83, 43, 40, 39, 38, 35,
//     89, 72, 56, 77, 78, 14, 45, 0, 57, 32, 82, 93, 96, 3, 51, 27, 36, 38, 1, 19,
//     66, 98, 93, 91, 18, 95, 93, 39, 12, 40, 73, 100, 17, 72, 93, 25, 35, 45, 91,
//     78, 13, 97, 56, 40, 69, 86, 69, 99, 4, 36, 36, 82, 35, 52, 12, 46, 74, 57,
//     65, 91, 51, 41, 42, 17, 78, 49, 75, 9, 23, 65, 44, 47, 93, 84, 70, 19, 22,
//     57, 27, 84, 57, 85, 2, 61, 17, 90, 34, 49, 74, 64, 46, 61, 0, 28, 57, 78,
//     75, 31, 27, 24, 10, 93, 34, 19, 75, 53, 17, 26, 2, 41, 89, 79, 37, 14, 93,
//     55, 74, 11, 77, 60, 61, 2, 68, 0, 15, 12, 47, 12, 48, 57, 73, 17, 18, 11,
//     83, 38, 5, 36, 53, 94, 40, 48, 81, 53, 32, 53, 12, 21, 90, 100, 32, 29, 94,
//     92, 83, 80, 36, 73, 59, 61, 43, 100, 36, 71, 89, 9, 24, 56, 7, 48, 34, 58,
//     0, 43, 34, 18, 1, 29, 97, 70, 92, 88, 0, 48, 51, 53, 0, 50, 21, 91, 23, 34,
//     49, 19, 17, 9, 23, 43, 87, 72, 39, 17, 17, 97, 14, 29, 4, 10, 84, 10, 33,
//     100, 86, 43, 20, 22, 58, 90, 70, 48, 23, 75, 4, 66, 97, 95, 1, 80, 24, 43,
//     97, 15, 38, 53, 55, 86, 63, 40, 7, 26, 60, 95, 12, 98, 15, 95, 71, 86, 46,
//     33, 68, 32, 86, 89, 18, 88, 97, 32, 42, 5, 57, 13, 1, 23, 34, 37, 13, 65,
//     13, 47, 55, 85, 37, 57, 14, 89, 94, 57, 13, 6, 98, 47, 52, 51, 19, 99, 42,
//     1, 19, 74, 60, 8, 48, 28, 65, 6, 12, 57, 49, 27, 95, 1, 2, 10, 25, 49, 68,
//     57, 32, 99, 24, 19, 25, 32, 89, 88, 73, 96, 57, 14, 65, 34, 8, 82, 9, 94,
//     91, 19, 53, 61, 70, 54, 4, 66, 26, 8, 63, 62, 9, 20, 42, 17, 52, 97, 51, 53,
//     19, 48, 76, 40, 80, 6, 1, 89, 52, 70, 38, 95, 62, 24, 88, 64, 42, 61, 6, 50,
//     91, 87, 69, 13, 58, 43, 98, 19, 94, 65, 56, 72, 20, 72, 92, 85, 58, 46, 67,
//     2, 23, 88, 58, 25, 88, 18, 92, 46, 15, 18, 37, 9, 90, 2, 38, 0, 16, 86, 44,
//     69, 71, 70, 30, 38, 17, 69, 69, 80, 73, 79, 56, 17, 95, 12, 37, 43, 5, 5, 6,
//     42, 16, 44, 22, 62, 37, 86, 8, 51, 73, 46, 44, 15, 98, 54, 22, 47, 28, 11,
//     75, 52, 49, 38, 84, 55, 3, 69, 100, 54, 66, 6, 23, 98, 22, 99, 21, 74, 75,
//     33, 67, 8, 80, 90, 23, 46, 93, 69, 85, 46, 87, 76, 93, 38, 77, 37, 72, 35,
//     3, 82, 11, 67, 46, 53, 29, 60, 33, 12, 62, 23, 27, 72, 35, 63, 68, 14, 35,
//     27, 98, 94, 65, 3, 13, 48, 83, 27, 84, 86, 49, 31, 63, 40, 12, 34, 79, 61,
//     47, 29, 33, 52, 100, 85, 38, 24, 1, 16, 62, 89, 36, 74, 9, 49, 62, 89,
//   ])
// );

var alienOrder = function (words) {
  let adj = new Map();
  for (let word of words) {
    for (let c of word) {
      if (!adj.has(c)) adj.set(c, new Set());
    }
  }

  for (let i = 0; i < words.length - 1; ++i) {
    let [w1, w2] = [words[i], words[i + 1]];
    let minLength = Math.min(w1.length, w2.length);
    if (
      w1.length > w2.length &&
      w1.substring(0, minLength) === w2.substring(0, minLength)
    )
      return "";

    for (let j = 0; j < minLength; ++j) {
      if (w1[j] !== w2[j]) {
        adj.get(w1[j]).add(w2[j]);
        break;
      }
    }
  }

  visited = {}; // false = visited, true = current path
  let res = [];

  function dfs(c) {
    if (visited[c] !== undefined) return visited[c];
    visited[c] = true;

    for (let neighbor of adj.get(c)) {
      if (dfs(neighbor)) return true;
    }

    visited[c] = false;
    res.push(c);
  }

  for (let c of adj.keys()) {
    if (dfs(c)) return "";
  }

  res.reverse();
  return res.join("");
};

// console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"]));

const digits = new Set("1234567890");
const operators = new Set("+-*/");
const parens = new Set("()");

function* tokenize(str) {
  for (let i = 0; i < str.length; i++) {
    if (operators.has(str[i]) || parens.has(str[i])) {
      yield str[i];
    } else if (digits.has(str[i])) {
      let num = "";
      let j = i;
      while (digits.has(str[j])) num += str[j++];
      yield num;
      i = j - 1;
    }
  }
}

function calculate(str) {
  console.log(str);
  let nums = [];
  let ops = [];
  let inParens = false;
  let temp = "";
  for (let token of tokenize(str)) {
    if (token === ")") {
      inParens = false;
      nums.push(calculate(temp));
      temp = "";
    }

    if (inParens) {
      temp += token;
      continue;
    }
    if (!isNaN(token)) nums.push(token);
    if (operators.has(token)) ops.push(token);
    if (token === "(") inParens = true;

    if (nums.length > 1 && ops.length > 0 && !inParens) {
      let x2 = parseInt(nums.pop());
      let x1 = parseInt(nums.pop());
      let op = ops.pop();

      switch (op) {
        case "+":
          nums.push(x1 + x2);
          break;
        case "-":
          nums.push(x1 - x2);
          break;
        case "*":
          nums.push(x1 * x2);
          break;
        case "/":
          nums.push(Math.trunc(x1 / x2));
          break;
      }
    }
  }
  console.log(nums);
  return nums[0];
}

// console.log(calculate("   (2 * (3 + 4 * (5 + 6))) / 2        "));

var findDisappearedNumbers = function (nums) {
  let dp = new Array(nums.length + 1).fill(0);
  nums.forEach((n) => (dp[n] = true));

  let res = [];
  for (let i = 1; i <= nums.length; ++i) {
    if (dp[i] === 0) res.push(i);
  }
  return res;
};
// console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));

function PQ2(compareFn) {
  this.heap = [];

  this.leftChild = (index) => index * 2 + 1;
  this.rightChild = (index) => index * 2 + 2;
  this.parent = (index) => Math.floor((index - 1) / 2);

  this.add = function (val) {
    this.heap.push(val);
    let index = this.heap.length - 1;
    let pIndex = this.parent(index);
    while (pIndex >= 0 && compareFn(this.heap[index], this.heap[pIndex]) < 0) {
      [this.heap[index], this.heap[pIndex]] = [
        this.heap[pIndex],
        this.heap[index],
      ];
      index = pIndex;
      pIndex = this.parent(index);
    }
  };

  this.poll = function () {
    if (this.heap.length === 0) throw new Error("heap empty");
    let res = this.heap[0];
    [this.heap[0], this.heap[this.heap.length - 1]] = [
      this.heap[this.heap.length - 1],
      this.heap[0],
    ];
    this.heap.pop();
    this.heapify(0);
    return res;
  };

  this.heapify = function (idx) {
    let lIndex = this.leftChild(idx);
    let rIndex = this.rightChild(idx);

    if (lIndex >= this.heap.length) return;

    let lValue = this.heap[lIndex];

    if (rIndex >= this.heap.length) {
      if (compareFn(this.heap[idx], lValue) > 0) {
        [this.heap[idx], this.heap[lIndex]] = [
          this.heap[lIndex],
          this.heap[idx],
        ];
        this.heapify(lIndex);
      }
    } else {
      let rValue = this.heap[rIndex];
      if (compareFn(lValue, rValue) < 0) {
        [this.heap[idx], this.heap[lIndex]] = [
          this.heap[lIndex],
          this.heap[idx],
        ];
        this.heapify(lIndex);
      } else {
        [this.heap[idx], this.heap[rIndex]] = [
          this.heap[rIndex],
          this.heap[idx],
        ];
        this.heapify(rIndex);
      }
    }
  };

  this.peek = function () {
    if (this.heap.length === 0) throw new Error("heap empty");
    return this.heap[this.heap.length - 1];
  };

  this.size = function () {
    return this.heap.length;
  };

  this.print = function () {
    return this.heap;
  };
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}
