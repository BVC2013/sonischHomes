import { Link } from 'react-router-dom'

export default function CTAButton({ children, to, href, variant = 'primary', className = '', onClick }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold text-sm tracking-wide uppercase transition-all duration-200 active:scale-95'
  const variants = {
    primary: 'px-7 py-3 bg-primary text-white hover:bg-darkAccent',
    outline: 'px-7 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white',
    dark: 'px-7 py-3 bg-base text-white hover:bg-darkAccent',
    ghost: 'px-7 py-3 text-primary hover:text-darkAccent underline underline-offset-2',
    white: 'px-7 py-3 bg-white text-base hover:bg-neutral',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
