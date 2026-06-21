import { mockInfluencers } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { CheckCircle, Instagram, Youtube, MapPin, Globe } from 'lucide-react'

export default function PublicInfluenceurProfile({ params }: { params: { id: string } }) {
  const inf = mockInfluencers.find(i => i.id === params.id) || mockInfluencers[0]

  const categoryLabel: Record<string, string> = { MICRO: 'Micro-influenceur', MACRO: 'Macro-influenceur', INTERNATIONAL: 'Influenceur international' }
  const categoryColor: Record<string, string> = { MICRO: 'bg-green-100 text-green-700', MACRO: 'bg-blue-100 text-blue-700', INTERNATIONAL: 'bg-orange-500 text-orange-500' }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header card */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-3xl overflow-hidden shadow-sm mb-6">
          <div className="h-32 bg-gradient-to-r from-purple-700 to-purple-900" />
          <div className="px-8 pb-6">
            <div className="-mt-16 flex items-end justify-between mb-4">
              <img src={inf.photo} alt={inf.name} className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg" />
              <div className="flex gap-2 mb-2">
                {inf.instagram && <a href={inf.instagram} className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition"><Instagram className="w-4 h-4 text-pink-600" /></a>}
                {inf.youtube && <a href={inf.youtube} className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition"><Youtube className="w-4 h-4 text-red-600" /></a>}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{inf.name}</h1>
              {inf.isVerified && <CheckCircle className="w-5 h-5 text-blue-500" />}
            </div>
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColor[inf.category]}`}>{categoryLabel[inf.category]}</span>
              {inf.country && <span className="text-xs text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3" />{inf.country}</span>}
              {inf.subscription === 'PRO' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">⭐ Pro</span>}
            </div>
            <p className="text-white/55">{inf.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 text-center border border-white/8">
            <p className="text-2xl font-bold text-orange-500">{formatNumber(inf.followers)}</p>
            <p className="text-xs text-white/40">Abonnés</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 text-center border border-white/8">
            <p className="text-2xl font-bold text-green-600">{inf.engagementRate}%</p>
            <p className="text-xs text-white/40">Engagement</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 text-center border border-white/8">
            <p className="text-2xl font-bold text-blue-600">{(inf.languages as string[]).length}</p>
            <p className="text-xs text-white/40">Langues</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Intérêts */}
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 border border-white/8">
            <h2 className="font-semibold text-white mb-3">Centres d&apos;intérêt</h2>
            <div className="flex flex-wrap gap-2">
              {(inf.interests as string[]).map((i, idx) => (
                <span key={idx} className="text-sm bg-orange-500 text-orange-500 px-3 py-1 rounded-full">{i}</span>
              ))}
            </div>
          </div>

          {/* Tarifs */}
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 border border-white/8">
            <h2 className="font-semibold text-white mb-3">Tarifs</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Post / Photo</span><span className="font-semibold">{inf.ratePost}€</span></div>
              <div className="flex justify-between"><span className="text-white/40">Story</span><span className="font-semibold">{inf.rateStory}€</span></div>
              <div className="flex justify-between"><span className="text-white/40">Vidéo / Reel</span><span className="font-semibold">{inf.rateVideo}€</span></div>
            </div>
          </div>

          {/* Langues */}
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 border border-white/8">
            <h2 className="font-semibold text-white mb-3 flex items-center gap-2"><Globe className="w-4 h-4" />Langues</h2>
            <div className="flex flex-wrap gap-2">
              {(inf.languages as string[]).map((l, idx) => (
                <span key={idx} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{l}</span>
              ))}
            </div>
          </div>

          {/* Communauté */}
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-6 border border-white/8">
            <h2 className="font-semibold text-white mb-3">Audience</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Femmes</span><span className="font-semibold">72%</span></div>
              <div className="flex justify-between"><span className="text-white/40">Hommes</span><span className="font-semibold">28%</span></div>
              <div className="flex justify-between"><span className="text-white/40">25-34 ans</span><span className="font-semibold">42%</span></div>
              <div className="flex justify-between"><span className="text-white/40">France</span><span className="font-semibold">68%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
