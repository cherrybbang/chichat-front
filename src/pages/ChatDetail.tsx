import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from '../lib/supabase';
import type { Message } from '../types/chat';

const BotIcon = ({ size = 16 }: { size?: number }) => (
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

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

function ChatDetail() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (error) { console.error("메시지 불러오기 실패:", error); return; }
      setMessages(data);
    };

    fetchMessages();

    const channel = supabase
      .channel("messages")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${roomId}`,
      }, (payload) => {
        const newMsg = payload.new as Message;
        setMessages((prev) => [...prev, newMsg]);
        if (newMsg.role === "bot") setIsTyping(false);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // const { error } = await supabase.from("messages").insert({
    //   room_id: roomId,
    //   content: input,
    //   role: "user",
    // });

    // if (error) { console.error("메시지 저장 실패:", error); return; }
    // setInput("");

    const userInput = input;
    setInput("");
    setIsTyping(true);

    await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput, room_id: roomId }),
    });
    setIsTyping(false);
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
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.role === 'bot' && (
              <div className="bot-avatar">
                <BotIcon size={16} />
              </div>
            )}
            {msg.role === 'user' && (
              <span className="message-time">{formatTime(msg.created_at)}</span>
            )}
            <div className="message-bubble">{msg.content}</div>
            {msg.role === 'bot' && (
              <span className="message-time">{formatTime(msg.created_at)}</span>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="bot-avatar"><BotIcon size={16} /></div>
            <div className="message-bubble typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="message-input"
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
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

export default ChatDetail;
