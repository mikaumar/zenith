import { motion } from 'framer-motion'
import { getProgress, getLevelName, getXPForNextLevel, LEVEL_NAMES } from '../lib/storage'
import { flashcards, CATEGORY_LABELS, CATEGORY_COLORS, type Category } from '../data/flashcards'
import ProgressRing from '../components/ProgressRing'

export default function Progress() {
  const progress = getProgress()
  const nextLevelXP = getXPForNextLevel(progress.level)
  const currentLevelXP = getXPForNextLevel(progress.level - 1)
  const levelProgress = nextLevelXP > currentLevelXP
    ? ((progress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    : 100

  // Category mastery
  const categories = Object.keys(CATEGORY_LABELS) as Category[]
  const categoryMastery = categories.map((cat) => {
    const total = flashcards.filter((c) => c.category === cat).length
    const mastered = flashcards.filter(
      (c) => c.category === cat && progress.flashcardsMastered.includes(c.id)
    ).length
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      color: CATEGORY_COLORS[cat],
      total,
      mastered,
      percentage: total > 0 ? (mastered / total) * 100 : 0,
    }
  })

  const totalMastered = progress.flashcardsMastered.length
  const overallMastery = (totalMastered / flashcards.length) * 100

  // Milestones
  const milestones = [
    { label: 'First Card', xp: 10, icon: '🃏', reached: progress.flashcardsReviewed >= 1 },
    { label: 'First Quiz', xp: 50, icon: '❓', reached: progress.quizzesTaken >= 1 },
    { label: 'First Scenario', xp: 100, icon: '🎭', reached: progress.scenariosPracticed >= 1 },
    { label: '3-Day Streak', xp: 200, icon: '🔥', reached: progress.streak >= 3 },
    { label: '10 Cards Mastered', xp: 300, icon: '⭐', reached: totalMastered >= 10 },
    { label: '5 Quizzes', xp: 500, icon: '🧠', reached: progress.quizzesTaken >= 5 },
    { label: '7-Day Streak', xp: 700, icon: '💪', reached: progress.streak >= 7 },
    { label: 'Quiz High Score 10', xp: 1000, icon: '🏆', reached: progress.quizHighScore >= 10 },
    { label: 'All Cards Mastered', xp: 2000, icon: '👑', reached: totalMastered >= flashcards.length },
    { label: '30-Day Streak', xp: 3000, icon: '🌟', reached: progress.streak >= 30 },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-surface-900">Your Progress</h1>
        <p className="text-sm text-surface-500 mt-1">Track your speaking journey</p>
      </div>

      {/* Level Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium text-brand-100">Level {progress.level}</div>
            <div className="text-2xl font-bold">{getLevelName(progress.level)}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold">{progress.xp}</div>
            <div className="text-sm text-brand-200">Total XP</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-brand-200">
            <span>Level {progress.level}</span>
            <span>Level {progress.level + 1}</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(levelProgress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <div className="text-xs text-brand-200 text-right">
            {nextLevelXP - progress.xp} XP to next level
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Streak', value: `${progress.streak} days`, icon: '🔥' },
          { label: 'Cards Reviewed', value: progress.flashcardsReviewed, icon: '🃏' },
          { label: 'Quizzes Taken', value: progress.quizzesTaken, icon: '❓' },
          { label: 'Quiz Best', value: `${progress.quizHighScore}/10`, icon: '🏆' },
          { label: 'Scenarios Done', value: progress.scenariosPracticed, icon: '🎭' },
          { label: 'Daily Challenges', value: progress.dailyChallengesCompleted, icon: '⚡' },
          { label: 'Cards Mastered', value: `${totalMastered}/${flashcards.length}`, icon: '✅' },
          { label: 'Overall Mastery', value: `${Math.round(overallMastery)}%`, icon: '📊' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="bg-white rounded-xl border border-surface-200 p-4 text-center"
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold text-surface-900">{stat.value}</div>
            <div className="text-xs text-surface-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Category Mastery */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="text-lg font-bold text-surface-900 mb-4">Category Mastery</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-6">
          {categoryMastery.map((cat) => (
            <ProgressRing
              key={cat.category}
              progress={cat.percentage}
              color={cat.color}
              label={cat.label.split(' ')[0]}
              size={64}
              strokeWidth={5}
            />
          ))}
        </div>

        <div className="space-y-3">
          {categoryMastery.map((cat) => (
            <div key={cat.category} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-surface-700 flex-1">{cat.label}</span>
              <span className="text-sm text-surface-500">
                {cat.mastered}/{cat.total}
              </span>
              <div className="w-24 h-2 bg-surface-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="text-lg font-bold text-surface-900 mb-4">Milestones</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {milestones.map((m) => (
            <div
              key={m.label}
              className={`text-center p-3 rounded-xl border ${
                m.reached
                  ? 'bg-brand-50 border-brand-200'
                  : 'bg-surface-50 border-surface-200 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-xs font-medium text-surface-700">{m.label}</div>
              {m.reached && (
                <div className="text-xs text-green-600 font-medium mt-1">✓ Earned</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Level Guide */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="text-lg font-bold text-surface-900 mb-4">Level Guide</h2>
        <div className="space-y-2">
          {Object.entries(LEVEL_NAMES).map(([lvl, name]) => {
            const level = parseInt(lvl)
            const isCurrentLevel = level === progress.level
            return (
              <div
                key={lvl}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isCurrentLevel ? 'bg-brand-50 border border-brand-200' :
                  level < progress.level ? 'text-surface-400' : ''
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isCurrentLevel ? 'bg-brand-500 text-white' :
                  level < progress.level ? 'bg-green-100 text-green-600' :
                  'bg-surface-100 text-surface-400'
                }`}>
                  {level < progress.level ? '✓' : lvl}
                </span>
                <span className={`text-sm font-medium ${isCurrentLevel ? 'text-brand-700' : ''}`}>
                  {name}
                </span>
                {isCurrentLevel && (
                  <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded-full ml-auto">
                    You are here
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              localStorage.removeItem('speaking-confidently-progress')
              window.location.reload()
            }
          }}
          className="text-xs text-surface-400 hover:text-red-500 transition-colors"
        >
          Reset all progress
        </button>
      </div>
    </div>
  )
}
