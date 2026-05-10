import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send, RotateCcw, Bird, MapPin, Building, Ruler, BedDouble,
  Bath, Layers, Car, Calendar, CheckSquare, Square, Droplets,
  Wind, Users, Star
} from "lucide-react"
import { predictPrice } from "../services/api"
import ResultCard from "./ResultCard"
import LoadingSpinner from "./LoadingSpinner"

const cities = ["Kigali", "Butare", "Gisenyi", "Ruhengeri", "Muhanga", "Nyagatare"]
const furnishingOptions = ["Furnished", "Semi-Furnished", "Unfurnished"]
const tenantOptions = ["Family", "Bachelor", "Working Professional", "Student"]
const yesNo = ["Yes", "No"]

const defaultForm = {
  area: "", bedrooms: "", bathrooms: "", stories: "", parking: "", age: "",
  city: "Kigali", furnishing: "Furnished", main_road: "Yes", guest_room: "No",
  basement: "No", water_supply: "Yes", air_conditioning: "No",
  preferred_tenant: "Family", locality_rating: "3",
}

const fields = {
  property: [
    { name: "area", label: "Area (sq. ft.)", icon: Ruler, type: "number", placeholder: "e.g. 1500", min: 100 },
    { name: "bedrooms", label: "Bedrooms", icon: BedDouble, type: "number", placeholder: "e.g. 3", min: 1, max: 10 },
    { name: "bathrooms", label: "Bathrooms", icon: Bath, type: "number", placeholder: "e.g. 2", min: 1, max: 10 },
    { name: "stories", label: "Stories", icon: Layers, type: "number", placeholder: "e.g. 2", min: 1, max: 5 },
    { name: "parking", label: "Parking Spaces", icon: Car, type: "number", placeholder: "e.g. 1", min: 0, max: 5 },
    { name: "age", label: "House Age (years)", icon: Calendar, type: "number", placeholder: "e.g. 5", min: 0, max: 100 },
  ],
  location: [
    { name: "city", label: "City", icon: MapPin, type: "select", options: cities },
    { name: "locality_rating", label: "Locality Rating", icon: Star, type: "number", placeholder: "1-5", min: 1, max: 5 },
  ],
  amenities: [
    { name: "furnishing", label: "Furnishing", icon: Building, type: "select", options: furnishingOptions },
    { name: "main_road", label: "Main Road Access", icon: CheckSquare, type: "select", options: yesNo },
    { name: "guest_room", label: "Guest Room", icon: Square, type: "select", options: yesNo },
    { name: "basement", label: "Basement", icon: Building, type: "select", options: yesNo },
    { name: "water_supply", label: "Water Supply", icon: Droplets, type: "select", options: yesNo },
    { name: "air_conditioning", label: "Air Conditioning", icon: Wind, type: "select", options: yesNo },
    { name: "preferred_tenant", label: "Preferred Tenant", icon: Users, type: "select", options: tenantOptions },
  ],
}

export default function PredictionForm() {
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError("")
    try {
      const payload = {
        ...form,
        area: parseFloat(form.area), bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms), stories: parseInt(form.stories),
        parking: parseInt(form.parking), age: parseInt(form.age),
        locality_rating: parseInt(form.locality_rating),
      }
      const data = await predictPrice(payload)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(defaultForm)
    setResult(null)
    setError("")
  }

  const renderField = (field) => {
    const value = form[field.name]
    const common = `input-field ${field.type === "select" ? "appearance-none" : ""}`

    if (field.type === "select") {
      return (
        <select name={field.name} value={value} onChange={handleChange} className={common}>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      )
    }
    return (
      <input
        type={field.type} name={field.name} value={value} onChange={handleChange}
        required min={field.min} max={field.max} placeholder={field.placeholder}
        className={common}
      />
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="badge bg-nest-100 dark:bg-nest-900/50 text-nest-700 dark:text-nest-300 mb-3">
          <Bird className="w-3.5 h-3.5" />
          NestAI Price Estimator
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1.5">
          Enter Property Details
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill in the information below for an accurate AI-powered price estimate
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 card p-5 sm:p-6 space-y-6"
        >
          {Object.entries(fields).map(([groupName, groupFields]) => (
            <div key={groupName}>
              <h3 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                {groupName === "property" ? "Property Details" : groupName === "location" ? "Location" : "Amenities & Features"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {groupFields.map((field) => (
                  <div key={field.name}>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      <field.icon className="w-3 h-3 text-gray-400" />
                      {field.label}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-2.5 pt-1">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5 text-sm">
              {loading ? <LoadingSpinner size="sm" /> : <><Send className="w-3.5 h-3.5" /> Predict Price</>}
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary px-3.5 py-2.5">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.form>

        <div className="lg:col-span-2 lg:sticky lg:top-20">
          <AnimatePresence mode="wait">
            {result ? (
              <ResultCard key="result" result={result} input={form} />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="card p-7 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-nest-100 dark:bg-nest-900/50 flex items-center justify-center mx-auto mb-3">
                  <Bird className="w-5 h-5 text-nest-600 dark:text-nest-400" />
                </div>
                <h3 className="text-sm font-semibold mb-1">Ready to Estimate</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Complete the form and click "Predict Price" to get your instant AI valuation.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
