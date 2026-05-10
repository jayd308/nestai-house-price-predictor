import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { dark, toggle } = useContext(ThemeContext)

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 text-amber-500 dark:hidden" />
      <Moon className="w-4 h-4 text-blue-400 hidden dark:block" />
    </button>
  )
}
