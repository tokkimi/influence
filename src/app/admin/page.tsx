import { mockInfluencers, mockCampaigns } from '@/lib/mock-data'
import { Users, Building2, BarChart3, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react'

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`} style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}}>
      {children}
    </div>
  )
}

export default function AdminDashboard() {
  const stats = [
    { label: 'Influenceurs', value: '5 420', delta: '+42', icon: Users, color: '#F37021' },
    { label: 'Marques', value: '847', delta: '+12', icon: Building2, color: '#0a84ff' },
    { label: 'Campagnes actives', value: '156', delta: '23 en attente', icon: BarChart3, color: '#30d158' },
    { label: 'Revenus', value: '42 800 €', delta: '+18%', icon: DollarSign, color: '#F37021' },
  ]
  const bars = [38,52,44,68,55,72,60,80,65,88,74,95]
  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-lg font-bold text-white">Administration</h1>
        <p className="text-xs text-white/30 mt-0.5">Vue d&apos;ensemble de la plateforme</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {stats.map((s) => (
          <GlassCard key={s.label}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:`${s.color}18`}}>
                <s.icon className="w-4 h-4" style={{color: s.color}} />
              </div>
              <span className="text-[10px] font-semibold" style={{color: s.color}}>{s.delta}</span>
            </div>
            <p className="text-xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-semibold text-white">Revenus mensuels</p>
              <p className="text-xs text-white/30">12 derniers mois</p>
            </div>
            <div className="flex items-center gap-1 text-[#30d158]">
              <TrendingUp className="w-3.5 h-3.5" /><span className="text-xs font-semibold">+18%</span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`, background: i === bars.length-1 ? '#F37021' : 'rgba(255,255,255,0.1)'}} />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {months.map(m => <span key={m} className="text-[8px] text-white/20">{m}</span>)}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-white">Talents récents</p>
            <ArrowUpRight className="w-4 h-4 text-white/20" />
          </div>
          <div className="space-y-3">
            {mockInfluencers.slice(0, 5).map(inf => (
              <div key={inf.id} className="flex items-center gap-2.5">
                <img src={inf.photo} alt={inf.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{inf.name}</p>
                  <p className="text-[10px] text-white/30">{inf.instagram}</p>
                </div>
                {inf.isVerified && <div className="w-1.5 h-1.5 rounded-full bg-[#30d158] flex-shrink-0" />}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-white">Campagnes récentes</p>
            <ArrowUpRight className="w-4 h-4 text-white/20" />
          </div>
          <div className="space-y-0">
            {mockCampaigns.slice(0, 5).map((camp, i) => (
              <div key={camp.id} className="flex items-center justify-between py-3" style={{borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none'}}>
                <div>
                  <p className="text-xs font-medium text-white">{camp.title}</p>
                  <p className="text-[10px] text-white/30">{camp.brandName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xs font-semibold text-white">{camp.budget.toLocaleString('fr-FR')} €</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={camp.status === 'ACTIVE' ? {background:'rgba(48,209,88,0.15)', color:'#30d158'} : {background:'rgba(255,149,0,0.15)', color:'#ff9500'}}>
                    {camp.status === 'ACTIVE' ? 'Active' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
