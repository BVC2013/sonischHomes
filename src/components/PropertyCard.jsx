import Badge from './Badge'
import CTAButton from './CTAButton'

function fmt(n) {
  return n?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function PropertyCard({ property, variant = 'investment' }) {
  const isForeclosure = variant === 'foreclosure'

  return (
    <div className="card group flex flex-col">
      {/* Image placeholder */}
      <div className="relative h-48 bg-neutral overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-base/30 to-primary/20" />
        <svg viewBox="0 0 64 64" className="w-16 h-16 opacity-20" fill="#2B2118">
          <path d="M32 4L4 28h8v32h16V44h8v16h16V28h8z" />
        </svg>
        {/* Discount badge on foreclosures */}
        {isForeclosure && property.discount && (
          <div className="absolute top-3 right-3 bg-darkAccent text-white text-xs font-bold px-2 py-1 uppercase">
            {property.discount}% Below Market
          </div>
        )}
        {/* Tags overlay */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {property.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-base text-base leading-snug group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <p className="text-xs text-base/60 mt-1 uppercase tracking-wide">{property.location}</p>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{fmt(property.price)}</span>
          {isForeclosure && property.originalValue && (
            <span className="text-sm line-through text-base/40">{fmt(property.originalValue)}</span>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 text-center border-t border-neutral pt-3">
          <div>
            <p className="text-xs text-base/50 uppercase tracking-wide">Beds</p>
            <p className="font-semibold text-sm">{property.beds}</p>
          </div>
          <div>
            <p className="text-xs text-base/50 uppercase tracking-wide">Baths</p>
            <p className="font-semibold text-sm">{property.baths}</p>
          </div>
          <div>
            <p className="text-xs text-base/50 uppercase tracking-wide">SqFt</p>
            <p className="font-semibold text-sm">{property.sqft?.toLocaleString()}</p>
          </div>
        </div>

        {/* Investment metrics */}
        {!isForeclosure && (
          <div className="grid grid-cols-2 gap-2 text-center border-t border-neutral pt-3">
            {property.roi && (
              <div className="bg-background p-2">
                <p className="text-xs text-base/50 uppercase tracking-wide">Est. ROI</p>
                <p className="font-bold text-primary">{property.roi}%</p>
              </div>
            )}
            {property.capRate && (
              <div className="bg-background p-2">
                <p className="text-xs text-base/50 uppercase tracking-wide">Cap Rate</p>
                <p className="font-bold text-primary">{property.capRate}%</p>
              </div>
            )}
            {property.rentalEstimate && (
              <div className="bg-background p-2 col-span-2">
                <p className="text-xs text-base/50 uppercase tracking-wide">Est. Monthly Rent</p>
                <p className="font-bold text-base">{fmt(property.rentalEstimate)}/mo</p>
              </div>
            )}
          </div>
        )}

        {/* Foreclosure metrics */}
        {isForeclosure && (
          <div className="border-t border-neutral pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-base/60">Est. Rehab Cost</span>
              <span className="font-semibold text-darkAccent">{fmt(property.rehabEstimate)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-base/60">After-Repair Value</span>
              <span className="font-semibold">{fmt(property.originalValue)}</span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
          {isForeclosure ? (
            <>
              <CTAButton to="/consult" variant="dark" className="text-xs px-3 py-2">
                Act Fast
              </CTAButton>
              <CTAButton to="/consult" variant="outline" className="text-xs px-3 py-2">
                Finance This Deal
              </CTAButton>
            </>
          ) : (
            <>
              <CTAButton to="/consult" variant="outline" className="text-xs px-3 py-2">
                Analyze Deal
              </CTAButton>
              <CTAButton to="/consult" variant="primary" className="text-xs px-3 py-2">
                Get Financing
              </CTAButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
