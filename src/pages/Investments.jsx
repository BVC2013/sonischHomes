import { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import FilterBar from '../components/FilterBar'
import CTAButton from '../components/CTAButton'
import { investmentProperties } from '../data/properties'

const whyInvest = [
  {
    title: 'Cash Flow From Day One',
    desc: 'We source properties where rental income exceeds expenses — positive cash flow from day one is our baseline.',
  },
  {
    title: 'Built-In Financing',
    desc: "As a mortgage brokerage, we're uniquely positioned to get investor-grade financing, DSCR loans, and bridge capital fast.",
  },
  {
    title: 'Vetted Deal Flow',
    desc: 'Every property in our marketplace has been analyzed by our investment team for ROI, cap rate, and exit viability.',
  },
]

export default function Investments() {
  const [filters, setFilters] = useState({
    priceMax: 1000000,
    roiMin: 0,
    propertyType: 'All',
  })

  const filtered = investmentProperties.filter((p) => {
    if (p.price > filters.priceMax) return false
    if (filters.roiMin > 0 && (!p.roi || p.roi < filters.roiMin)) return false
    if (filters.propertyType !== 'All' && p.type !== filters.propertyType) return false
    return true
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-base text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Investment Properties</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-6">
            Find Your Next Investment Deal
          </h1>
          <p className="text-neutral/70 text-lg max-w-xl leading-relaxed mb-8">
            Browse our curated marketplace of high-yield properties — analyzed for ROI, cap rate, and cash flow before they reach you.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton to="/consult" variant="primary">Get Pre-Approved</CTAButton>
            <CTAButton to="/foreclosures" variant="outline">View Foreclosures</CTAButton>
          </div>
        </div>
      </section>

      {/* Why Invest with Us */}
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyInvest.map((w) => (
              <div key={w.title} className="flex gap-4">
                <div className="text-primary mt-1 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{w.title}</h3>
                  <p className="text-xs text-base/60 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Listings */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="section-heading mb-6">Available Investment Properties</h2>
            <FilterBar filters={filters} onChange={setFilters} />
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-neutral">
              <p className="text-base/50 text-lg mb-4">No properties match your current filters.</p>
              <button
                onClick={() => setFilters({ priceMax: 1000000, roiMin: 0, propertyType: 'All' })}
                className="btn-outline text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-base/50 mb-6">
                Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'property' : 'properties'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} variant="investment" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-darkAccent text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Interested in a Deal?</h2>
          <p className="text-white/70 mb-8">
            Let's run the full numbers together. Schedule a call and our investment analyst will walk through the deal with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton to="/consult" variant="white">Schedule a Consult</CTAButton>
            <CTAButton to="/consult" variant="outline">Get Pre-Approved</CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
