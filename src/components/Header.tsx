import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <svg width="28" height="28" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M160 60C160 43.4315 146.569 30 130 30H70C53.4315 30 40 43.4315 40 60V110C40 126.569 53.4315 140 70 140H85L100 155L115 140H130C146.569 140 160 126.569 160 110V60Z"
              fill="#00C6AD"
            />
            <circle cx="75" cy="85" r="7" fill="white" opacity="0.85" />
            <circle cx="125" cy="85" r="7" fill="white" opacity="0.85" />
            <path d="M72 105 Q100 118 128 105" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
          <span className="logo-text">ChitChat</span>
        </Link>

        <nav>
          <ul className="header-nav">
            <li>
              <Link to="/history">채팅기록</Link>
            </li>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
