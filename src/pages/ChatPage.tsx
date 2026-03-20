import { useState } from "react";
import type { Message } from '../types/chat';

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: "user",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="profile">
          <div className="profile-avatar">^^</div>
          <div className="profile-info">
            <h3>ChitChat</h3>
            <p>온라인</p>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.role}`}>
          <div className="message-bubble">
            <p>{msg.content}</p>
            <span className="message-time">
              {new Date(msg.created_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="어떤게 궁금하신가요?"
          className="message-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button className="send-button" onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}

export default ChatPage;