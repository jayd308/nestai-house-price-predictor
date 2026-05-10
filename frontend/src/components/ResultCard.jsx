import { motion } from "framer-motion"
import { TrendingUp, ArrowRight, Bird } from "lucide-react"
import { Link } from "react-router-dom"

export default function ResultCard({ result, input }) {
  if (!result) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="card p-7 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <div className="w-10 h-10 rounded-xl bg-nest-100 dark:bg-nest-900/50 flex items-center justify-center mx-auto mb-3">
          <Bird className="w-4 h-4 text-nest-600 dark:text-nest-400" />
        </div>

        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          Estimated Fair Market Price
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {result.formatted_price} <span className="text-base font-normal text-gray-400">{result.currency}</span>
        </h2>

        <div className="flex items-center justify-center gap-1.5 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] text-gray-500 dark:text-gray-400">AI-based market estimation from real data</span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3.5 text-left space-y-1 mb-5">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-gray-100">{input.bedrooms}</span> bed ·{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">{input.bathrooms}</span> bath ·{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">{input.area}</span> sq. ft.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {input.city} · {input.furnishing} · {input.age} years old
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-nest-600 dark:text-nest-400 hover:text-nest-700 dark:hover:text-nest-300 font-medium transition-colors"
        >
          View prediction history
          <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
