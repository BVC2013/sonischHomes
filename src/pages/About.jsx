import CTAButton from '../components/CTAButton'
import { teamMembers, stats } from '../data/properties'

const reasons = [
  {
    title: 'Coordinated, Not Fragmented',
    desc: 'Most buyers juggle a lender, agent, and inspector who never talk to each other. We eliminate that friction.',
  },
  {
    title: 'Investor-First Mindset',
    desc: 'Every team member understands investment math — not just home features. We speak your language.',
  },
  {
    title: 'Speed When It Matters',
    desc: 'In competitive markets, your pre-approval and offer have to move fast. Our coordinated model cuts days off your timeline.',
  },
  {
    title: "Deals You Won't Find Elsewhere",
    desc: 'Our network sources foreclosures, REO, and off-market properties before they reach Zillow.',
  },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-base text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">About SonischHomes</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-6">
            A Different Kind of Real Estate Firm
          </h1>
          <p className="text-neutral/70 text-lg max-w-xl leading-relaxed">
            We built SonischHomes because too many buyers and investors get fragmented advice from teams that don't communicate. We fix that.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-l-4 border-primary pl-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-base/70 leading-relaxed">
                To give every homebuyer and real estate investor the coordinated team they deserve — where mortgage strategy, property selection, and investment analysis work in lockstep from day one.
              </p>
            </div>
            <div className="border-l-4 border-darkAccent pl-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-base/70 leading-relaxed">
                A world where building generational wealth through real estate is accessible and transparent — not a confusing maze of disconnected professionals and hidden costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the Model Works */}
      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">The Model</p>
            <h2 className="section-heading">Coordinated Service — What That Means</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏦',
                title: 'One Point of Contact',
                desc: 'You have a single person coordinating your mortgage broker, realtor, and investment analyst.',
              },
              {
                icon: '📊',
                title: 'Shared Data',
                desc: 'Everyone on your team has access to the same numbers — no miscommunication between lender and agent.',
              },
              {
                icon: '🎯',
                title: 'Aligned Incentives',
                desc: 'Our team wins when you close on the right deal at the right terms — not just any deal.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 border border-neutral">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-base/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">The Team</p>
            <h2 className="section-heading">The People Behind the Platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white border border-neutral p-6 group hover:border-primary transition-colors">
                <div className="w-16 h-16 bg-neutral flex items-center justify-center mb-4 text-2xl font-bold text-primary border border-neutral">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="font-bold text-base mb-1">{member.name}</h3>
                <p className="text-xs text-primary uppercase tracking-wide font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-base/60 leading-relaxed mb-4">{member.bio}</p>
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-darkAccent font-semibold"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-base text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose SonischHomes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="flex gap-4 p-4 border border-white/10 hover:border-primary/50 transition-colors">
                <div className="text-primary mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{r.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credentials */}
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label} className="bg-white border border-neutral p-6">
                <p className="text-3xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-xs text-base/60 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Let's Build Your Strategy</h2>
          <p className="text-white/80 mb-8">Book a free consultation and see what a coordinated team can do for you.</p>
          <CTAButton to="/consult" variant="white">Schedule a Free Consult</CTAButton>
        </div>
      </section>
    </>
  )
}
