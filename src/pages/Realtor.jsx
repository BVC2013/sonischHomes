import CTAButton from '../components/CTAButton'

const benefits = [
  {
    title: 'Exclusive Off-Market Access',
    desc: 'Sonia leverages her network to find properties before they hit the MLS — giving our clients a first-mover advantage.',
  },
  {
    title: 'Investor-Focused Expertise',
    desc: "She understands ROI, cap rates, and exit strategies. She's not just showing houses — she's building portfolios.",
  },
  {
    title: 'Foreclosure & REO Specialist',
    desc: 'With deep experience in distressed properties, Sonia knows how to evaluate and negotiate bank-owned listings.',
  },
  {
    title: 'Seamless Coordination',
    desc: 'As a vetted partner, Sonia operates within our coordinated model — your lender and agent always on the same page.',
  },
]

export default function Realtor() {
  return (
    <>
      {/* Hero */}
      <section className="bg-base text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Realtor Partner</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Meet Sonia Verma
            </h1>
            <p className="text-neutral/70 text-lg leading-relaxed mb-8">
              Sonia is our exclusive realtor partner and one of the most sought-after investment property specialists in the Midwest. When you work with SonischHomes, you get Sonia in your corner.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton
                href="https://www.soniaverma.com"
                variant="primary"
              >
                Visit Sonia's Website →
              </CTAButton>
              <CTAButton to="/consult" variant="outline">
                Book a Consult Together
              </CTAButton>
            </div>
          </div>
          {/* Profile card */}
          <div className="bg-white/5 border border-white/10 p-8">
            <div className="w-20 h-20 bg-primary flex items-center justify-center text-white text-3xl font-bold mb-5">
              SV
            </div>
            <h2 className="text-2xl font-bold mb-1">Sonia Verma</h2>
            <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-4">
              Licensed Realtor · Investment Property Specialist
            </p>
            <div className="space-y-2 text-sm text-neutral/60">
              <p>📍 Serving: Michigan, Ohio, Indiana, Tennessee</p>
              <p>🏆 Top 1% Producer — 3 Consecutive Years</p>
              <p>🏚️ 200+ Investment Properties Closed</p>
              <p>🔑 REO & Foreclosure Certified</p>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href="https://www.soniaverma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-semibold hover:text-white transition-colors"
              >
                soniaverma.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">The Advantage</p>
            <h2 className="section-heading">Why Our Partnership Wins for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white border border-neutral p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                  <span className="text-primary">▶</span> {b.title}
                </h3>
                <p className="text-sm text-base/60 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the Partnership Works */}
      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">The Process</p>
            <h2 className="section-heading">How It Works Together</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'You Meet With Us',
                desc: 'We assess your goals, budget, and financing eligibility before involving the realtor — so Sonia only shows you properties you can actually buy.',
              },
              {
                step: '02',
                title: 'Sonia Gets to Work',
                desc: 'With your financing profile in hand, Sonia begins sourcing properties that match your investment criteria — on-market and off.',
              },
              {
                step: '03',
                title: 'Close Coordinated',
                desc: 'Your mortgage broker and Sonia communicate directly throughout the offer and closing process — no gaps, no surprises.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-white p-6 border border-neutral">
                <p className="text-5xl font-black text-primary/20 mb-4">{s.step}</p>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-base/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Sonia?</h2>
          <p className="text-white/80 mb-8">
            Schedule a consultation to get your mortgage strategy aligned before Sonia starts searching.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton to="/consult" variant="white">Schedule a Consult</CTAButton>
            <CTAButton href="https://www.soniaverma.com" variant="outline">
              Visit Sonia's Website
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
