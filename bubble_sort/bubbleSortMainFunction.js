// 随机生成长度为10的数组
let testArr = Array.from(
  { length: 10 },
  () => Math.floor(Math.random() * 100) + 1
);

function bubbleSort_loopMethod(array, n = array.length) {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // console.log(`i = ${i}, j = ${j}`);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        // console.log(array);
      }
    }
  }
  return array;
}

function bubbleSort_recursiveMethod(array, n = array.length) {
  if (n == 1) {
    return;
  }
  function oneStep(j) {
    if (j < n - 1) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      oneStep(j + 1);
    }
  }

  oneStep(0); // 走一步

  bubbleSort_recursiveMethod(array, n - 1);
}

console.log(`loopMethod: ${bubbleSort_loopMethod(testArr)}`);
bubbleSort_recursiveMethod(testArr);
console.log(`recursiveMethod: ${testArr}`);
