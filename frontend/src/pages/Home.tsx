import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { api, imgUrl } from '../lib/api';
import { useT } from '../lib/store';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const t = useT();
  const [featured, setFeatured] = useState<any[]>([]);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [newItems, setNewItems] = useState<any[]>([]);

  useEffect(() => {
    api.get('/items?featured=true&limit=8').then(d => setFeatured(d.items || [])).catch(() => {});
    api.get('/items?type=auction&limit=4').then(d => setAuctions(d.items || [])).catch(() => {});
    api.get('/items?limit=8&sort=created_at').then(d => setNewItems(d.items || [])).catch(() => {});
  }, []);

  const categories = [
    { key: 'women', label: 'FEMME', sub: 'Robes, Hauts, Chaussures', img: '/api/placeholder/400/500', to: '/catalogue?category=women' },
    { key: 'men', label: 'HOMME', sub: 'Costumes, Chemises, Chaussures', img: '/api/placeholder/400/500', to: '/catalogue?category=men' },
    { key: 'bags', label: 'SACS', sub: 'Hermès, Chanel, Vuitton', img: '/api/placeholder/400/500', to: '/catalogue?category=bags' },
    { key: 'accessories', label: 'ACCESSOIRES', sub: 'Bijoux, Montres, Ceintures', img: '/api/placeholder/400/500', to: '/catalogue?category=accessories' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', backgroundColor: '#1a1a1a', minHeight: '85vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 50%, #1a1a1a 100%)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '45%', height: '80%', opacity: 0.15, backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '4rem', maxWidth: '700px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '1.5rem' }}>
            MAGALI BERDAH · MODE DE LUXE
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', fontWeight: 400, lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Des pièces d'exception,<br />
            <span style={{ color: '#c9a96e' }}>vendues ou aux enchères.</span>
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '1rem', color: '#9e8e7e', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '500px' }}>
            Découvrez une sélection exclusive de vêtements et accessoires de luxe, directement depuis des boutiques vérifiées.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/catalogue" className="btn-gold">EXPLORER LES PIÈCES</Link>
            <Link to="/catalogue?type=auction" className="btn-outline" style={{ borderColor: '#c9a96e', color: '#c9a96e' }}>VOIR LES ENCHÈRES</Link>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div style={{ padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '0.75rem' }}>NOS UNIVERS</p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#1a1a1a' }}>Explorez par catégorie</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {categories.map(cat => (
            <Link key={cat.key} to={cat.to} style={{ textDecoration: 'none', position: 'relative', overflow: 'hidden', display: 'block', aspectRatio: '4/5' }} className="card-hover">
              <img src={imgUrl(cat.img)} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: 'white', letterSpacing: '0.05em' }}>{cat.label}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#c9a96e', marginTop: '4px' }}>{cat.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Auctions */}
      {auctions.length > 0 && (
        <div style={{ backgroundColor: '#f8f4ef', padding: '5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '0.75rem' }}>EN COURS</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#1a1a1a' }}>{t('featuredAuctions')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {auctions.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/catalogue?type=auction" className="btn-outline">
              VOIR TOUTES LES ENCHÈRES <ChevronRight size={14} style={{ display: 'inline' }} />
            </Link>
          </div>
        </div>
      )}

      {/* New arrivals */}
      {newItems.length > 0 && (
        <div style={{ padding: '5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '0.75rem' }}>DERNIÈRES ARRIVÉES</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#1a1a1a' }}>{t('newItems')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {newItems.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/catalogue" className="btn-gold">VOIR TOUT LE CATALOGUE</Link>
          </div>
        </div>
      )}

      {/* Pro CTA */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '1rem' }}>VOUS ÊTES UN PROFESSIONNEL ?</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: 'white', marginBottom: '1rem' }}>Ouvrez votre boutique</h2>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.9rem', color: '#9e8e7e', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Vendez et mettez aux enchères vos pièces de luxe. Jusqu'à 10 articles gratuits, abonnement Premium à partir de 129€/mois.
        </p>
        <Link to="/pro" className="btn-gold">CRÉER MA BOUTIQUE</Link>
      </div>
    </div>
  );
}
