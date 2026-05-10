export default function LoadingSpinner({ size = "md" }) {
  const sizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-7 h-7" }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-2 border-gray-200 dark:border-gray-700 border-t-nest-500 rounded-full animate-spin`} />
    </div>
  )
}
