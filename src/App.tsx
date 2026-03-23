import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import Scenarios from './pages/Scenarios'
import DailyChallenge from './pages/DailyChallenge'
import Progress from './pages/Progress'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/daily-challenge" element={<DailyChallenge />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Layout>
  )
}
