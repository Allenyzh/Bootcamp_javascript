let messages = [];

function setMessages(newMessages) {
  messages = newMessages;
  // 可以在这里模拟重新渲染，或调用某些函数以响应变化
  console.log("Messages updated:", messages);
}

// 更新状态
setMessages(["Hello"]);
setMessages([...messages, "World"]);
setMessages([...messages, "hi"]);

