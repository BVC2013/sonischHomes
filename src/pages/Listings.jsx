import CategoryRow from '../components/CategoryRow'

const categories = [
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
  return (
    <>
      {/* Hero */}
      <section className="bg-base text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Live MLS Data · Updated Daily
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Browse Property Listings
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explore active listings across every category — from starter homes to luxury estates and commercial investments.
            </p>
          </div>
        </div>
      </section>

      {/* Category rows */}
      <div className="py-8 divide-y divide-neutral">
        {categories.map((cat) => (
          <CategoryRow key={cat.id} {...cat} />
        ))}
      </div>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Found the right property? Let&apos;s get you financed.
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Our mortgage team works alongside every listing to secure the best rates and close deals fast.
          </p>
          <a
            href="/consult"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold text-sm tracking-wide uppercase transition-all duration-200 hover:bg-background"
          >
            Schedule a Free Consult
          </a>
        </div>
      </section>
    </>
  )
}
