import { useState } from 'react'

function formatPrice(price) {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ListingCard({ listing, onSelect }) {
  const [imgError, setImgError] = useState(false)
  const photo =
    !imgError && listing.photos && listing.photos.length > 0
      ? listing.photos[0]
      : null

  const { property, address, mls } = listing

  return (
    <button
      onClick={() => onSelect(listing)}
      className="group bg-white hover:shadow-xl transition-all duration-300 overflow-hidden text-left cursor-pointer border border-neutral hover:border-primary w-full"
    >
      {/* Photo */}
      <div className="relative h-52 bg-gradient-to-br from-background to-neutral overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={address.full}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg
              className="w-16 h-16 text-neutral"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-1 shadow">
            {mls.status}
          </span>
        </div>
        {/* Days on market */}
        {mls.daysOnMarket !== undefined && (
          <div className="absolute top-3 right-3">
            <span className="bg-base/80 text-white text-xs px-2 py-1">
              {mls.daysOnMarket === 0
                ? 'New Today'
                : `${mls.daysOnMarket}d on market`}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-2xl font-bold text-primary">
          {formatPrice(listing.listPrice)}
        </p>

        {/* Address */}
        <p className="mt-1 font-medium text-base truncate">
          {address.streetNumber} {address.streetName}
          {address.unit ? ` #${address.unit}` : ''}
        </p>
        <p className="text-sm text-base/60">
          {address.city}, {address.state} {address.postalCode}
        </p>

        {/* Property details */}
        <div className="mt-3 flex items-center gap-4 text-sm text-base/70 border-t border-neutral pt-3">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-base/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <strong>{property.bedrooms}</strong> bd
            </span>
          )}
          {(property.bathsFull > 0 || property.bathsHalf > 0) && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-base/40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 10H7V7a2 2 0 012-2h2a2 2 0 012 2v1h2V7a4 4 0 00-4-4H9a4 4 0 00-4 4v3H3a1 1 0 000 2h1v3a5 5 0 004.9 5H15a5 5 0 004.9-5v-1H21a1 1 0 000-2zm-3 5a3 3 0 01-3 3H9a3 3 0 01-3-3v-3h12v3z" />
              </svg>
              <strong>{property.bathsFull}</strong>
              {property.bathsHalf > 0 && (
                <span className="text-base/40">.5</span>
              )}{' '}
              ba
            </span>
          )}
          {property.area > 0 && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-base/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <strong>{property.area.toLocaleString()}</strong> sqft
            </span>
          )}
        </div>

        {/* Property type */}
        {(property.style || property.subType) && (
          <p className="mt-2 text-xs text-base/50 capitalize">
            {property.style || property.subType}
            {property.yearBuilt ? ` · Built ${property.yearBuilt}` : ''}
          </p>
        )}
      </div>
    </button>
  )
}
