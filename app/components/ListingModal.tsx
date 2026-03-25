"use client";

import Image from "next/image";
import { useState } from "react";
import { MLSListing } from "../types/listings";

interface ListingModalProps {
  listing: MLSListing;
  onClose: () => void;
}

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ListingModal({ listing, onClose }: ListingModalProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [imgError, setImgError] = useState(false);
  const { property, address, agent, office, mls, association } = listing;
  const photos = listing.photos || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {/* Main photo */}
          <div className="relative h-80 bg-gradient-to-br from-blue-50 to-slate-100 rounded-t-3xl overflow-hidden">
            {photos.length > 0 && !imgError ? (
              <Image
                src={photos[activePhoto] || photos[0]}
                alt={address.full}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, 896px"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-24 h-24 text-slate-200"
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

            {/* Photo navigation */}
            {photos.length > 1 && !imgError && (
              <>
                <button
                  onClick={() =>
                    setActivePhoto((p) =>
                      p === 0 ? photos.length - 1 : p - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  aria-label="Previous photo"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setActivePhoto((p) =>
                      p === photos.length - 1 ? 0 : p + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  aria-label="Next photo"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  {activePhoto + 1} / {photos.length}
                </div>
              </>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-colors z-10"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnail strip */}
        {photos.length > 1 && !imgError && (
          <div className="flex gap-2 px-6 pt-3 overflow-x-auto scrollbar-none">
            {photos.slice(0, 8).map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activePhoto === i
                    ? "border-blue-500 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-3xl font-bold text-blue-700">
                {formatPrice(listing.listPrice)}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                {address.streetNumber} {address.streetName}
                {address.unit ? ` #${address.unit}` : ""}
              </h2>
              <p className="text-gray-500">
                {address.city}, {address.state} {address.postalCode}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                {mls.status}
              </span>
              <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                MLS# {listing.mlsId}
              </span>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 bg-gray-50 rounded-2xl p-4">
            {property.bedrooms > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {property.bedrooms}
                </p>
                <p className="text-sm text-gray-500">Bedrooms</p>
              </div>
            )}
            {property.bathsFull > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {property.bathsFull}
                  {property.bathsHalf > 0 ? ".5" : ""}
                </p>
                <p className="text-sm text-gray-500">Bathrooms</p>
              </div>
            )}
            {property.area > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {property.area.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Sq Ft</p>
              </div>
            )}
            {property.yearBuilt > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {property.yearBuilt}
                </p>
                <p className="text-sm text-gray-500">Year Built</p>
              </div>
            )}
          </div>

          {/* Description */}
          {listing.remarks && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About This Property
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {listing.remarks}
              </p>
            </div>
          )}

          {/* Additional details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* Property details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Property Details
              </h3>
              <dl className="space-y-2 text-sm">
                {property.type && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Type</dt>
                    <dd className="text-gray-800 font-medium capitalize">
                      {property.type}
                    </dd>
                  </div>
                )}
                {property.style && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Style</dt>
                    <dd className="text-gray-800 font-medium">
                      {property.style}
                    </dd>
                  </div>
                )}
                {property.stories > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Stories</dt>
                    <dd className="text-gray-800 font-medium">
                      {property.stories}
                    </dd>
                  </div>
                )}
                {mls.daysOnMarket !== undefined && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Days on Market</dt>
                    <dd className="text-gray-800 font-medium">
                      {mls.daysOnMarket}
                    </dd>
                  </div>
                )}
                {mls.area && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">MLS Area</dt>
                    <dd className="text-gray-800 font-medium">{mls.area}</dd>
                  </div>
                )}
                {association?.fee != null && association.fee > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">HOA Fee</dt>
                    <dd className="text-gray-800 font-medium">
                      ${association.fee.toLocaleString()}/mo
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Agent info */}
            {agent?.firstName && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Listed By
                </h3>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-800">
                    {agent.firstName} {agent.lastName}
                  </p>
                  {office?.name && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {office.name}
                    </p>
                  )}
                  <div className="mt-3 space-y-1">
                    {agent.contact?.office && (
                      <a
                        href={`tel:${agent.contact.office}`}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {agent.contact.office}
                      </a>
                    )}
                    {agent.contact?.email && (
                      <a
                        href={`mailto:${agent.contact.email}`}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {agent.contact.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
