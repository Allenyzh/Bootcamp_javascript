let number = 1345;
let reversedNumber = 0;

while (number > 0) {
  let digit = number % 10;
//   console.log(digit);
  reversedNumber = reversedNumber * 10 + digit;
  number = Math.floor(number / 10); // 移除最后一位数字
}
console.log(reversedNumber);
