import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp, Home, DollarSign, BarChart3, Search, Trash2, Calendar, Bird,
} from "lucide-react"
import { getPredictions, deletePrediction } from "../services/api"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Dashboard() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, totalValue: 0 })

  const fetchData = async () => {
    try {
      const data = await getPredictions({ limit: 100, search })
      setPredictions(data.predictions || [])
      const prices = (data.predictions || []).map((p) => p.predicted_price)
      setStats({
        total: data.total || 0,
        avgPrice: prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
        totalValue: prices.reduce((a, b) => a + b, 0),
      })
    } catch {
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [search])

  const handleDelete = async (id) => {
    await deletePrediction(id)
    fetchData()
  }

  const statCards = [
    { icon: BarChart3, label: "Total Predictions", value: stats.total.toString() },
    { icon: DollarSign, label: "Average Price", value: `${Math.round(stats.avgPrice).toLocaleString()} RWF` },
    { icon: TrendingUp, label: "Total Value", value: `${Math.round(stats.totalValue).toLocaleString()} RWF` },
    { icon: Home, label: "Properties Analyzed", value: stats.total.toString() },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">Dashboard</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Overview of all predictions and statistics</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="card p-4"
          >
            <div className="w-8 h-8 rounded-lg bg-nest-100 dark:bg-nest-900/50 flex items-center justify-center mb-2.5">
              <card.icon className="w-4 h-4 text-nest-600 dark:text-nest-400" />
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-0.5">{card.value}</div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Prediction History</h2>
            <div className="relative w-full sm:w-52">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs focus:border-nest-500 focus:ring-2 focus:ring-nest-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-12"><LoadingSpinner size="lg" /></div>
        ) : predictions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Bird className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">No predictions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 uppercase tracking-wider">Area</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 uppercase tracking-wider">Beds</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 uppercase tracking-wider">Baths</th>
                  <th className="text-right py-2.5 px-3 font-medium text-gray-500 uppercase tracking-wider">Price (RWF)</th>
                  <th className="py-2.5 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.008 }}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                    <td className="py-2.5 px-3 font-medium text-gray-900 dark:text-gray-100">{p.input?.city || "-"}</td>
                    <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{p.input?.area || "-"}</td>
                    <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{p.input?.bedrooms || "-"}</td>
                    <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{p.input?.bathrooms || "-"}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                      {Math.round(p.predicted_price).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
