let testArr = [5, 3, 8, 4, 564, 2, 1, 85, 13];

function bubbleSort(array) {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        console.log(`i = ${i}, j = ${j}`);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        console.log(array);
      }
    }
  }
  return array;
}

console.log(bubbleSort(testArr));
