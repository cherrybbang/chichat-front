import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main-wrap">
      <div className="main-hero">
        <div className="main-hero-icon">
          <svg width="38" height="38" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M160 60C160 43.4315 146.569 30 130 30H70C53.4315 30 40 43.4315 40 60V110C40 126.569 53.4315 140 70 140H85L100 155L115 140H130C146.569 140 160 126.569 160 110V60Z"
              fill="#00C6AD"
            />
            <circle cx="75" cy="85" r="7" fill="white" opacity="0.85" />
            <circle cx="125" cy="85" r="7" fill="white" opacity="0.85" />
            <path d="M72 105 Q100 118 128 105" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <h1>무엇이든 물어보세요</h1>
        <p className="sub">
          AI와 자유롭게 대화하며<br />
          궁금한 것을 해결해 보세요
        </p>

        <button className="btn-primary" onClick={() => navigate('/chat')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          새 채팅 시작하기
        </button>
      </div>
    </div>
  );
}

export default MainPage;
