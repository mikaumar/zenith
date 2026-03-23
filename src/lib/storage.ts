export interface UserProgress {
  xp: number
  level: number
  streak: number
  lastActiveDate: string
  flashcardsReviewed: number
  flashcardsMastered: string[]
  quizzesTaken: number
  quizHighScore: number
  scenariosPracticed: number
  dailyChallengesCompleted: number
  lastDailyChallengeDate: string
  categoryProgress: Record<string, { reviewed: number; mastered: number }>
}

const STORAGE_KEY = 'speaking-confidently-progress'

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: '',
  flashcardsReviewed: 0,
  flashcardsMastered: [],
  quizzesTaken: 0,
  quizHighScore: 0,
  scenariosPracticed: 0,
  dailyChallengesCompleted: 0,
  lastDailyChallengeDate: '',
  categoryProgress: {},
}

export function getProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { ...DEFAULT_PROGRESS }
    return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  if (progress.lastActiveDate === today) {
    return progress
  }

  const newStreak = progress.lastActiveDate === yesterday
    ? progress.streak + 1
    : 1

  return {
    ...progress,
    streak: newStreak,
    lastActiveDate: today,
  }
}

export function addXP(progress: UserProgress, amount: number): UserProgress {
  const newXP = progress.xp + amount
  const newLevel = calculateLevel(newXP)
  return { ...progress, xp: newXP, level: newLevel }
}

function calculateLevel(xp: number): number {
  // Each level requires progressively more XP
  // Level 1: 0, Level 2: 100, Level 3: 250, Level 4: 450, etc.
  const thresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000]
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) return i + 1
  }
  return 1
}

export const LEVEL_NAMES: Record<number, string> = {
  1: 'Beginner',
  2: 'Warming Up',
  3: 'Finding Voice',
  4: 'Getting Fluent',
  5: 'Confident',
  6: 'Articulate',
  7: 'Compelling',
  8: 'Commanding',
  9: 'Masterful',
  10: 'Orator',
  11: 'Legendary',
}

export function getLevelName(level: number): string {
  return LEVEL_NAMES[level] || 'Legendary'
}

export function getXPForNextLevel(level: number): number {
  const thresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000]
  return thresholds[level] || thresholds[thresholds.length - 1]
}

export function canDoDailyChallenge(progress: UserProgress): boolean {
  const today = new Date().toISOString().split('T')[0]
  return progress.lastDailyChallengeDate !== today
}
