import Link from 'next/link'
import { mockInfluencers } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { CheckCircle, Instagram, Youtube } from 'lucide-react'

export default function Influencers() {
  const featured = mockInfluencers.slice(0, 4)

  const categoryColors: Record<string, string> = {
    MICRO: 'bg-green-100 text-green-700',
    MACRO: 'bg-blue-100 text-blue-700',
    INTERNATIONAL: 'bg-purple-100 text-purple-700',
  }
  const categoryLabels: Record<string, string> = {
    MICRO: 'Micro',
    MACRO: 'Macro',
    INTERNATIONAL: 'International',
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-purple-700 font-semibold text-sm uppercase tracking-wider">Notre réseau</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-2">
              Des talents d&apos;exception
            </h2>
            <p className="text-gray-500 text-lg">Découvrez quelques-uns de nos influenceurs certifiés</p>
          </div>
          <Link
            href="/auth/inscription?role=brand"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-800 transition"
          >
            Voir tous les profils
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((inf) => (
            <div
              key={inf.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={inf.photo}
                  alt={inf.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[inf.category]}`}>
                    {categoryLabels[inf.category]}
                  </span>
                </div>
                {inf.isVerified && (
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Certifié
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{inf.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{inf.bio}</p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-purple-700 text-sm">{formatNumber(inf.followers)}</p>
                    <p className="text-xs text-gray-400">Abonnés</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-green-600 text-sm">{inf.engagementRate}%</p>
                    <p className="text-xs text-gray-400">Engagement</p>
                  </div>
                </div>

                <div className="flex gap-1 flex-wrap">
                  {inf.interests.slice(0, 2).map((interest, i) => (
                    <span key={i} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
