import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProgress, getLevelName, getXPForNextLevel } from '../lib/storage'
import { flashcards } from '../data/flashcards'
import { quizQuestions } from '../data/quiz-questions'
import { scenarios } from '../data/scenarios'

const FEATURES = [
  {
    path: '/flashcards',
    icon: '🃏',
    title: 'Flashcards',
    description: 'Swipe through speaking frameworks, techniques, and tips with spaced repetition.',
    count: `${flashcards.length} cards`,
    color: 'from-orange-400 to-orange-600',
  },
  {
    path: '/quiz',
    icon: '❓',
    title: 'Quiz',
    description: 'Test your knowledge with adaptive quizzes across 8 categories.',
    count: `${quizQuestions.length} questions`,
    color: 'from-blue-400 to-blue-600',
  },
  {
    path: '/scenarios',
    icon: '🎭',
    title: 'Practice Scenarios',
    description: 'Real-world impromptu prompts with timers. Meetings, interviews, tough situations.',
    count: `${scenarios.length} scenarios`,
    color: 'from-purple-400 to-purple-600',
  },
  {
    path: '/daily-challenge',
    icon: '⚡',
    title: 'Daily Challenge',
    description: '5 questions in 60 seconds. One attempt per day. Build your streak.',
    count: 'New daily',
    color: 'from-red-400 to-red-600',
  },
]

// Daily tip rotation
const DAILY_TIPS = [
  { tip: 'Replace every "um" with a 1-second pause today.', category: 'Voice' },
  { tip: 'Before your next meeting, do 4 cycles of box breathing.', category: 'Anxiety' },
  { tip: 'In your next response, use the PREP framework.', category: 'Frameworks' },
  { tip: 'Make eye contact with one person for a full 5 seconds today.', category: 'Body Language' },
  { tip: 'Tell a story using the 3 C\'s: Character, Conflict, Change.', category: 'Storytelling' },
  { tip: 'State your conclusion first in your next email or message.', category: 'Articulation' },
  { tip: 'Practice one tongue twister 5 times before your first call.', category: 'Articulation' },
  { tip: 'Open your next conversation with a question, not a statement.', category: 'Advanced' },
  { tip: 'Volunteer an answer in your next meeting — don\'t wait to be asked.', category: 'Impromptu' },
  { tip: 'Record yourself for 60 seconds. Watch it. Notice one strength.', category: 'Practice' },
]

export default function Home() {
  const progress = getProgress()
  const dayIndex = Math.floor(Date.now() / 86400000) % DAILY_TIPS.length
  const dailyTip = DAILY_TIPS[dayIndex]
  const nextLevelXP = getXPForNextLevel(progress.level)
  const currentLevelXP = getXPForNextLevel(progress.level - 1)
  const levelProgress = nextLevelXP > currentLevelXP
    ? ((progress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    : 100

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-surface-900 mb-3">
          Speak with <span className="gradient-text">Confidence</span>
        </h1>
        <p className="text-lg text-surface-600 max-w-2xl mx-auto">
          Master impromptu speaking, articulation, and delivery through
          interactive flashcards, quizzes, and real-world practice scenarios.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: 'Level', value: `${progress.level} — ${getLevelName(progress.level)}` },
          { label: 'Total XP', value: progress.xp.toLocaleString() },
          { label: 'Streak', value: `${progress.streak} day${progress.streak !== 1 ? 's' : ''}` },
          { label: 'Cards Mastered', value: progress.flashcardsMastered.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-surface-200 p-4 text-center">
            <div className="text-xs font-medium text-surface-500 uppercase tracking-wider">{stat.label}</div>
            <div className="text-lg font-bold text-surface-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-xl border border-surface-200 p-4"
      >
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-surface-700">Level {progress.level}: {getLevelName(progress.level)}</span>
          <span className="text-surface-500">{progress.xp} / {nextLevelXP} XP</span>
        </div>
        <div className="w-full h-3 bg-surface-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(levelProgress, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-brand-50 to-orange-50 rounded-xl border border-brand-200 p-5"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
              Today's Challenge — {dailyTip.category}
            </div>
            <p className="text-surface-800 font-medium">{dailyTip.tip}</p>
          </div>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
          >
            <Link
              to={feature.path}
              className="block bg-white rounded-xl border border-surface-200 p-6 hover:shadow-lg hover:border-brand-300 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{feature.icon}</span>
                <span className="text-xs font-medium text-surface-500 bg-surface-100 px-2 py-1 rounded-full">
                  {feature.count}
                </span>
              </div>
              <h3 className="text-lg font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-600 mt-1">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-6"
      >
        <Link
          to="/flashcards"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg hover:shadow-xl"
        >
          Start Practicing
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}
