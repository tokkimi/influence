const stats = [
  { value: "5 000+", label: "Influenceurs actifs", description: "De tous horizons et catégories" },
  { value: "500+", label: "Marques partenaires", description: "Du luxe aux startups" },
  { value: "50", label: "Pays représentés", description: "Une présence mondiale" },
  { value: "98%", label: "Taux de satisfaction", description: "Clients recommandent la plateforme" },
]

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Des chiffres qui parlent</h2>
          <p className="text-purple-300">La confiance de milliers de professionnels</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">{stat.value}</div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-purple-300 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
