export default function StatsSection({ stats, dark = false }) {
  const bg = dark ? 'bg-base text-white' : 'bg-primary text-white'
  return (
    <section className={`${bg} py-14`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="group">
              <p className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-105 transition-transform">
                {s.value}
              </p>
              <p className="text-xs uppercase tracking-widest opacity-70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
