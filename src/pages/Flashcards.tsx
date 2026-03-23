import { useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { flashcards, CATEGORY_LABELS, CATEGORY_COLORS, type Category, type Flashcard } from '../data/flashcards'
import { getProgress, saveProgress, updateStreak, addXP } from '../lib/storage'
import XPToast from '../components/XPToast'

export default function Flashcards() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [xpToast, setXpToast] = useState({ visible: false, amount: 0, reason: '' })
  const [masteredInSession, setMasteredInSession] = useState<Set<string>>(new Set())

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const leftOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0])
  const rightOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1])

  const filtered = flashcards.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false
    if (selectedDifficulty !== 'all' && c.difficulty !== selectedDifficulty) return false
    return true
  })

  const currentCard = filtered[currentIndex]

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      const progress = getProgress()
      let updated = updateStreak(progress)
      updated = { ...updated, flashcardsReviewed: updated.flashcardsReviewed + 1 }

      if (direction === 'right' && currentCard) {
        // Mastered
        if (!updated.flashcardsMastered.includes(currentCard.id)) {
          updated.flashcardsMastered = [...updated.flashcardsMastered, currentCard.id]
          updated = addXP(updated, 10)
          setXpToast({ visible: true, amount: 10, reason: 'Card mastered!' })
          setMasteredInSession((prev) => new Set([...prev, currentCard.id]))
        }
      } else if (direction === 'left') {
        updated = addXP(updated, 2)
      }

      // Update category progress
      if (currentCard) {
        const cat = currentCard.category
        const catProgress = updated.categoryProgress[cat] || { reviewed: 0, mastered: 0 }
        catProgress.reviewed += 1
        if (direction === 'right' && !progress.flashcardsMastered.includes(currentCard.id)) {
          catProgress.mastered += 1
        }
        updated.categoryProgress = { ...updated.categoryProgress, [cat]: catProgress }
      }

      saveProgress(updated)
      setIsFlipped(false)
      setCurrentIndex((prev) => (prev + 1) % filtered.length)
    },
    [currentCard, filtered.length]
  )

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe('right')
    } else if (info.offset.x < -100) {
      handleSwipe('left')
    }
  }

  const categories = Object.entries(CATEGORY_LABELS) as [Category, string][]
  const progress = getProgress()
  const masteredCount = progress.flashcardsMastered.length

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-surface-500">No cards match your filters.</p>
        <button
          onClick={() => { setSelectedCategory('all'); setSelectedDifficulty('all') }}
          className="mt-4 text-brand-600 font-medium hover:underline"
        >
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-surface-900">Flashcards</h1>
        <p className="text-sm text-surface-500 mt-1">
          Swipe right to master, left to review again
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-surface-900 text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
        >
          All ({flashcards.length})
        </button>
        {categories.map(([key, label]) => {
          const count = flashcards.filter((c) => c.category === key).length
          return (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); setCurrentIndex(0); setIsFlipped(false) }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === key
                  ? 'text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
              style={selectedCategory === key ? { backgroundColor: CATEGORY_COLORS[key] } : {}}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2 justify-center">
        {['all', 'beginner', 'intermediate', 'advanced'].map((d) => (
          <button
            key={d}
            onClick={() => { setSelectedDifficulty(d); setCurrentIndex(0); setIsFlipped(false) }}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
              selectedDifficulty === d
                ? 'bg-brand-500 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            {d === 'all' ? 'All Levels' : d}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 text-sm text-surface-500">
        <span>{masteredCount} / {flashcards.length} mastered</span>
        <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${(masteredCount / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative h-[340px] perspective flex items-center justify-center">
        {/* Swipe indicators */}
        <motion.div
          style={{ opacity: leftOpacity }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-red-100 text-red-600 px-3 py-1 rounded-lg font-bold text-sm"
        >
          Review Again
        </motion.div>
        <motion.div
          style={{ opacity: rightOpacity }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-green-100 text-green-600 px-3 py-1 rounded-lg font-bold text-sm"
        >
          Mastered ✓
        </motion.div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          whileDrag={{ scale: 1.02 }}
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full max-w-md h-[300px] cursor-pointer"
        >
          <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border-2 border-surface-200 shadow-lg p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: CATEGORY_COLORS[currentCard.category] }}
                  >
                    {CATEGORY_LABELS[currentCard.category]}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                    currentCard.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    currentCard.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentCard.difficulty}
                  </span>
                  {progress.flashcardsMastered.includes(currentCard.id) && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-surface-900 leading-relaxed">
                  {currentCard.front}
                </h2>
              </div>
              <p className="text-xs text-surface-400 text-center">Tap to flip • Swipe to rate</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-brand-50 to-orange-50 rounded-2xl border-2 border-brand-200 shadow-lg p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-3">Answer</div>
                <p className="text-surface-800 leading-relaxed">{currentCard.back}</p>
              </div>
              <p className="text-xs text-surface-400 text-center">Swipe right = mastered • Swipe left = review</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card counter */}
      <div className="text-center text-sm text-surface-500">
        Card {currentIndex + 1} of {filtered.length}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSwipe('left')}
          className="flex items-center gap-2 px-5 py-2.5 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl font-medium transition-colors"
        >
          ← Review Again
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl font-medium transition-colors"
        >
          Flip
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl font-medium transition-colors"
        >
          Mastered ✓ →
        </button>
      </div>

      <XPToast {...xpToast} onDone={() => setXpToast((prev) => ({ ...prev, visible: false }))} />
    </div>
  )
}
