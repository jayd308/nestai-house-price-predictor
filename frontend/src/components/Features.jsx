import { motion } from "framer-motion"
import { Brain, BarChart3, Globe, Users, Sparkles, Shield, Bird } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    desc: "Advanced machine learning model trained on thousands of real estate transactions for highly accurate price predictions.",
  },
  {
    icon: BarChart3,
    title: "15 Key Factors",
    desc: "We analyze everything from location and size to amenities and condition for comprehensive property valuation.",
  },
  {
    icon: Globe,
    title: "Local Market Focus",
    desc: "Specialized for the Rwandan real estate market with regional price data and local market intelligence.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    desc: "Whether you're a buyer, seller, or agent, get unbiased price estimates to make informed decisions.",
  },
  {
    icon: Sparkles,
    title: "Instant Results",
    desc: "Get predictions in milliseconds with our optimized inference engine. No waiting, no hassle.",
  },
  {
    icon: Shield,
    title: "Transparent & Fair",
    desc: "Data-driven estimates eliminate bias and guesswork, ensuring fair market valuations every time.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function Features() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="badge bg-nest-100 dark:bg-nest-900/50 text-nest-700 dark:text-nest-300 mb-3">
            <Bird className="w-3.5 h-3.5" />
            Why NestAI?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Smart Features for Smart Decisions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Everything you need to make confident real estate decisions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="card-hover p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-nest-100 dark:bg-nest-900/50 flex items-center justify-center mb-3">
                <feature.icon className="w-4.5 h-4.5 text-nest-600 dark:text-nest-400" style={{ width: 18, height: 18 }} />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
