'use client'

import { useState } from 'react'
import { Send, Users, Check } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%' }

const subscribers = [
  { email: 'sophie@example.com', name: 'Sophie Martin', role: 'Influenceur', date: '12/09/2024' },
  { email: 'lucas@example.com', name: 'Lucas Dubois', role: 'Influenceur', date: '15/09/2024' },
  { email: 'contact@loreal.fr', name: "L'Oréal Paris", role: 'Marque', date: '01/10/2024' },
  { email: 'nike@example.com', name: 'Nike France', role: 'Marque', date: '05/10/2024' },
  { email: 'emma@example.com', name: 'Emma Laurent', role: 'Influenceur', date: '10/10/2024' },
  { email: 'thomas@example.com', name: 'Thomas Bernard', role: 'Influenceur', date: '12/10/2024' },
]

export default function AdminNewsletterPage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)
  const [preview, setPreview] = useState(false)

  const send = () => {
    if (!subject || !body) return
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setSubject('')
    setBody('')
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Newsletter</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Envoyez une newsletter à vos abonnés</p>
      </div>

      {sent && (
        <div style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#30d158', fontSize: '0.875rem' }}>
          <Check size={16} /> Newsletter envoyée avec succès à {subscribers.length} abonnés !
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GlassCard>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>Composer</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Objet</label>
                <input style={inputStyle} placeholder="Objet de la newsletter..." value={subject} onChange={e => setSubject(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Contenu</label>
                <textarea
                  style={{ ...inputStyle, minHeight: '240px', resize: 'vertical' } as React.CSSProperties}
                  placeholder="Rédigez votre newsletter..."
                  value={body}
                  onChange={e => setBody(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={send} disabled={!subject || !body} style={{ background: subject && body ? 'rgba(243,112,33,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${subject && body ? 'rgba(243,112,33,0.3)' : 'rgba(255,255,255,0.08)'}`, color: subject && body ? '#F37021' : 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: subject && body ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Send size={14} /> Envoyer ({subscribers.length} abonnés)
                </button>
                <button onClick={() => setPreview(!preview)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }}>
                  {preview ? 'Masquer' : 'Aperçu'}
                </button>
              </div>
            </div>
          </GlassCard>

          {preview && subject && body && (
            <GlassCard>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Aperçu email</div>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>De: newsletter@dotthetalents.com</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F37021' }}>{subject}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{body}</div>
              </div>
            </GlassCard>
          )}
        </div>

        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Users size={16} color="#F37021" />
            <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Abonnés</span>
            <span style={{ background: 'rgba(243,112,33,0.15)', color: '#F37021', border: '1px solid rgba(243,112,33,0.3)', borderRadius: '9999px', padding: '0.1rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, marginLeft: 'auto' }}>{subscribers.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {subscribers.map(s => (
              <div key={s.email} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{s.email}</div>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: s.role === 'Marque' ? '#0a84ff' : '#F37021', background: s.role === 'Marque' ? 'rgba(10,132,255,0.1)' : 'rgba(243,112,33,0.1)', borderRadius: '9999px', padding: '0.1rem 0.4rem' }}>{s.role}</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.25rem' }}>Inscrit le {s.date}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
