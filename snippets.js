/**
 * @param {Array<number>} arr The input integer array to be sorted.
 * @return {Array<number>}
 */
function heapSort(arr) {
  // Begin by building a max heap.
  const size = arr.length;
  for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
    // Start with the index of the last parent node.
    // heapify: Swaps parent with child as long as child is larger than parent.
    heapify(arr, size, i);
  }

  // Iterate through the heap backwards, swapping the last element of the heap with the max element (the root of a max heap).
  // Max elements swapped to the end constitute the sorted part of the array (ignored in the next iteration by "i--").
  for (let i = size - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Build a max heap again in preparation for the swap in the next iteration.
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, size, parentIdx) {
  let largest = parentIdx; // Initiate largest value's index with parent index.
  const leftChildIdx = 2 * parentIdx + 1; // Calculate index of left child.
  const rightChildIdx = 2 * parentIdx + 2; // Calculate index of right child.
  // Set `largest` to index with highest value between parent, left and right child.
  // See if left child of parent exists and is larger than parent.
  if (leftChildIdx < size && arr[leftChildIdx] > arr[largest]) {
    largest = leftChildIdx;
  }
  // See if right child of parent exists and is larger than parent.
  if (rightChildIdx < size && arr[rightChildIdx] > arr[largest]) {
    largest = rightChildIdx;
  }
  // If `largest` is not the current parent, swap positions with the current parent.
  if (largest !== parentIdx) {
    [arr[parentIdx], arr[largest]] = [arr[largest], arr[parentIdx]];
    // Continue to recursively heapify the affected subtree.
    heapify(arr, size, largest);
  }
}

function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;

  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  if (arr[hi] < arr[i + 1]) {
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  }

  return i + 1;
}

/**
 * Sorts an array of elements in-place.
 * @param {Array<number>} arr The array to be sorted
 * @param {number} lo Starting index of the array to sort
 * @param {number} hi Ending index (inclusive) of the array to sort
 */
function quickSortImpl(arr, lo, hi) {
  if (lo >= hi) {
    return;
  }

  const pivot = partition(arr, lo, hi);
  quickSortImpl(arr, lo, pivot - 1);
  quickSortImpl(arr, pivot + 1, hi);
}

/**
 * Sorts an array of elements
 * @param {number[]} arr The array to be sorted.
 * @return {number[]}
 */
export default function quickSort(arr) {
  quickSortImpl(arr, 0, arr.length - 1);
  return arr;
}

// function quickSort(arr) {
//   function partition(lo, hi) {
//     let pivot = arr[lo];
//     let lo2 = lo + 1;
//     while (lo2 < hi) {
//       while (arr[lo2] < pivot && lo2 < arr.length) ++lo2;
//       while (arr[hi] > pivot && hi >= 0) --hi;
//       if (lo >= hi) break;
//       [arr[lo2], arr[hi]] = [arr[hi], arr[lo2]];
//       ++lo2;
//       --hi;
//     }
//     [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
//     return hi;
//   }

//   function quickSortHelper(lo, hi) {
//     if (lo >= hi) return;

//     let pivot = partition(lo, hi);
//     quickSortHelper(lo, pivot - 1);
//     quickSortHelper(pivot + 1, arr.length - 1);
//   }
//   quickSortHelper(0, arr.length - 1);

//   return arr;
// }

// console.log(quickSort([9, 3, 6, 2, 1, 11])); // [1, 2, 3, 6, 9, 11]
// console.log(quickSort([12, 16, 14, 1, 2, 3]));

// 9
// lo = 5
// hi = 4
// lo > hi: swap 0 with hi
// 1,3,5,2,9,11
// quickSort(lo, hi)
// quickSort(hi)

// 12
// lo = 1
// hi = 5
// lo < hi: swap lo with hi; ++lo, --hi
// 12 3 14 1 2 16
//      *    *
// 12 3 2 1 14 16
//        *
// 1 3 2 12 14 16
// quicksort(lo, hi)
// quicksort(hi)


import {useState, useEffect} from 'react'
import './styles.css';

export default function App() {
  const [ids, setIds] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)

  async function loadMore() {
    let idx = page
    setPage(idx + 1)
    idx *= 6

    let urls = ids.slice(idx, idx + 6).map(id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    let data = await Promise.all(urls.map(url => fetch(url).then(d => d.json())))
    setData(data)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'json'
        }
      })

      const ids = await response.json();
      setIds(ids)

      await loadMore()
    }

    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    loadMore()
  }, [ids])

  return <div>
    {data.map(d => <div key={d.id} style={{border:'1px solid black', margin: '1em', padding: '1em'}}>
      <h4>{d.title}</h4>
      <p>By {d.by} - {new Date(d.time).toLocaleDateString()}</p>
    </div>)}
    <button style={{margin:'1rem'}} onClick={() => loadMore()}>Load more jobs</button>
  </div>;
}


function deepClone(value) {
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

function isSubset(a, b) {
    return Array.from(a).every((value) => b.contains(value));
  }