function positiveIntReverser(num) {
  let reversedNumber = 0;
  while (num > 0) {
    let digit = num % 10;
    console.log(digit);
    reversedNumber = reversedNumber * 10 + digit;
    num = Math.floor(num / 10); // 移除最后一位数字
  }
  return reversedNumber;
}

console.log(positiveIntReverser(65461343));
