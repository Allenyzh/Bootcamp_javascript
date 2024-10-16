function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function factorial(n) {
  if (n == 1) {
    console.log(`factorial(${n}) = 1`); // 打印基准情况
    return 1;
  } else {
    let result = n * (await factorial(n - 1)); // 递归调用
    console.log(`factorial(${n}) = ${n} * factorial(${n - 1}) = ${result}`);
    await delay(100); // 延迟 0.5 秒
    return result;
  }
}

factorial(100).then((result) => console.log(`Final result: ${result}`));
