import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface XPToastProps {
  amount: number
  reason: string
  visible: boolean
  onDone: () => void
}

export default function XPToast({ amount, reason, visible, onDone }: XPToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDone, 2000)
      return () => clearTimeout(timer)
    }
  }, [visible, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-[100] bg-brand-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3"
        >
          <span className="text-2xl">⚡</span>
          <div>
            <div className="font-bold text-lg">+{amount} XP</div>
            <div className="text-sm text-brand-100">{reason}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
