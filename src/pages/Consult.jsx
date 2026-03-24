import { useState } from 'react'
import CTAButton from '../components/CTAButton'

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
]

const loanTypes = [
  'Conventional', 'FHA', 'VA', 'DSCR / Investor Loan', 'Hard Money', 'Not Sure Yet',
]

export default function Consult() {
  const [submitted, setSubmitted] = useState(false)
  const [intent, setIntent] = useState('buying')
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    loanType: '',
    notes: '',
  })

  // Generate next 7 days for calendar
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Consultation Booked!</h2>
          <p className="text-base/60 text-lg mb-2">
            Thank you, <strong>{form.name}</strong>. We've received your request.
          </p>
          {selectedDay && selectedSlot && (
            <p className="text-base/60 mb-8">
              You selected{' '}
              <strong>
                {selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </strong>{' '}
              at <strong>{selectedSlot}</strong>.
            </p>
          )}
          <p className="text-base/60 mb-10">
            A team member will reach out to confirm within 2 business hours.
          </p>
          <CTAButton to="/" variant="primary">Back to Home</CTAButton>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-base text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Free Consultation</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-4">
            Schedule Your Strategy Session
          </h1>
          <p className="text-neutral/70 text-lg max-w-xl">
            30 minutes with our team. No pressure. Walk away with a clear mortgage strategy and property plan.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left column — form fields */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-xl font-bold">Your Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-neutral bg-white text-base px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-neutral bg-white text-base px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-neutral bg-white text-base px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="jane@example.com"
                />
              </div>

              {/* Intent toggle */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-base/60 mb-2">I am looking to:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['buying', 'investing'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIntent(opt)}
                      className={`py-3 text-sm font-semibold uppercase tracking-wide border-2 transition-colors ${
                        intent === opt
                          ? 'bg-primary text-white border-primary'
                          : 'border-neutral text-base/60 hover:border-primary'
                      }`}
                    >
                      {opt === 'buying' ? '🏠 Buy a Home' : '📈 Invest in Property'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
                    {intent === 'buying' ? 'Budget Range' : 'Investment Budget'}
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full border border-neutral bg-white text-base px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. $200,000 – $350,000"
                  />
                </div>
                <div>
                  <label htmlFor="loanType" className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
                    Loan Type
                  </label>
                  <select
                    id="loanType"
                    name="loanType"
                    value={form.loanType}
                    onChange={handleChange}
                    className="w-full border border-neutral bg-white text-base text-sm px-3 py-2.5 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a loan type</option>
                    {loanTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full border border-neutral bg-white text-base text-sm px-3 py-2.5 focus:outline-none focus:border-primary resize-none"
                  placeholder="Tell us a bit about your situation..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary justify-center py-4 text-base"
              >
                Book Consultation
              </button>

              <p className="text-xs text-base/50 text-center">
                No spam. No pressure. We'll confirm within 2 business hours.
              </p>
            </div>

            {/* Right column — calendar */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Pick a Day</h2>
              <div className="grid grid-cols-7 gap-1 mb-6">
                {days.map((d, i) => {
                  const isSelected = selectedDay?.toDateString() === d.toDateString()
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setSelectedDay(d); setSelectedSlot(null) }}
                      className={`aspect-square flex flex-col items-center justify-center text-xs transition-colors border ${
                        isSelected
                          ? 'bg-primary text-white border-primary'
                          : 'border-neutral hover:border-primary text-base/70'
                      }`}
                    >
                      <span className="font-semibold">
                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="text-xs">
                        {d.getDate()}
                      </span>
                    </button>
                  )
                })}
              </div>

              {selectedDay && (
                <>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-base/60 mb-3">
                    Available Times —{' '}
                    {selectedDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isActive = selectedSlot === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 text-xs font-semibold uppercase tracking-wide border transition-colors ${
                            isActive
                              ? 'bg-primary text-white border-primary'
                              : 'border-neutral text-base/60 hover:border-primary'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {!selectedDay && (
                <div className="border border-dashed border-neutral p-6 text-center text-sm text-base/50">
                  Select a day above to see available time slots
                </div>
              )}

              {/* Trust signals */}
              <div className="mt-8 space-y-3 border-t border-neutral pt-6">
                {[
                  '✓ Free 30-minute consultation',
                  '✓ No obligation to proceed',
                  '✓ Expert mortgage & investment advice',
                  '✓ Availability confirmed within 2 hours',
                ].map((item) => (
                  <p key={item} className="text-xs text-base/60">{item}</p>
                ))}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
