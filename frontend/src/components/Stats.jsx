import { motion } from "framer-motion"
import { Home, TrendingUp, DollarSign, Building } from "lucide-react"

const stats = [
  { icon: Home, value: "15K+", label: "Properties Analyzed" },
  { icon: TrendingUp, value: "99%", label: "Accuracy Rate" },
  { icon: DollarSign, value: "1B+", label: "RWF Value Predicted" },
  { icon: Building, value: "50+", label: "Cities Covered" },
]

export default function Stats() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="card p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                className="text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-nest-100 dark:bg-nest-900/50 flex items-center justify-center mx-auto mb-2.5">
                  <stat.icon className="w-4.5 h-4.5 text-nest-600 dark:text-nest-400" style={{ width: 18, height: 18 }} />
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
