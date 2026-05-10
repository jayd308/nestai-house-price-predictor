import { Link } from "react-router-dom"
import { Bird, MessageCircle, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4l11.733 16h4.267l-11.733-16z" />
    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
  </svg>
)

const socialLinks = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/250795453115",
    label: "+250 795 453 115",
    hoverColor: "group-hover:text-emerald-400",
    hoverBorder: "group-hover:border-emerald-500/40",
    hoverShadow: "group-hover:shadow-emerald-500/20",
    bgGlow: "group-hover:bg-emerald-500/10",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/jayd3_12/",
    label: "@jayd3_12",
    hoverColor: "group-hover:text-pink-400",
    hoverBorder: "group-hover:border-pink-500/40",
    hoverShadow: "group-hover:shadow-pink-500/20",
    bgGlow: "group-hover:bg-pink-500/10",
  },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/nshimiyimana-jean-damour-67a721316/",
    label: "Jean Damour",
    hoverColor: "group-hover:text-blue-400",
    hoverBorder: "group-hover:border-blue-500/40",
    hoverShadow: "group-hover:shadow-blue-500/20",
    bgGlow: "group-hover:bg-blue-500/10",
  },
  {
    name: "X (Twitter)",
    icon: XIcon,
    href: "https://x.com/jeandamour157",
    label: "@jeandamour157",
    hoverColor: "group-hover:text-gray-200",
    hoverBorder: "group-hover:border-gray-400/40",
    hoverShadow: "group-hover:shadow-gray-400/20",
    bgGlow: "group-hover:bg-gray-400/10",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:jeandamour157@gmail.com",
    label: "jeandamour157@gmail.com",
    hoverColor: "group-hover:text-amber-400",
    hoverBorder: "group-hover:border-amber-500/40",
    hoverShadow: "group-hover:shadow-amber-500/20",
    bgGlow: "group-hover:bg-amber-500/10",
  },
]

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Predict", path: "/predict" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "History", path: "/history" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0b1120] border-t border-gray-800/40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nest-500/40 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-nest-500/15 group-hover:shadow-nest-500/40 transition-shadow duration-300">
                <Bird className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                Nest<span className="text-nest-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400/80 leading-relaxed max-w-xs">
              NestAI is an AI-powered real estate intelligence platform that helps users predict fair property prices using machine learning.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-[0.15em] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400/70 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-nest-400 transition-colors duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-5">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-[0.15em] mb-5">
              Connect With Me
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title={social.label}
                  >
                    <div className={`
                      w-11 h-11 rounded-xl flex items-center justify-center
                      bg-gray-800/30 border border-gray-700/40
                      text-gray-500
                      transition-all duration-300 ease-out
                      hover:scale-110
                      ${social.hoverColor} ${social.hoverBorder} ${social.hoverShadow} ${social.bgGlow}
                      hover:shadow-lg
                    `}>
                      <IconComponent />
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="mt-5 space-y-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-xs text-gray-500/70 hover:text-gray-300 transition-colors duration-200 group"
                  >
                    <span className="w-6 flex items-center justify-center">
                      <IconComponent />
                    </span>
                    <span className="truncate">{social.label}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500/60 flex items-center gap-1.5">
              &copy; {new Date().getFullYear()} NestAI. Built with{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Kigali, Rwanda
            </p>
            <p className="text-xs text-gray-600/50">
              AI-Powered Real Estate Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
