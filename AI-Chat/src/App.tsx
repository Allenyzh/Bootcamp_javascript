import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return; // trim method 去除头尾空白，同时确保输入的不是空白内容

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { role: "ai", content: data.answer };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      
    } catch (error) {
      console.error("Error communicating with AI:",error);
    }
  };
  
  console.log(messages); // test

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "user" ? "user-message" : "ai-message"}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
