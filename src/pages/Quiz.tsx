import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { quizQuestions, type QuizQuestion } from '../data/quiz-questions'
import { getProgress, saveProgress, updateStreak, addXP } from '../lib/storage'
import XPToast from '../components/XPToast'

type QuizState = 'setup' | 'playing' | 'answered' | 'results'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>('setup')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [xpToast, setXpToast] = useState({ visible: false, amount: 0, reason: '' })

  const startQuiz = useCallback(() => {
    let pool = quizQuestions
    if (category !== 'all') pool = pool.filter((q) => q.category === category)
    if (difficulty !== 'all') pool = pool.filter((q) => q.difficulty === difficulty)
    const selected = shuffleArray(pool).slice(0, 10)
    if (selected.length === 0) return
    setQuestions(selected)
    setCurrentQ(0)
    setScore(0)
    setSelectedAnswer(null)
    setAnswers([])
    setState('playing')
  }, [category, difficulty])

  const handleAnswer = (index: number) => {
    if (state !== 'playing') return
    setSelectedAnswer(index)
    const correct = index === questions[currentQ].correctIndex
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => [...prev, correct])
    setState('answered')
  }

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      // Quiz complete
      const finalScore = score + (selectedAnswer === questions[currentQ].correctIndex ? 0 : 0) // already counted
      const progress = getProgress()
      let updated = updateStreak(progress)
      updated = { ...updated, quizzesTaken: updated.quizzesTaken + 1 }
      if (finalScore > updated.quizHighScore) {
        updated.quizHighScore = finalScore
      }
      const xpEarned = finalScore * 5
      updated = addXP(updated, xpEarned)
      saveProgress(updated)
      setXpToast({ visible: true, amount: xpEarned, reason: `Quiz: ${finalScore}/${questions.length} correct` })
      if (finalScore >= questions.length * 0.8) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      }
      setState('results')
    } else {
      setCurrentQ((q) => q + 1)
      setSelectedAnswer(null)
      setState('playing')
    }
  }

  const categories = [...new Set(quizQuestions.map((q) => q.category))]

  // Setup screen
  if (state === 'setup') {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-900">Quiz</h1>
          <p className="text-sm text-surface-500 mt-1">Test your speaking knowledge</p>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-surface-700 block mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  category === 'all' ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-600'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                    category === cat ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-600'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-surface-700 block mb-2">Difficulty</label>
            <div className="flex gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                    difficulty === d ? 'bg-brand-500 text-white' : 'bg-surface-100 text-surface-600'
                  }`}
                >
                  {d === 'all' ? 'All' : d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  // Results screen
  if (state === 'results') {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-surface-200 p-8 text-center"
        >
          <div className="text-5xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '👏' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-surface-900">Quiz Complete!</h2>
          <div className="text-4xl font-extrabold gradient-text mt-3">
            {score} / {questions.length}
          </div>
          <p className="text-surface-500 mt-2">{percentage}% correct</p>

          <div className="mt-6 space-y-2">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
                  answers[i] ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                <span>{answers[i] ? '✓' : '✗'}</span>
                <span className="truncate">{q.question}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setState('setup')}
              className="flex-1 py-2.5 bg-surface-100 text-surface-700 font-medium rounded-xl hover:bg-surface-200"
            >
              New Quiz
            </button>
            <button
              onClick={startQuiz}
              className="flex-1 py-2.5 bg-brand-500 text-white font-medium rounded-xl hover:bg-brand-600"
            >
              Try Again
            </button>
          </div>
        </motion.div>
        <XPToast {...xpToast} onDone={() => setXpToast((prev) => ({ ...prev, visible: false }))} />
      </div>
    )
  }

  // Playing / Answered
  const question = questions[currentQ]
  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-surface-500">
          {currentQ + 1} / {questions.length}
        </span>
        <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            className="h-full bg-brand-500 rounded-full"
          />
        </div>
        <span className="text-sm font-medium text-brand-600">{score} pts</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl border border-surface-200 p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-surface-100 text-surface-600 capitalize">
              {question.category.replace('-', ' ')}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
              question.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
              question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {question.difficulty}
            </span>
          </div>

          <h2 className="text-lg font-bold text-surface-900 mb-5">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              let style = 'bg-surface-50 border-surface-200 hover:bg-surface-100 text-surface-800'
              if (state === 'answered') {
                if (i === question.correctIndex) {
                  style = 'bg-green-50 border-green-300 text-green-800'
                } else if (i === selectedAnswer && i !== question.correctIndex) {
                  style = 'bg-red-50 border-red-300 text-red-800'
                } else {
                  style = 'bg-surface-50 border-surface-200 text-surface-400'
                }
              } else if (selectedAnswer === i) {
                style = 'bg-brand-50 border-brand-300 text-brand-800'
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={state === 'answered'}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${style}`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-current/20 text-xs font-bold mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {state === 'answered' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200"
            >
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Explanation: </span>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {state === 'answered' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={nextQuestion}
            className="px-6 py-2.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors"
          >
            {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
