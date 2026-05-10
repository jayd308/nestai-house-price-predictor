import { Link, useLocation } from "react-router-dom"
import { Home, LineChart, LayoutDashboard, History, X, Bird } from "lucide-react"

const sidebarLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/predict", label: "Predict", icon: LineChart },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/history", label: "History", icon: History },
]

export default function Sidebar({ open, onClose }) {
  const location = useLocation()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                <Bird className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight">Nest<span className="text-nest-600">AI</span></span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-0.5">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-nest-50 dark:bg-nest-950 text-nest-600 dark:text-nest-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
