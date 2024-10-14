let testArr = [5, 3, 8, 4, 564, 2, 1, 85, 13];

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        console.log(i, j);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        console.log(arr);
      }
    }
  }
  return arr;
}

console.log(bubbleSort(testArr));
