import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from '../lib/supabase';
import type { Message } from '../types/chat';

function ChatDetail() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // 기존 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("메시지 불러오기 실패:", error);
        return;
      }

      setMessages(data);
    };

    fetchMessages();

    // realTIem 구독, 새로운 메시지 실시간 반영
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT", // 메시지 추가될때만 반응
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`, // roomId에 해당하는 메시지만 구독
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]); // 기존 메시지 + 새 메시지
        }
      )
      .subscribe();

      // 컴포넌트 언마운트 시 구독 해제. cleanup.
      return () => {
        supabase.removeChannel(channel);
      };

  }, [roomId]);

  // 메시지 전송
  const handleSend = async () => {
    if (!input.trim()) return;

    const { error } = await supabase.from("messages").insert({
      room_id: roomId,
      content: input,
      role: "user",
    });

    if (error) {
      console.error("메시지 저장 실패:", error);
      return;
    }

    setInput("");
  };

  return (
    <div className="chat-page">
      {/* header */}
      <div className="chat-header">
        <h3>Chat</h3>
      </div>

      {/* 메시지 */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className="message-bubble">
              <p>{msg.content}</p>
              <span>
                {new Date(msg.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 입력 */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );

}

export default ChatDetail;