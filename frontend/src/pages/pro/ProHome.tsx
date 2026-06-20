import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Wallet, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';

export default function ProHome() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/shops/me/stats').then(d => setStats(d)).catch(() => {});
  }, []);

  if (!stats) return <div style={{ color: '#9e8e7e', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>Chargement...</div>;

  const cards = [
    { label: 'Articles actifs', value: stats.activeItems, total: stats.totalItems, icon: Package, color: '#c9a96e' },
    { label: 'Commandes', value: stats.totalOrders, sub: `${stats.pendingOrders} en attente`, icon: ShoppingBag, color: '#1a1a1a' },
    { label: 'Revenus', value: `${(stats.totalRevenue || 0).toLocaleString('fr-FR')} €`, icon: Wallet, color: '#2e7d32' },
    { label: 'Enchères actives', value: stats.activeAuctions, icon: TrendingUp, color: '#c9a96e' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '0.25rem' }}>Tableau de bord</h1>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#9e8e7e' }}>Bienvenue sur votre espace boutique</p>
      </div>

      {!stats.shop?.subscription_active && (
        <div style={{ backgroundColor: '#fff8e1', border: '1px solid #c9a96e', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertCircle size={20} color="#c9a96e" />
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 600 }}>Passez au Premium</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.75rem', color: '#666' }}>Articles illimités + 5% de commission seulement. <Link to="/boutique/abonnement" style={{ color: '#c9a96e' }}>En savoir plus →</Link></p>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid #e8d5b7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9e8e7e', marginBottom: '0.5rem' }}>{c.label.toUpperCase()}</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: c.color }}>{c.value}</p>
                {c.sub && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e', marginTop: '4px' }}>{c.sub}</p>}
                {c.total !== undefined && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e', marginTop: '4px' }}>sur {c.total} total</p>}
              </div>
              <c.icon size={24} color={c.color} style={{ opacity: 0.4 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid #e8d5b7' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 400, marginBottom: '1rem', color: '#1a1a1a' }}>Actions rapides</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/boutique/articles/nouveau" className="btn-gold" style={{ textDecoration: 'none', textAlign: 'center', fontSize: '0.75rem' }}>+ Ajouter un article</Link>
            <Link to="/boutique/commandes" className="btn-outline" style={{ textDecoration: 'none', textAlign: 'center', fontSize: '0.75rem' }}>Voir les commandes</Link>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid #e8d5b7' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 400, marginBottom: '1rem', color: '#1a1a1a' }}>Abonnement</h3>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#1a1a1a', marginBottom: '4px' }}>
            {stats.shop?.subscription_active ? '★ Premium actif' : 'Plan gratuit'}
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.75rem', color: '#9e8e7e', marginBottom: '8px' }}>
            Commission: {stats.shop?.commission_rate}%
          </p>
          {stats.shop?.subscription_end && (
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e' }}>
              <Clock size={12} style={{ display: 'inline' }} /> Expire le {new Date(stats.shop.subscription_end).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
