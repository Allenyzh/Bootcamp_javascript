$(document).ready(function () {
  $(document).ready(function () {
    isSorted = false;

    // 生成随机长度在3到10之间的数组
    let arrayLength = Math.floor(Math.random() * (10 - 4 + 1)) + 4;

    // 生成随机数组元素在1到10之间
    let arrayInitial = Array.from(
      { length: arrayLength },
      () => Math.floor(Math.random() * 10) + 1
    );

    // 打印生成的随机数组
    console.log("Initial Array:", arrayInitial);

    // 使用 jQuery 显示数组并设置颜色
    function renderArray(array, compareIndex = -1) {
      $("#array-container").empty(); // 清空当前内容
      $.each(array, function (index, value) {
        const barColor = isSorted
          ? "bg-success"
          : index === compareIndex || index === compareIndex + 1
          ? "bg-warning"
          : "";

        $("#array-container").append(
          `<div class="bar ${barColor}" style="height: ${
            value * 30
          }px"> ${value} </div>`
        );
      });
    }

    // 初始渲染数组
    renderArray(arrayInitial);

    // 递归冒泡排序的逐步展示版
    function bubbleSortStep(array, n, i) {
      if (n == 1) {
        // 完成排序
        renderArray(array, -1, n);
        return;
      }

      if (i < n - 1) {
        // 当前轮次的排序
        if (array[i] > array[i + 1]) {
          let temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
        }

        // 重新渲染数组，突出显示正在比较的元素
        renderArray(array, i);

        // 延迟 1 秒后继续当前轮次
        setTimeout(() => {
          bubbleSortStep(array, n, i + 1);
        }, 300);
      } else {
        // 一轮结束，开始下一轮
        renderArray(array, -1, n);
        setTimeout(bubbleSortStep(array, n - 1, 0), 0);
      }
    }

    // 开始逐步排序并展示
    bubbleSortStep(arrayInitial, arrayInitial.length, 0);
  });
});
