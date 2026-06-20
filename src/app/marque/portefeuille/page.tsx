'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { mockTransactions } from '@/lib/mock-data'
import { Wallet, Plus, X, CreditCard } from 'lucide-react'

function GlassCard({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem' }}>{children}</div>
}

const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none', width: '100%' }
const btnGold: React.CSSProperties = { background: 'rgba(243,112,33,0.2)', border: '1px solid rgba(243,112,33,0.3)', color: '#F37021', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }
const btnGhost: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '9999px', cursor: 'pointer' }

const myTx = mockTransactions.filter(t => t.userId === 'brand-1')

export default function MarquePortefeuillePage() {
  const [balance] = useState(3200)
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [recharged, setRecharged] = useState(false)

  const recharge = () => {
    setShowModal(false)
    setRecharged(true)
    setAmount('')
    setCardNumber('')
    setExpiry('')
    setCvc('')
    setTimeout(() => setRecharged(false), 3000)
  }

  return (
    <div style={{ color: 'white', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Portefeuille</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Gérez vos fonds et transactions</p>
      </div>

      {recharged && (
        <div style={{ background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#30d158', fontSize: '0.875rem' }}>
          ✓ Rechargement effectué avec succès !
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: 'rgba(243,112,33,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} color="#F37021" />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Solde disponible</div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#F37021', marginBottom: '0.25rem' }}>{formatCurrency(balance)}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Mis à jour maintenant</div>
          <button onClick={() => setShowModal(true)} style={{ ...btnGold, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Plus size={14} /> Recharger
          </button>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', fontWeight: 600 }}>Lier un compte bancaire</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>IBAN</label>
              <input style={inputStyle} placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Titulaire</label>
              <input style={inputStyle} placeholder="Nom du titulaire" />
            </div>
            <button style={btnGhost}>Enregistrer le compte</button>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>Historique des transactions</h2>
        {myTx.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>Aucune transaction</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Description', 'Type', 'Montant', 'Date'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myTx.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>{tx.description}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      background: tx.type === 'DEPOSIT' ? 'rgba(48,209,88,0.1)' : 'rgba(10,132,255,0.1)',
                      color: tx.type === 'DEPOSIT' ? '#30d158' : '#0a84ff',
                      border: `1px solid ${tx.type === 'DEPOSIT' ? 'rgba(48,209,88,0.2)' : 'rgba(10,132,255,0.2)'}`,
                      borderRadius: '9999px', padding: '0.15rem 0.6rem', fontSize: '0.7rem', fontWeight: 600
                    }}>{tx.type === 'DEPOSIT' ? 'Dépôt' : 'Campagne'}</span>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 700, color: tx.amount > 0 ? '#30d158' : '#ff453a' }}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{tx.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1.5rem', maxWidth: '400px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={18} color="#F37021" />
                <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>Recharger le portefeuille</h3>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Montant (€)</label>
                <input type="number" style={inputStyle} value={amount} onChange={e => setAmount(e.target.value)} placeholder="500" />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Numéro de carte</label>
                <input style={inputStyle} value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>Expiration</label>
                  <input style={inputStyle} value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/AA" maxLength={5} />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem', display: 'block' }}>CVC</label>
                  <input style={inputStyle} value={cvc} onChange={e => setCvc(e.target.value)} placeholder="123" maxLength={3} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button onClick={recharge} disabled={!amount || !cardNumber || !expiry || !cvc} style={{ ...btnGold, opacity: amount && cardNumber && expiry && cvc ? 1 : 0.5 }}>
                  Recharger {amount ? `${Number(amount).toLocaleString('fr-FR')} €` : ''}
                </button>
                <button onClick={() => setShowModal(false)} style={btnGhost}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
