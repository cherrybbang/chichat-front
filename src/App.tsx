import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Header from './components/Header'
import ChatPage from './pages/ChatPage'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Header />
      <section id="center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </section>
    </Router>
    </>
  )
}

export default App
