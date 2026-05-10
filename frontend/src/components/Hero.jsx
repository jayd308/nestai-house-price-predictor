import { Link } from "react-router-dom"
import { ArrowRight, TrendingUp, Shield, Zap, Bird } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-nest-50 via-white to-blue-50 dark:from-gray-950 dark:via-nest-950 dark:to-gray-950" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-nest-200/20 dark:bg-nest-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-nest-100/10 to-blue-100/10 dark:from-nest-900/5 dark:to-blue-900/5 rounded-full blur-3xl" />

        <motion.div
          className="absolute top-20 right-1/4 w-4 h-4 rounded-full bg-nest-400/30"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full bg-blue-400/30"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-purple-400/30"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="badge bg-nest-100 dark:bg-nest-900/50 text-nest-700 dark:text-nest-300 mb-6">
            <Bird className="w-3.5 h-3.5" />
            NestAI — Smart Real Estate Intelligence
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-5 leading-[1.1]"
        >
          Predict Real Estate Prices
          <br />
          <span className="gradient-text">Instantly with AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          NestAI helps you find the true market value of any property 
          using advanced machine learning. Accurate, instant, and data-driven.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/predict" className="btn-primary px-7 py-3 text-sm">
            Start Prediction
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/dashboard" className="btn-secondary px-7 py-3 text-sm">
            View Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { icon: TrendingUp, value: "99%", label: "Accuracy Rate" },
            { icon: Shield, value: "15", label: "Data Points" },
            { icon: Zap, value: "< 1s", label: "Prediction Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-8 h-8 rounded-lg bg-nest-100 dark:bg-nest-900/50 flex items-center justify-center mx-auto mb-2">
                <stat.icon className="w-4 h-4 text-nest-600 dark:text-nest-400" />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
