import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { quizQuestions, type QuizQuestion } from '../data/quiz-questions'
import { getProgress, saveProgress, updateStreak, addXP, canDoDailyChallenge } from '../lib/storage'
import XPToast from '../components/XPToast'

type ChallengeState = 'ready' | 'playing' | 'results' | 'completed'

function getDailyQuestions(): QuizQuestion[] {
  // Seed based on date for consistent daily questions
  const today = new Date().toISOString().split('T')[0]
  let seed = 0
  for (let i = 0; i < today.length; i++) {
    seed = ((seed << 5) - seed + today.charCodeAt(i)) | 0
  }

  const shuffled = [...quizQuestions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = ((seed * 1103515245 + 12345) & 0x7fffffff)
    const j = seed % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, 5)
}

export default function DailyChallenge() {
  const [state, setState] = useState<ChallengeState>('ready')
  const [questions] = useState(getDailyQuestions)
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [answers, setAnswers] = useState<(boolean | null)[]>([])
  const [xpToast, setXpToast] = useState({ visible: false, amount: 0, reason: '' })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const progress = getProgress()
  const alreadyDone = !canDoDailyChallenge(progress)

  useEffect(() => {
    if (alreadyDone) setState('completed')
  }, [alreadyDone])

  useEffect(() => {
    if (state === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            finishChallenge()
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }
  }, [state])

  const startChallenge = () => {
    setCurrentQ(0)
    setScore(0)
    setTimeLeft(60)
    setAnswers([])
    setState('playing')
  }

  const handleAnswer = (index: number) => {
    const correct = index === questions[currentQ].correctIndex
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => [...prev, correct])

    if (currentQ + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current)
      finishChallenge(correct)
    } else {
      setCurrentQ((q) => q + 1)
    }
  }

  const finishChallenge = (lastCorrect?: boolean) => {
    const finalScore = score + (lastCorrect ? 1 : 0)
    const today = new Date().toISOString().split('T')[0]
    let updated = updateStreak(getProgress())
    updated = {
      ...updated,
      dailyChallengesCompleted: updated.dailyChallengesCompleted + 1,
      lastDailyChallengeDate: today,
    }
    const xpEarned = finalScore * 10 + (finalScore === 5 ? 25 : 0)
    updated = addXP(updated, xpEarned)
    saveProgress(updated)
    setXpToast({ visible: true, amount: xpEarned, reason: finalScore === 5 ? 'Perfect daily!' : 'Daily challenge!' })
    if (finalScore >= 4) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
    }
    setState('results')
  }

  // Already completed today
  if (state === 'completed') {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-surface-900">Challenge Complete</h2>
        <p className="text-surface-500">You've already completed today's daily challenge. Come back tomorrow!</p>
        <div className="bg-surface-50 rounded-xl p-4 border border-surface-200">
          <p className="text-sm text-surface-600">
            🔥 Current streak: <span className="font-bold text-brand-600">{progress.streak} days</span>
          </p>
          <p className="text-sm text-surface-600 mt-1">
            Total challenges: <span className="font-bold">{progress.dailyChallengesCompleted}</span>
          </p>
        </div>
      </div>
    )
  }

  // Ready
  if (state === 'ready') {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="text-5xl">⚡</div>
          <h1 className="text-2xl font-bold text-surface-900">Daily Challenge</h1>
          <p className="text-surface-500">5 questions. 60 seconds. One attempt.</p>

          <div className="grid grid-cols-3 gap-3 text-center py-4">
            <div className="bg-surface-50 rounded-xl p-3 border border-surface-200">
              <div className="text-lg font-bold text-surface-900">5</div>
              <div className="text-xs text-surface-500">Questions</div>
            </div>
            <div className="bg-surface-50 rounded-xl p-3 border border-surface-200">
              <div className="text-lg font-bold text-surface-900">60s</div>
              <div className="text-xs text-surface-500">Time Limit</div>
            </div>
            <div className="bg-surface-50 rounded-xl p-3 border border-surface-200">
              <div className="text-lg font-bold text-brand-600">50 XP</div>
              <div className="text-xs text-surface-500">Max Reward</div>
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-brand-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-brand-600 transition-all text-lg animate-pulse-glow"
          >
            Start Challenge
          </button>
        </motion.div>
      </div>
    )
  }

  // Results
  if (state === 'results') {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-surface-200 p-8 space-y-4"
        >
          <div className="text-5xl">
            {score === 5 ? '🏆' : score >= 3 ? '⭐' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-surface-900">
            {score === 5 ? 'Perfect!' : score >= 3 ? 'Nice Work!' : 'Keep Practicing!'}
          </h2>
          <div className="text-4xl font-extrabold gradient-text">{score}/5</div>
          <p className="text-surface-500">{percentage}% in {60 - timeLeft} seconds</p>

          <div className="space-y-2 mt-4">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
                  answers[i] ? 'bg-green-50 text-green-700' :
                  answers[i] === false ? 'bg-red-50 text-red-700' :
                  'bg-surface-50 text-surface-400'
                }`}
              >
                <span>{answers[i] ? '✓' : answers[i] === false ? '✗' : '—'}</span>
                <span className="truncate">{q.question}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <XPToast {...xpToast} onDone={() => setXpToast((prev) => ({ ...prev, visible: false }))} />
      </div>
    )
  }

  // Playing
  const question = questions[currentQ]
  const isLow = timeLeft <= 15

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Timer + Progress */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full ${
                i < currentQ ? (answers[i] ? 'bg-green-500' : 'bg-red-400') :
                i === currentQ ? 'bg-brand-500' : 'bg-surface-200'
              }`}
            />
          ))}
        </div>
        <div className={`text-xl font-bold ${isLow ? 'text-red-500' : 'text-surface-700'}`}>
          {timeLeft}s
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${(timeLeft / 60) * 100}%` }}
          className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-brand-500'}`}
        />
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl border border-surface-200 p-6"
      >
        <h2 className="text-lg font-bold text-surface-900 mb-5">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left px-4 py-3 rounded-xl border-2 border-surface-200 bg-surface-50 hover:bg-brand-50 hover:border-brand-300 text-surface-800 font-medium text-sm transition-all"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-surface-300 text-xs font-bold mr-3">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
