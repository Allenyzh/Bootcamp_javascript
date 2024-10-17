$(document).ready(function () {
  // 生成随机长度在3到10之间的数组
  var arrayLength = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  // 生成随机数组元素在1到10之间
  var myArray = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * 10) + 1);


  $.each(myArray, function (index, value) {
    $("#array-container").append(
      '<div class="bar" style="height: ' + value * 30 + 'px">' + value + '</div>'
    );
  });
});
