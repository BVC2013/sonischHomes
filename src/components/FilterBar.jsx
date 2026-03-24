export default function FilterBar({ filters, onChange }) {
  const { priceMax, roiMin, propertyType } = filters

  const propertyTypes = ['All', 'Fix and Flip', 'Cash Flow', 'Turnkey', 'Multi-Family']

  return (
    <div className="bg-white border border-neutral p-4 flex flex-wrap gap-4 items-end">
      {/* Price Range */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
          Max Price
        </label>
        <select
          value={priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full border border-neutral bg-background text-base text-sm px-3 py-2 focus:outline-none focus:border-primary"
        >
          <option value={1000000}>Any</option>
          <option value={100000}>Under $100K</option>
          <option value={150000}>Under $150K</option>
          <option value={200000}>Under $200K</option>
          <option value={300000}>Under $300K</option>
          <option value={500000}>Under $500K</option>
        </select>
      </div>

      {/* Min ROI */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
          Min ROI %
        </label>
        <select
          value={roiMin}
          onChange={(e) => onChange({ ...filters, roiMin: Number(e.target.value) })}
          className="w-full border border-neutral bg-background text-base text-sm px-3 py-2 focus:outline-none focus:border-primary"
        >
          <option value={0}>Any ROI</option>
          <option value={10}>10%+</option>
          <option value={12}>12%+</option>
          <option value={15}>15%+</option>
          <option value={18}>18%+</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold uppercase tracking-wide text-base/60 mb-1">
          Property Type
        </label>
        <div className="flex flex-wrap gap-1">
          {propertyTypes.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...filters, propertyType: t })}
              className={`text-xs px-3 py-1.5 font-semibold uppercase tracking-wide border transition-colors ${
                propertyType === t
                  ? 'bg-primary text-white border-primary'
                  : 'border-neutral text-base/60 hover:border-primary hover:text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
