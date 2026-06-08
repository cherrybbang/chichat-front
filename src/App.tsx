import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import MainPage from './components/MainPage'
import Header from './components/Header'
import NewChat from './pages/NewChat'
import ChatDetail from './pages/ChatDetail'
import ChatList from './pages/ChatList'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <section id="center">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/history" element={<ChatList />} />
            <Route path="/chat" element={<NewChat />} />
            <Route path="/chat/:roomId" element={<ChatDetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </Router>
    </AuthProvider>
  )
}

export default App
