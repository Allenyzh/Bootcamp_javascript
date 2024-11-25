function quickSort(array, left = 0, right = array.length - 1) {
  if (left < right) {
    let pivotIndex = partitionWithBounds(array, left, right); // 分区操作
    quickSort(array, left, pivotIndex - 1); // 递归排序左部分
    quickSort(array, pivotIndex + 1, right); // 递归排序右部分
  }
}

// 分区函数需要支持指定的左右边界
function partitionWithBounds(array, left, right) {
  let pivot = array[right]; // 基准值
  let i = left - 1; // i 指针

  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      i += 1;
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  let temp = array[i + 1];
  array[i + 1] = array[right];
  array[right] = temp;

  return i + 1; // 返回基准值的位置
}

let array = [
  8, 3, 6, 7, 2, 5, 2, 8, 6, 4, 687, 5, 5, 2, 7, 89, 5, 6, 9, 2, 5, 0,
];
quickSort(array); // 调用快速排序
console.log(array); // 输出: [2, 3, 5, 6, 7, 8]
