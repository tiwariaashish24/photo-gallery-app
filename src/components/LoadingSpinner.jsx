export default function LoadingSpinner() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-600" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      <p className="text-sm">Loading photos...</p>
    </div>
  )
}
