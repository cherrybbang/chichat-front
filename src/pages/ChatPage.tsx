function ChatPage() {
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
        
        <div className="message user">
          <div className="message-bubble">
            <p>React에 대해 질문이 있어요</p>
            <span className="message-time">14:31</span>
          </div>
        </div>
        
        <div className="message bot">
          <div className="message-bubble">
            <p>React에 대해 궁금한 점이 있으시군요! 어떤 부분이 궁금하신가요?</p>
            <span className="message-time">14:32</span>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="어떤게 궁금하신가요?"
          className="message-input"
        />
        <button className="send-button">전송</button>
      </div>
    </div>
  );
}

export default ChatPage;