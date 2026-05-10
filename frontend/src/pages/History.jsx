import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Trash2, Calendar, Bird } from "lucide-react"
import { getPredictions, deletePrediction } from "../services/api"
import LoadingSpinner from "../components/LoadingSpinner"

export default function History() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const limit = 20

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getPredictions({ limit, skip: page * limit, search })
      setPredictions(data.predictions || [])
      setTotal(data.total || 0)
    } catch {
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [page, search])

  const handleDelete = async (id) => {
    await deletePrediction(id)
    fetchData()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">Prediction History</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Browse all your past price predictions</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}>
        <div className="card">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="relative w-full sm:w-52">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search predictions..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0) }}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs focus:border-nest-500 focus:ring-2 focus:ring-nest-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-12"><LoadingSpinner size="lg" /></div>
          ) : predictions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bird className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">No predictions found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {predictions.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.008 }}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {Math.round(p.predicted_price).toLocaleString()} RWF
                      </span>
                      <span className="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {p.input?.city || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(p.created_at).toLocaleDateString()}
                      </span>
                      <span>{p.input?.bedrooms || "?"} bed</span>
                      <span>{p.input?.bathrooms || "?"} bath</span>
                      <span>{p.input?.area || "?"} sq. ft.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-1.5 rounded text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {total > limit && (
            <div className="flex items-center justify-center gap-2 px-4 py-3.5 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="btn-secondary text-[11px] px-3.5 py-1.5"
              >
                Previous
              </button>
              <span className="text-[11px] text-gray-500 px-2">
                Page {page + 1} of {Math.ceil(total / limit)}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={(page + 1) * limit >= total}
                className="btn-secondary text-[11px] px-3.5 py-1.5"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
