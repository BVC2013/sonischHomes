import { Link } from 'react-router-dom'

const footerLinks = {
  Services: [
    { label: 'Get Pre-Approved', to: '/consult' },
    { label: 'Browse Investments', to: '/investments' },
    { label: 'View Foreclosures', to: '/foreclosures' },
    { label: 'Schedule a Consult', to: '/consult' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Realtor Partner', to: '/realtor' },
    { label: 'Our Process', to: '/about' },
  ],
  Resources: [
    { label: 'Investment Calculator', to: '/investments' },
    { label: 'Foreclosure Guide', to: '/foreclosures' },
    { label: 'FAQ', to: '/about' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-base text-neutral/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" fill="#A8763E" className="w-7 h-7">
                <path d="M16 2L2 14h4v16h8v-10h4v10h8V14h4z" />
              </svg>
              <span className="text-lg font-bold text-white">
                Sonisch<span className="text-primary">Homes</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Mortgage brokerage, real estate, and investment services — coordinated under one roof for buyers and investors who demand results.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="mailto:info@sonischhomes.com"
                className="text-xs text-primary hover:text-white transition-colors"
              >
                info@sonischhomes.com
              </a>
            </div>
            <p className="mt-2 text-xs text-neutral/50">(800) 555-0192</p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral/50">
          <p>© {new Date().getFullYear()} SonischHomes. All rights reserved.</p>
          <p>Licensed Mortgage Broker · Equal Housing Opportunity</p>
        </div>
      </div>
    </footer>
  )
}
