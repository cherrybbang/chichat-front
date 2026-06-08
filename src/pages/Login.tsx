import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password)

    if (error) {
      setError(error)
    } else {
      navigate('/')
    }

    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M160 60C160 43.4315 146.569 30 130 30H70C53.4315 30 40 43.4315 40 60V110C40 126.569 53.4315 140 70 140H85L100 155L115 140H130C146.569 140 160 126.569 160 110V60Z"
              fill="#00C6AD"
            />
            <circle cx="75" cy="85" r="7" fill="white" opacity="0.85" />
            <circle cx="125" cy="85" r="7" fill="white" opacity="0.85" />
            <path d="M72 105 Q100 118 128 105" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
          <span className="logo-text">ChitChat</span>
        </div>

        <h2 className="login-title">{isSignUp ? '회원가입' : '로그인'}</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              minLength={6}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
          </button>
        </form>

        <button
          className="toggle-auth"
          onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
        >
          {isSignUp
            ? <>이미 계정이 있으신가요? <span>로그인</span></>
            : <>계정이 없으신가요? <span>회원가입</span></>
          }
        </button>
      </div>
    </div>
  )
}

export default Login
