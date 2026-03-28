const colorMap = {
  'Fix and Flip': 'bg-darkAccent text-white',
  'Cash Flow': 'bg-primary text-white',
  'Turnkey': 'bg-base text-white',
  'Multi-Family': 'bg-neutral text-base',
  'High ROI': 'bg-yellow-700 text-white',
  'Long-Term Hold': 'bg-neutral text-base',
  'Bank-Owned': 'bg-darkAccent text-white',
  'Foreclosure': 'bg-red-800 text-white',
  'Auction': 'bg-base text-white',
  'Deep Discount': 'bg-yellow-700 text-white',
  'Cash Flow Potential': 'bg-primary text-white',
}

export default function Badge({ label }) {
  const cls = colorMap[label] || 'bg-neutral text-base'
  return (
    <span className={`inline-block text-xs font-semibold uppercase tracking-wide px-2 py-0.5 ${cls}`}>
      {label}
    </span>
  )
}
