import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function StickyConsultBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-darkAccent text-white py-3 px-4 flex items-center justify-between gap-4 shadow-2xl lg:hidden">
      <p className="text-sm font-medium">Ready to invest? Let's talk.</p>
      <div className="flex items-center gap-2">
        <Link
          to="/consult"
          className="text-xs font-semibold bg-primary px-4 py-2 uppercase tracking-wide whitespace-nowrap hover:bg-white hover:text-base transition-colors"
        >
          Schedule a Consult
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  )
}
