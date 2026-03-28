import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/listings', label: 'Listings' },
  { to: '/investments', label: 'Investment Properties' },
  { to: '/foreclosures', label: 'Foreclosures' },
  { to: '/realtor', label: 'Realtor Partner' },
  { to: '/consult', label: 'Consult' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-base text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg viewBox="0 0 32 32" fill="#A8763E" className="w-7 h-7">
              <path d="M16 2L2 14h4v16h8v-10h4v10h8V14h4z" />
            </svg>
            <span className="text-lg font-bold tracking-tight">
              Sonisch<span className="text-primary">Homes</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-150 ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-neutral/80 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/consult" className="btn-primary text-xs px-4 py-2">
              Schedule a Consult
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-neutral/80 hover:text-primary transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-base border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-primary' : 'text-neutral/80 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/consult"
              onClick={() => setOpen(false)}
              className="block mt-3 btn-primary text-center text-xs"
            >
              Schedule a Consult
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
