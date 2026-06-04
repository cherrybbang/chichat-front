import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase';
import type { Room } from '../types/chat';

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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  if (diffDays < 7) return date.toLocaleDateString('ko-KR', { weekday: 'short' });
  return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
};

function ChatList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("id, created_at")
        .order("created_at", { ascending: false });

      if (error) { console.error("방 목록 불러오기 실패:", error); setLoading(false); return; }

      const roomsWithPreview = await Promise.all(
        (data ?? []).map(async (room) => {
          const { data: msgs } = await supabase
            .from("messages")
            .select("content")
            .eq("room_id", room.id)
            .eq("role", "user")
            .order("created_at", { ascending: true })
            .limit(1);

          return { ...room, preview: msgs?.[0]?.content ?? "새 대화" };
        })
      );

      setRooms(roomsWithPreview);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleDelete = async (e: React.MouseEvent, roomId: string) => {
    e.preventDefault();
    if (!window.confirm("이 채팅을 삭제할까요?")) return;

    setDeletingId(roomId);
    await supabase.from("messages").delete().eq("room_id", roomId);
    await supabase.from("rooms").delete().eq("id", roomId);
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
    setDeletingId(null);
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>채팅 기록</h2>
        <button className="btn-primary" onClick={() => navigate("/chat")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          새 채팅
        </button>
      </div>

      {loading ? (
        <div className="history-empty">
          <p style={{ color: 'var(--text-3)' }}>불러오는 중...</p>
        </div>
      ) : rooms.length === 0 ? (
        <div className="history-empty">
          <BotIcon size={48} />
          <p>아직 채팅 기록이 없어요.</p>
          <button className="btn-primary" onClick={() => navigate("/chat")}>첫 채팅 시작하기</button>
        </div>
      ) : (
        <ul className="room-list">
          {rooms.map((room) => (
            <li key={room.id} className="room-list-item">
              <Link to={`/chat/${room.id}`} className="room-item">
                <div className="room-avatar">
                  <BotIcon size={20} />
                </div>
                <div className="room-info">
                  <div className="room-top">
                    <span className="room-name">ChitChat</span>
                    <span className="room-date">{formatDate(room.created_at)}</span>
                  </div>
                  <p className="room-preview">{room.preview}</p>
                </div>
              </Link>
              <button
                className="room-delete-btn"
                onClick={(e) => handleDelete(e, room.id)}
                disabled={deletingId === room.id}
                title="채팅 삭제"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatList;
