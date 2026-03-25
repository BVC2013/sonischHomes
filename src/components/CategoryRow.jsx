import { useState, useEffect, useRef, useCallback } from 'react'
import ListingCard from './ListingCard'
import ListingModal from './ListingModal'

function SkeletonCard() {
  return (
    <div className="w-72 flex-shrink-0 bg-white border border-neutral animate-pulse">
      <div className="h-44 bg-neutral" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-neutral w-1/2" />
        <div className="h-4 bg-neutral w-3/4" />
        <div className="h-4 bg-neutral w-1/2" />
        <div className="h-3 bg-neutral w-2/3 mt-2" />
      </div>
    </div>
  )
}

export default function CategoryRow({ id, label, description, icon, queryParams }) {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedListing, setSelectedListing] = useState(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const rowRef = useRef(null)

  const fetchListings = useCallback(async () => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams(queryParams)
    params.set('limit', '12')
    try {
      const res = await fetch(`/api/listings?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setListings(Array.isArray(data) ? data : [])
    } catch {
      setError('Could not load listings.')
      setListings([])
    } finally {
      setLoading(false)
    }
  }, [queryParams])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const updateScrollButtons = () => {
    const el = rowRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    const ro = new ResizeObserver(updateScrollButtons)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      ro.disconnect()
    }
  }, [listings, loading])

  const scroll = (dir) => {
    const el = rowRef.current
    if (!el) return
    el.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section className="py-8 first:pt-0">
      {/* Row header */}
      <div className="flex items-end justify-between mb-4 px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="flex items-center gap-3">
          <span className="text-primary">{icon}</span>
          <div>
            <h2 className="text-xl font-bold text-base leading-tight">{label}</h2>
            <p className="text-sm text-base/50 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          {/* Scroll arrows */}
          <button
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="p-2 border border-neutral text-base/50 hover:border-primary hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="p-2 border border-neutral text-base/50 hover:border-primary hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div className="relative">
        {/* Left fade */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-background to-transparent" />
        )}
        {/* Right fade */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-background to-transparent" />
        )}

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-3 px-4 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* Error state */}
          {error && !loading && (
            <div className="w-full flex items-center gap-4 py-8 text-sm text-base/60">
              <svg className="w-5 h-5 text-darkAccent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
              <button onClick={fetchListings} className="text-primary underline underline-offset-2 hover:no-underline">
                Retry
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && listings.length === 0 && (
            <p className="py-8 text-sm text-base/50 italic">No active listings in this category right now.</p>
          )}

          {/* Cards */}
          {!loading &&
            !error &&
            listings.map((listing) => (
              <div key={listing.mlsId} className="w-72 flex-shrink-0">
                <ListingCard listing={listing} onSelect={setSelectedListing} />
              </div>
            ))}
        </div>
      </div>

      {/* Detail modal scoped to this row */}
      {selectedListing && (
        <ListingModal listing={selectedListing} onClose={() => setSelectedListing(null)} />
      )}
    </section>
  )
}
