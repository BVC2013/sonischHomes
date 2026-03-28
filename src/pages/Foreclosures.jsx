import { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import CTAButton from '../components/CTAButton'
import { foreclosureProperties } from '../data/properties'

const howItWorks = [
  {
    step: '01',
    title: 'Bank Repossesses the Property',
    desc: 'When a homeowner defaults on their mortgage, the bank forecloses and takes ownership — often selling at a steep discount to recover losses quickly.',
  },
  {
    step: '02',
    title: 'We Source the Listing',
    desc: 'Our team monitors REO databases, courthouse auctions, and HUD listings daily to surface deals before they hit the open market.',
  },
  {
    step: '03',
    title: 'You Finance and Close',
    desc: 'Our mortgage team gets you the right financing — hard money, conventional REO, or bridge loans — so you can move faster than other bidders.',
  },
]

const typeFilters = ['All', 'Bank-Owned', 'Auction', 'Foreclosure']

export default function Foreclosures() {
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = foreclosureProperties.filter(
    (p) => typeFilter === 'All' || p.type === typeFilter
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-darkAccent text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-red-400 animate-pulse" />
            Limited Time Opportunities
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-6">
            Foreclosures &amp; Distressed Properties at Deep Discounts
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-10">
            Bank-owned, courthouse auctions, and HUD homes — priced 40–60% below market. Move fast. These deals don't last.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton to="/consult" variant="white">Finance a Foreclosure</CTAButton>
            <CTAButton to="/consult" variant="outline">Schedule a Consult</CTAButton>
          </div>
        </div>
      </section>

      {/* How Foreclosures Work */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Education</p>
            <h2 className="section-heading">How Foreclosures Work</h2>
            <p className="text-base/60 text-base mt-3 max-w-xl mx-auto">
              Three steps from bank repossession to your investment portfolio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((s) => (
              <div key={s.step} className="bg-white border border-neutral p-6">
                <p className="text-5xl font-black text-primary/20 mb-4">{s.step}</p>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-base/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency bar */}
      <div className="bg-primary text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold">
            ⚡ New foreclosure listings added weekly — act before they're gone
          </p>
          <CTAButton to="/consult" variant="white" className="text-xs px-4 py-2">
            Get Notified of New Deals
          </CTAButton>
        </div>
      </div>

      {/* Listings */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h2 className="section-heading mr-4">Current Listings</h2>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`text-xs px-4 py-2 font-semibold uppercase tracking-wide border transition-colors ${
                    typeFilter === t
                      ? 'bg-darkAccent text-white border-darkAccent'
                      : 'border-neutral text-base/60 hover:border-darkAccent hover:text-darkAccent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-base/50 mb-6">
            Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'listing' : 'listings'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} variant="foreclosure" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-base text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Don't Let These Deals Pass You By
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Foreclosures move fast. Our financing team can have you pre-approved before the auction — giving you a decisive edge over other bidders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton to="/consult" variant="primary">Act Fast — Book a Consult</CTAButton>
            <CTAButton to="/investments" variant="outline">Browse Investment Properties</CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
