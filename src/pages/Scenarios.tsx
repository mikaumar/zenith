import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scenarios, SCENARIO_CATEGORIES, type Scenario } from '../data/scenarios'
import { getProgress, saveProgress, updateStreak, addXP } from '../lib/storage'
import XPToast from '../components/XPToast'

type ScenarioState = 'browse' | 'prepare' | 'speaking' | 'review'

export default function Scenarios() {
  const [state, setState] = useState<ScenarioState>('browse')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showExample, setShowExample] = useState(false)
  const [xpToast, setXpToast] = useState({ visible: false, amount: 0, reason: '' })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const filtered = selectedCategory === 'all'
    ? scenarios
    : scenarios.filter((s) => s.category === selectedCategory)

  const startScenario = (scenario: Scenario) => {
    setActiveScenario(scenario)
    setShowExample(false)
    setState('prepare')
  }

  const startSpeaking = () => {
    if (!activeScenario) return
    setTimeLeft(activeScenario.timeLimit)
    setState('speaking')
  }

  useEffect(() => {
    if (state === 'speaking' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            setState('review')
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }
  }, [state, timeLeft])

  const finishSpeaking = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setState('review')

    const progress = getProgress()
    let updated = updateStreak(progress)
    updated = { ...updated, scenariosPracticed: updated.scenariosPracticed + 1 }
    updated = addXP(updated, 15)
    saveProgress(updated)
    setXpToast({ visible: true, amount: 15, reason: 'Scenario practiced!' })
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const categoryEntries = Object.entries(SCENARIO_CATEGORIES)

  // Browse
  if (state === 'browse') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-900">Practice Scenarios</h1>
          <p className="text-sm text-surface-500 mt-1">
            Real-world impromptu prompts with suggested frameworks and timers
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              selectedCategory === 'all' ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-600'
            }`}
          >
            All ({scenarios.length})
          </button>
          {categoryEntries.map(([key, { label, color }]) => {
            const count = scenarios.filter((s) => s.category === key).length
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  selectedCategory === key ? 'text-white' : 'bg-surface-100 text-surface-600'
                }`}
                style={selectedCategory === key ? { backgroundColor: color } : {}}
              >
                {label} ({count})
              </button>
            )
          })}
        </div>

        {/* Scenario cards */}
        <div className="grid gap-3">
          {filtered.map((scenario, i) => {
            const cat = SCENARIO_CATEGORIES[scenario.category]
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <button
                  onClick={() => startScenario(scenario)}
                  className="w-full text-left bg-white rounded-xl border border-surface-200 p-5 hover:shadow-md hover:border-brand-300 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {cat.label}
                        </span>
                        <span className="text-xs text-surface-500">{scenario.timeLimit}s</span>
                      </div>
                      <p className="font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                        {scenario.prompt}
                      </p>
                      <p className="text-sm text-surface-500 mt-1">{scenario.context}</p>
                    </div>
                    <svg className="w-5 h-5 text-surface-400 group-hover:text-brand-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!activeScenario) return null

  const cat = SCENARIO_CATEGORIES[activeScenario.category]

  // Prepare
  if (state === 'prepare') {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <button
          onClick={() => setState('browse')}
          className="text-sm text-surface-500 hover:text-surface-700 flex items-center gap-1"
        >
          ← Back to scenarios
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-surface-200 p-6 space-y-5"
        >
          <div>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: cat.color }}
            >
              {cat.label}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-surface-900 mb-2">{activeScenario.prompt}</h2>
            <p className="text-surface-600">{activeScenario.context}</p>
          </div>

          <div className="bg-brand-50 rounded-xl p-4 border border-brand-200">
            <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
              Suggested Framework
            </div>
            <p className="font-medium text-surface-800">{activeScenario.suggestedFramework}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Tips</div>
            <ul className="space-y-1.5">
              {activeScenario.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-surface-700">
                  <span className="text-brand-500 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {activeScenario.timeLimit} seconds
            </div>
          </div>

          <button
            onClick={startSpeaking}
            className="w-full py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all text-lg"
          >
            Start Speaking
          </button>
        </motion.div>
      </div>
    )
  }

  // Speaking
  if (state === 'speaking') {
    const percentage = (timeLeft / activeScenario.timeLimit) * 100
    const isLow = timeLeft <= 10

    return (
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-surface-200 p-8 space-y-6"
        >
          <div className={`text-6xl font-extrabold ${isLow ? 'text-red-500' : 'gradient-text'}`}>
            {formatTime(timeLeft)}
          </div>

          <div className="w-full h-3 bg-surface-100 rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${percentage}%` }}
              className={`h-full rounded-full transition-colors ${isLow ? 'bg-red-500' : 'bg-brand-500'}`}
            />
          </div>

          <div className="bg-surface-50 rounded-xl p-6">
            <p className="text-xl font-bold text-surface-900">{activeScenario.prompt}</p>
            <p className="text-sm text-surface-500 mt-2">
              Use: <span className="font-medium text-brand-600">{activeScenario.suggestedFramework}</span>
            </p>
          </div>

          <button
            onClick={finishSpeaking}
            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            Done Speaking ✓
          </button>
        </motion.div>
      </div>
    )
  }

  // Review
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-surface-200 p-6 space-y-5"
      >
        <div className="text-center">
          <div className="text-4xl mb-3">🎤</div>
          <h2 className="text-xl font-bold text-surface-900">Great Practice!</h2>
          <p className="text-sm text-surface-500 mt-1">Review how you did</p>
        </div>

        <div className="bg-surface-50 rounded-xl p-4">
          <p className="font-medium text-surface-800 mb-1">{activeScenario.prompt}</p>
          <p className="text-sm text-surface-500">{activeScenario.context}</p>
        </div>

        {/* Self-evaluation */}
        <div>
          <div className="text-sm font-semibold text-surface-700 mb-2">How did it go?</div>
          <div className="grid grid-cols-3 gap-2">
            {['Needs Work', 'Good', 'Nailed It'].map((label, i) => (
              <button
                key={label}
                className={`py-2 px-3 rounded-xl text-sm font-medium border transition-colors ${
                  i === 0 ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100' :
                  i === 1 ? 'border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100' :
                  'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {['😤', '👍', '🔥'][i]} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Example response */}
        <div>
          <button
            onClick={() => setShowExample(!showExample)}
            className="text-sm text-brand-600 font-medium hover:underline flex items-center gap-1"
          >
            {showExample ? 'Hide' : 'Show'} example response
            <svg className={`w-4 h-4 transition-transform ${showExample ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {showExample && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Example Response</div>
                  <p className="text-sm text-blue-800 italic">"{activeScenario.exampleResponse}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setState('prepare'); setShowExample(false) }}
            className="flex-1 py-2.5 bg-surface-100 text-surface-700 font-medium rounded-xl hover:bg-surface-200"
          >
            Try Again
          </button>
          <button
            onClick={() => { setState('browse'); setActiveScenario(null); setShowExample(false) }}
            className="flex-1 py-2.5 bg-brand-500 text-white font-medium rounded-xl hover:bg-brand-600"
          >
            More Scenarios
          </button>
        </div>
      </motion.div>
      <XPToast {...xpToast} onDone={() => setXpToast((prev) => ({ ...prev, visible: false }))} />
    </div>
  )
}
