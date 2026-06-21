'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%' }

const pages = [
  { id: 'home', label: 'Accueil', path: '/' },
  { id: 'influenceurs', label: 'Influenceurs', path: '/influenceurs' },
  { id: 'marques', label: 'Marques', path: '/marques' },
  { id: 'inscription', label: 'Inscription', path: '/auth/inscription' },
  { id: 'connexion', label: 'Connexion', path: '/auth/connexion' },
  { id: 'tarifs', label: 'Tarifs', path: '/tarifs' },
]

const defaultSeo: Record<string, { title: string; description: string; keywords: string }> = {
  home: { title: 'DotTheTalents - Connectez marques et influenceurs', description: 'La plateforme de référence pour connecter les marques avec les meilleurs influenceurs français.', keywords: 'influenceur, marque, marketing, UGC' },
  influenceurs: { title: 'Influenceurs - DotTheTalents', description: 'Découvrez notre réseau d\'influenceurs vérifiés dans tous les secteurs.', keywords: 'influenceur, créateur de contenu, instagram, tiktok' },
  marques: { title: 'Marques partenaires - DotTheTalents', description: 'Les plus grandes marques font confiance à DotTheTalents pour leurs campagnes.', keywords: 'marque, campagne, partenariat' },
  inscription: { title: 'Inscription - DotTheTalents', description: 'Rejoignez DotTheTalents et commencez votre aventure dans le marketing d\'influence.', keywords: 'inscription, créer compte, influenceur' },
  connexion: { title: 'Connexion - DotTheTalents', description: 'Connectez-vous à votre espace DotTheTalents.', keywords: 'connexion, login' },
  tarifs: { title: 'Tarifs - DotTheTalents', description: 'Découvrez nos offres adaptées à tous les profils d\'influenceurs.', keywords: 'tarifs, prix, abonnement, pro' },
}

function CharBar({ value, max, warn, danger }: { value: number; max: number; warn: number; danger: number }) {
  const pct = Math.min((value / max) * 100, 100)
  const color = value >= danger ? '#ff453a' : value >= warn ? '#ff9500' : '#30d158'
  return (
    <div style={{ marginTop: '0.25rem' }}>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '3px' }}>
        <div style={{ width: `${pct}%`, background: color, borderRadius: '9999px', height: '3px', transition: 'width 0.2s' }} />
      </div>
      <div style={{ fontSize: '0.65rem', color: value >= danger ? '#ff453a' : 'rgba(255,255,255,0.3)', marginTop: '0.15rem', textAlign: 'right' }}>{value}/{max}</div>
    </div>
  )
}

export default function AdminSeoPage() {
  const [activePage, setActivePage] = useState('home')
  const [seoData, setSeoData] = useState(defaultSeo)
  const [saved, setSaved] = useState(false)

  const current = seoData[activePage] || { title: '', description: '', keywords: '' }
  const update = (field: string, value: string) => setSeoData(d => ({ ...d, [activePage]: { ...d[activePage], [field]: value } }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>SEO</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Gérez les métadonnées de chaque page</p>
      </div>

      {saved && (
        <div style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#30d158', fontSize: '0.875rem' }}>
          ✓ Paramètres SEO enregistrés
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'start' }}>
        <GlassCard>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>Pages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {pages.map(p => (
              <button key={p.id} onClick={() => setActivePage(p.id)} style={{
                background: activePage === p.id ? 'rgba(243,112,33,0.15)' : 'transparent',
                border: activePage === p.id ? '1px solid rgba(243,112,33,0.3)' : '1px solid transparent',
                color: activePage === p.id ? '#F37021' : 'rgba(255,255,255,0.6)',
                borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', width: '100%',
              }}>
                <div style={{ fontWeight: activePage === p.id ? 600 : 400 }}>{p.label}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{p.path}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GlassCard>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>
              Métadonnées — <span style={{ color: '#F37021' }}>{pages.find(p => p.id === activePage)?.label}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Titre (60 caractères max)</label>
                <input style={inputStyle} value={current.title} onChange={e => update('title', e.target.value)} maxLength={70} placeholder="Titre de la page..." />
                <CharBar value={current.title.length} max={70} warn={55} danger={65} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Description (160 caractères max)</label>
                <textarea
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' } as React.CSSProperties}
                  value={current.description}
                  onChange={e => update('description', e.target.value)}
                  maxLength={200}
                  placeholder="Description de la page..."
                />
                <CharBar value={current.description.length} max={200} warn={140} danger={165} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Mots-clés (séparés par des virgules)</label>
                <input style={inputStyle} value={current.keywords} onChange={e => update('keywords', e.target.value)} placeholder="mot-clé1, mot-clé2, ..." />
              </div>
              <div>
                <button onClick={save} style={{ background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Save size={14} /> Enregistrer
                </button>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>Aperçu Google SERP</div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '1rem', maxWidth: '600px' }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>
                https://dotthetalents.com{pages.find(p => p.id === activePage)?.path}
              </div>
              <div style={{ fontSize: '1rem', color: '#0a84ff', fontWeight: 600, marginBottom: '0.25rem', lineHeight: 1.3 }}>
                {current.title || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Titre de la page</span>}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                {current.description || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Description de la page...</span>}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
