import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getProgress, getLevelName } from '../lib/storage'

interface LayoutProps {
  children: ReactNode
}

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/flashcards', label: 'Flashcards', icon: '🃏' },
  { path: '/quiz', label: 'Quiz', icon: '❓' },
  { path: '/scenarios', label: 'Scenarios', icon: '🎭' },
  { path: '/daily-challenge', label: 'Daily Challenge', icon: '⚡' },
  { path: '/progress', label: 'Progress', icon: '📊' },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const progress = getProgress()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="font-bold text-lg text-surface-900 hidden sm:block">
                Speaking Confidently
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-surface-700 hover:bg-surface-100'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* XP Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200">
                <span className="text-xs font-semibold text-brand-700">
                  Lvl {progress.level}
                </span>
                <span className="text-xs text-brand-500">
                  {progress.xp} XP
                </span>
              </div>
              {progress.streak > 0 && (
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-red-50 border border-red-200">
                  <span className="text-xs">🔥</span>
                  <span className="text-xs font-semibold text-red-600">{progress.streak}</span>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-surface-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-surface-200 bg-white px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-surface-700 hover:bg-surface-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-surface-500">
          Speaking Confidently — Master your voice, own the room.
        </div>
      </footer>
    </div>
  )
}
