import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Header from './components/Header'
import NewChat from './pages/NewChat'
import ChatDetail from './pages/ChatDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <section id="center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chat" element={<NewChat />} />
          <Route path="/chat/:roomId" element={<ChatDetail />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
