import { Link } from 'react-router-dom'
import CTAButton from '../components/CTAButton'
import TestimonialCard from '../components/TestimonialCard'
import StatsSection from '../components/StatsSection'
import PropertyCard from '../components/PropertyCard'
import { testimonials, stats, investmentProperties } from '../data/properties'

const steps = [
  {
    num: '01',
    title: 'Schedule a Free Consult',
    desc: 'Tell us your goals — buying a primary home or scaling an investment portfolio. Our team listens first.',
  },
  {
    num: '02',
    title: 'Get Pre-Approved Fast',
    desc: 'Our mortgage team works to get you pre-approved in as little as 48 hours — so you can move when deals appear.',
  },
  {
    num: '03',
    title: 'Find the Right Property',
    desc: 'Our realtor partner surfaces on-market and off-market opportunities matched to your budget and strategy.',
  },
  {
    num: '04',
    title: 'Close & Build Wealth',
    desc: 'We stay with you through closing and beyond — helping you analyze your next deal before the ink is dry.',
  },
]

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="square" d="M3 12l9-9 9 9M5 10v9h5v-5h4v5h5V10" />
      </svg>
    ),
    title: 'Mortgage Brokerage',
    desc: 'Access to dozens of lenders, investor-grade financing, and DSCR loans to maximize your leverage.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="square" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: 'Realtor Coordination',
    desc: 'Work with Sonia Verma, a specialist in investment properties, REO, and off-market deals.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="square" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Investment Analysis',
    desc: 'We run the numbers on ROI, cap rate, cash-on-cash return, and exit strategy before you commit.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="square" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
    title: 'Foreclosure & REO Access',
    desc: 'We surface bank-owned properties and auction listings at deep discounts before they hit the open market.',
  },
]

export default function Home() {
  const featuredDeals = investmentProperties.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-base text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Mortgage · Real Estate · Investment
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Home Buying and Investment Team,{' '}
              <span className="text-primary">All in One Place.</span>
            </h1>
            <p className="text-neutral/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              We coordinate your mortgage broker, realtor, and investment strategy under one roof — so you move faster, pay less, and build real wealth through real estate.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton to="/consult" variant="primary">
                Schedule a Consult
              </CTAButton>
              <CTAButton to="/investments" variant="outline">
                Browse Investment Deals
              </CTAButton>
            </div>
          </div>
        </div>
        {/* Trust bar */}
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-6 items-center justify-center md:justify-start text-xs text-neutral/60 uppercase tracking-widest">
            <span>Licensed Mortgage Broker</span>
            <span className="text-white/20">|</span>
            <span>Equal Housing Lender</span>
            <span className="text-white/20">|</span>
            <span>$380M+ Facilitated</span>
            <span className="text-white/20">|</span>
            <span>1,200+ Clients Served</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Our Process</p>
              <h2 className="section-heading">How It Works</h2>
            </div>
            <CTAButton to="/consult" variant="outline">Get Started Today</CTAButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="group p-6 border border-neutral bg-white hover:border-primary transition-colors">
                <p className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-4">
                  {step.num}
                </p>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-base/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="section-heading">Full-Service Real Estate & Lending</h2>
            <p className="text-base/60 text-base mt-3 max-w-xl mx-auto">
              We don't just refer you to someone else. Every piece of your transaction is handled by our coordinated team.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-6 border border-neutral group hover:border-primary transition-colors">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-base/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Featured Deals</p>
              <h2 className="section-heading">Investment Properties</h2>
            </div>
            <CTAButton to="/investments" variant="primary">View All Deals</CTAButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDeals.map((p) => (
              <PropertyCard key={p.id} property={p} variant="investment" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Social Proof</p>
            <h2 className="section-heading">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-darkAccent text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Deal?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Whether you're a first-time buyer or scaling an investment portfolio, we're ready to move with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton to="/consult" variant="white">Schedule a Consult</CTAButton>
            <CTAButton to="/investments" variant="outline">Browse Investment Deals</CTAButton>
            <CTAButton to="/consult" variant="ghost">Get Pre-Approved →</CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
