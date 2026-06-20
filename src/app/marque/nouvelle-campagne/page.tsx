'use client'

import { useState } from 'react'
import { Upload, ArrowRight, ArrowLeft, Check, Plus, X } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%' }
const btnGold: React.CSSProperties = { background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }
const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }

const INTERESTS_OPTS = ['Mode', 'Beauté', 'Lifestyle', 'Sport', 'Fitness', 'Voyage', 'Tech', 'Gaming', 'Gastronomie', 'Culture', 'Nutrition', 'Innovation']
const COUNTRY_OPTS = ['France', 'Belgique', 'Suisse', 'Canada', 'Maroc']
const LANG_OPTS = ['Français', 'Anglais', 'Espagnol', 'Arabe']

export default function NouvellesCampagnePage() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)

  // Step 1
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')

  // Step 2
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [minEngagement, setMinEngagement] = useState('')

  // Step 3
  const [assignMode, setAssignMode] = useState('manual')

  const toggleTag = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const tag = (label: string, active: boolean, onClick: () => void) => (
    <button key={label} onClick={onClick} style={active
      ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.3rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer' }
      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.3rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer' }
    }>{label}</button>
  )

  if (done) {
    return (
      <div style={{ color: 'white', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(48,209,88,0.15)', border: '1px solid rgba(48,209,88,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Check size={28} color="#30d158" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Campagne créée !</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Votre campagne &quot;{title}&quot; a été soumise avec succès. Elle sera examinée par notre équipe.</p>
          <button onClick={() => { setStep(1); setDone(false); setTitle('') }} style={btnGold}>Créer une autre campagne</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem', maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Nouvelle campagne</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, height: '3px', borderRadius: '9999px', background: step >= s ? '#F37021' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          {['Informations', 'Ciblage', 'Récapitulatif'].map((l, i) => (
            <span key={l} style={{ fontSize: '0.7rem', color: step > i ? '#F37021' : 'rgba(255,255,255,0.3)' }}>{l}</span>
          ))}
        </div>
      </div>

      {step === 1 && (
        <GlassCard>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>Informations de la campagne</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Titre *</label>
              <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre de la campagne" />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Brief / Description *</label>
              <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' } as React.CSSProperties} value={description} onChange={e => setDescription(e.target.value)} placeholder="Décrivez votre campagne..." />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Budget (€) *</label>
              <input type="number" style={inputStyle} value={budget} onChange={e => setBudget(e.target.value)} placeholder="Ex: 5000" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Date de début</label>
                <input type="date" style={inputStyle} value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Date de fin</label>
                <input type="date" style={inputStyle} value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Code promo</label>
              <input style={inputStyle} value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Ex: MAISON10" />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>URL du site</label>
              <input style={inputStyle} value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Brief PDF (optionnel)</label>
              <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(243,112,33,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                <Upload size={20} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Glisser-déposer ou cliquer pour uploader</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.25rem' }}>PDF max 10MB</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setStep(2)} disabled={!title || !description || !budget} style={{ ...btnGold, opacity: title && description && budget ? 1 : 0.5, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Suivant <ArrowRight size={14} />
            </button>
          </div>
        </GlassCard>
      )}

      {step === 2 && (
        <GlassCard>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>Ciblage</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', display: 'block' }}>Catégorie d&apos;influenceur</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[['MICRO', 'Micro &lt;10K'], ['MACRO', 'Macro 10K–500K'], ['INTERNATIONAL', 'International 500K+']].map(([k, l]) => (
                  <button key={k} onClick={() => setCategory(category === k ? '' : k)} style={category === k
                    ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '0.75rem', padding: '0.6rem 1rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }
                    : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.6rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
                  }>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', display: 'block' }}>Genre cible</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Tous', 'Femme', 'Homme'].map(g => (
                  <button key={g} onClick={() => setGender(gender === g ? '' : g)} style={gender === g
                    ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }
                    : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
                  }>{g}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', display: 'block' }}>Intérêts</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {INTERESTS_OPTS.map(i => tag(i, interests.includes(i), () => toggleTag(interests, setInterests, i)))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', display: 'block' }}>Pays cibles</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {COUNTRY_OPTS.map(c => tag(c, countries.includes(c), () => toggleTag(countries, setCountries, c)))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', display: 'block' }}>Langues</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {LANG_OPTS.map(l => tag(l, languages.includes(l), () => toggleTag(languages, setLanguages, l)))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Taux d&apos;engagement minimum (%)</label>
              <input type="number" style={inputStyle} value={minEngagement} onChange={e => setMinEngagement(e.target.value)} placeholder="Ex: 3" min="0" max="100" step="0.1" />
            </div>
          </div>
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setStep(1)} style={{ ...btnGhost, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><ArrowLeft size={14} /> Retour</button>
            <button onClick={() => setStep(3)} style={{ ...btnGold, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>Suivant <ArrowRight size={14} /></button>
          </div>
        </GlassCard>
      )}

      {step === 3 && (
        <GlassCard>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>Récapitulatif &amp; Paiement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Campagne</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{title}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{description.substring(0, 100)}{description.length > 100 ? '...' : ''}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {[{ l: 'Budget', v: `${Number(budget).toLocaleString('fr-FR')} €` }, { l: 'Catégorie', v: category || 'Tous' }, { l: 'Début', v: startDate || '-' }, { l: 'Fin', v: endDate || '-' }].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}>{s.l}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.15rem' }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', display: 'block' }}>Mode d&apos;assignation</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[['manual', 'Manuel'], ['auto', 'Automatique']].map(([k, l]) => (
                  <button key={k} onClick={() => setAssignMode(k)} style={assignMode === k
                    ? { background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }
                    : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.4rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }
                  }>{l}</button>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(243,112,33,0.08)', border: '1px solid rgba(243,112,33,0.15)', borderRadius: '0.75rem', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.15rem' }}>Paiement depuis le portefeuille</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Solde actuel: 3 200 €</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F37021' }}>{Number(budget || 0).toLocaleString('fr-FR')} €</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>à débiter</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setStep(2)} style={{ ...btnGhost, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><ArrowLeft size={14} /> Retour</button>
            <button onClick={() => setDone(true)} style={{ ...btnGold, display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={14} /> Lancer la campagne</button>
          </div>
        </GlassCard>
      )}
    </div>
  )
}
