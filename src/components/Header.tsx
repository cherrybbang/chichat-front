import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="relative">
            <svg
              width="48"
              height="48"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M160 60C160 43.4315 146.569 30 130 30H70C53.4315 30 40 43.4315 40 60V110C40 126.569 53.4315 140 70 140H85L100 155L115 140H130C146.569 140 160 126.569 160 110V60Z"
                fill="#A5F1E9"
              />
              <circle cx="75" cy="75" r="8" fill="#7FE9DE" />
              <circle cx="75" cy="75" r="4" fill="white" />
              <circle cx="125" cy="75" r="8" fill="#7FE9DE" />
              <circle cx="125" cy="75" r="4" fill="white" />
              <path
                d="M70 100 Q100 115 130 100"
                stroke="#7FE9DE"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="155" cy="45" r="12" fill="#FFF6BF" opacity="0.9" />
            </svg>
          </div>
           <span className="text-2xl font-bold" style={{ 
            fontFamily: '"Quicksand", "Nunito", "Poppins", system-ui, sans-serif',
            background: 'linear-gradient(135deg, #7FE9DE 0%, #A5F1E9 50%, #FFEBAD 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ChitChat
          </span>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/chat">채팅기록</Link>
            </li>
            <li>마이페이지</li>
          </ul>
        </nav>
      </div>
      
    </header>
  )
}

export default Header