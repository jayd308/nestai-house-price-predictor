import Hero from "../components/Hero"
import Features from "../components/Features"
import Stats from "../components/Stats"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Bird } from "lucide-react"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="badge bg-nest-100 dark:bg-nest-900/50 text-nest-700 dark:text-nest-300 mb-3">
              <Bird className="w-3.5 h-3.5" />
              Get Started
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Ready to Find True Property Value?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-sm mx-auto">
              Join thousands of users who trust NestAI for accurate, data-driven house price predictions.
            </p>
            <Link to="/predict" className="btn-primary px-7 py-2.5 text-sm">
              Predict a Price
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
