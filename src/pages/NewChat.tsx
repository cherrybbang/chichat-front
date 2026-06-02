import { useState } from "react";
import { supabase } from '../lib/supabase';
import { useNavigate } from "react-router-dom";

const BotIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <path
      d="M160 60C160 43.4315 146.569 30 130 30H70C53.4315 30 40 43.4315 40 60V110C40 126.569 53.4315 140 70 140H85L100 155L115 140H130C146.569 140 160 126.569 160 110V60Z"
      fill="#00C6AD"
    />
    <circle cx="75" cy="85" r="7" fill="white" opacity="0.85" />
    <circle cx="125" cy="85" r="7" fill="white" opacity="0.85" />
    <path d="M72 105 Q100 118 128 105" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);

function NewChat() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .insert({})
      .select()
      .single();

    if (roomError || !room) {
      console.error("room 생성 실패:", roomError);
      return;
    }

    // const { error: msgError } = await supabase.from("messages").insert({
    //   room_id: room.id,
    //   content: input,
    //   role: "user",
    // });

    // if (msgError) {
    //   console.error("메시지 저장 실패:", msgError);
    //   return;
    // }

    // setInput("");
    // navigate(`/chat/${room.id}`);

    const userInput = input;
    setInput("");
    navigate(`/chat/${room.id}`);

    fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput, room_id: room.id }),
    });
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-avatar">
          <BotIcon size={20} />
        </div>
        <div className="chat-header-info">
          <h3>ChitChat</h3>
          <span className="status">온라인</span>
        </div>
      </div>

      <div className="chat-messages">
        <div className="chat-empty">
          <BotIcon size={48} />
          <p>안녕하세요! 무엇이든 물어보세요 :)</p>
        </div>
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="어떤 게 궁금하신가요?"
          className="message-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button className="send-button" onClick={handleSend} disabled={!input.trim()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NewChat;
