import { useState, useEffect, useCallback, useMemo } from 'react'
import ListingCard from '../components/ListingCard'
import ListingModal from '../components/ListingModal'

const tabs = [
  {
    id: 'residential',
    label: 'For Sale',
    description: 'Homes currently listed for sale',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    queryParams: { type: 'residential' },
  },
  {
    id: 'rental',
    label: 'Rentals',
    description: 'Properties available for rent',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    queryParams: { type: 'rental' },
  },
  {
    id: 'luxury',
    label: 'Luxury',
    description: 'Premium properties over $1M',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    queryParams: { type: 'luxury' },
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Business and investment properties',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    queryParams: { type: 'commercial' },
  },
  {
    id: 'land',
    label: 'Land',
    description: 'Vacant lots and land parcels',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    queryParams: { type: 'land' },
  },
]

export default function Listings() {
  const [activeTab, setActiveTab] = useState('residential')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedListing, setSelectedListing] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const currentTab = useMemo(
    () => tabs.find((t) => t.id === activeTab),
    [activeTab]
  )

  const fetchListings = useCallback(async () => {
    setLoading(true)
    setError(null)

    const params = new URLSearchParams(currentTab.queryParams)
    params.set('limit', '12')
    if (searchQuery) params.set('q', searchQuery)

    try {
      const res = await fetch(`/api/listings?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load listings')
      const data = await res.json()
      setListings(Array.isArray(data) ? data : [])
    } catch {
      setError('Unable to load listings. Please try again.')
      setListings([])
    } finally {
      setLoading(false)
    }
  }, [currentTab, searchQuery])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput)
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchQuery('')
    setSearchInput('')
  }

  return (
    <>
      {/* Hero section */}
      <section className="bg-base text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Live MLS Data
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Browse Property Listings
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Explore thousands of active listings — from starter homes to luxury estates and investment properties.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="flex overflow-hidden shadow-2xl">
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, zip code..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 px-5 py-4 text-base bg-white focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-darkAccent text-white px-6 py-4 font-semibold text-sm tracking-wide uppercase transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-background text-primary shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-base">{currentTab.label}</h2>
            <p className="text-base/60 text-sm mt-0.5">
              {currentTab.description}
              {searchQuery && (
                <span className="ml-2 text-primary">
                  · Searching &quot;{searchQuery}&quot;
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSearchInput('')
                    }}
                    className="ml-1 text-base/40 hover:text-base"
                  >
                    ✕
                  </button>
                </span>
              )}
            </p>
          </div>
          {!loading && listings.length > 0 && (
            <p className="text-sm text-base/50">
              {listings.length} listing{listings.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white overflow-hidden animate-pulse border border-neutral">
                <div className="h-52 bg-neutral" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-neutral w-1/2" />
                  <div className="h-4 bg-neutral w-3/4" />
                  <div className="h-4 bg-neutral w-1/2" />
                  <div className="h-4 bg-neutral w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-background border border-primary/20 p-8 max-w-md">
              <svg className="w-12 h-12 text-darkAccent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-base mb-2">Unable to Load Listings</h3>
              <p className="text-base/60 text-sm mb-4">{error}</p>
              <button onClick={fetchListings} className="btn-primary">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && listings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-background border border-primary/20 p-8 max-w-md">
              <svg className="w-12 h-12 text-primary/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-base mb-2">No Listings Found</h3>
              <p className="text-base/60 text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search.`
                  : 'No active listings in this category right now.'}
              </p>
            </div>
          </div>
        )}

        {/* Listings grid */}
        {!loading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.mlsId}
                listing={listing}
                onSelect={setSelectedListing}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="bg-primary mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Found the right property? Let&apos;s get you financed.
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Our mortgage team works alongside every listing to secure the best rates and close deals fast.
          </p>
          <a href="/consult" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold text-sm tracking-wide uppercase transition-all duration-200 hover:bg-background">
            Schedule a Free Consult
          </a>
        </div>
      </section>

      {/* Listing detail modal */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  )
}
