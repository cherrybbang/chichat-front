import { useNavigate } from 'react-router-dom'

function MainPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/chat')
  }

  return (
    <div>
      <h1>Ask Me Anything...</h1>
      <button className="main-page-btn" onClick={handleClick}>click!</button>
    </div>
  )
}

export default MainPage