import { useState } from "react";
import { supabase } from '../lib/supabase';
import { useNavigate } from "react-router-dom";

function NewChat() {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    // room 생성
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .insert({ })
      .select()
      .single();
    
    if (roomError || !room) {
      console.error("room 생성 실패:", roomError);
      return;
    }

    // 첫 메시지 저장
    const { error: msgError } = await supabase.from("messages").insert({
      room_id: room.id,
      content: input,
      role: "user",
    });

    if (msgError) {
      console.error("메시지 저장 실패:", msgError);
      return;
    }

    navigate(`/chat/${room.id}`);
    
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
        <div className="message bot">
          <div className="message-bubble">
            <p>안녕하세요! 무엇을 도와드릴까요?</p>
            <span className="message-time">14:30</span>
          </div>
        </div>
        
        <div className="message user">
          <div className="message-bubble">
            <p>안녕하세요!</p>
            <span className="message-time">14:31</span>
          </div>
        </div>
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

export default NewChat;