import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://nestai-house-api.onrender.com",
  headers: { "Content-Type": "application/json" },
})

export const predictPrice = async (data) => {
  const response = await api.post("/predict", data)
  return response.data
}

export const getPredictions = async (params = {}) => {
  const response = await api.get("/predictions", { params })
  return response.data
}

export const deletePrediction = async (id) => {
  const response = await api.delete(`/predictions/${id}`)
  return response.data
}

export const healthCheck = async () => {
  const response = await api.get("/health")
  return response.data
}