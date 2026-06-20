import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { api } from '../lib/api';
import { useT } from '../lib/store';
import ItemCard from '../components/ItemCard';

function SkeletonCard() {
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8f4ef' }}>
      <div style={{ aspectRatio: '3/4', background: 'linear-gradient(90deg, #f0ece6 25%, #f8f4ef 50%, #f0ece6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
      <div style={{ padding: '10px' }}>
        <div style={{ height: '8px', backgroundColor: '#e8d5b7', borderRadius: '4px', width: '50%', marginBottom: '8px' }} />
        <div style={{ height: '10px', backgroundColor: '#ede8e2', borderRadius: '4px', width: '80%', marginBottom: '6px' }} />
        <div style={{ height: '10px', backgroundColor: '#ede8e2', borderRadius: '4px', width: '40%' }} />
      </div>
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
  maxWidth: '1200px',
  margin: '0 auto',
};

export default function Home() {
  const t = useT();
  const [auctions, setAuctions] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/items?type=auction&limit=6&status=active').catch(() => ({ items: [] })),
      api.get('/items?type=fixed&limit=6&status=active').catch(() => ({ items: [] })),
    ]).then(([a, s]) => {
      setAuctions(a.items || []);
      setSales(s.items || []);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ paddingBottom: '100px', backgroundColor: '#faf7f4' }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @media(min-width:640px){ .home-grid{ grid-template-columns: repeat(3,1fr) !important; } }
        @media(min-width:1024px){ .home-grid{ grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>

      {/* Hero */}
      <div style={{ position: 'relative', backgroundColor: '#1a1a1a', minHeight: '55vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 60%, #1a1a1a 100%)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '45%', height: '80%', opacity: 0.08, backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem 1.5rem', maxWidth: '560px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '0.75rem' }}>
            MAGALI BERDAH · MODE DE LUXE
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.7rem, 5vw, 3rem)', color: 'white', fontWeight: 400, lineHeight: '1.2', marginBottom: '1rem' }}>
            Des pièces d'exception,{' '}
            <span style={{ color: '#c9a96e' }}>vendues ou aux enchères.</span>
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/catalogue?type=fixed" className="btn-gold" style={{ fontSize: '0.7rem', padding: '10px 18px' }}>VENTE DIRECTE</Link>
            <Link to="/catalogue?type=auction" className="btn-outline" style={{ borderColor: '#c9a96e', color: '#c9a96e', fontSize: '0.7rem', padding: '10px 18px' }}>ENCHÈRES EN COURS</Link>
          </div>
        </div>
      </div>

      {/* Enchères */}
      <div style={{ padding: '2rem 1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', maxWidth: '1200px', margin: '0 auto 1rem' }}>
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: '#c9a96e', marginBottom: '2px' }}>EN COURS</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 400, color: '#1a1a1a' }}>{t('featuredAuctions')}</h2>
          </div>
          <Link to="/catalogue?type=auction" style={{ display: 'flex', alignItems: 'center', gap: '3px', textDecoration: 'none', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: '#9e8e7e' }}>
            Tout voir <ChevronRight size={12} />
          </Link>
        </div>
        <div style={gridStyle} className="home-grid">
          {loading
            ? [1,2,3,4].map(i => <SkeletonCard key={i} />)
            : auctions.map(item => <ItemCard key={item.id} item={item} />)
          }
        </div>
      </div>

      {/* Séparateur */}
      <div style={{ padding: '0 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0.5rem auto', borderTop: '1px solid #e8d5b7' }} />
      </div>

      {/* Vente directe */}
      <div style={{ padding: '1.5rem 1rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', maxWidth: '1200px', margin: '0 auto 1rem' }}>
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: '#c9a96e', marginBottom: '2px' }}>DISPONIBLES</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 400, color: '#1a1a1a' }}>Vente directe</h2>
          </div>
          <Link to="/catalogue?type=fixed" style={{ display: 'flex', alignItems: 'center', gap: '3px', textDecoration: 'none', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: '#9e8e7e' }}>
            Tout voir <ChevronRight size={12} />
          </Link>
        </div>
        <div style={gridStyle} className="home-grid">
          {loading
            ? [1,2,3,4].map(i => <SkeletonCard key={i} />)
            : sales.map(item => <ItemCard key={item.id} item={item} />)
          }
        </div>
      </div>

      {/* Pro CTA */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '3rem 1.5rem', textAlign: 'center', margin: '0 0' }}>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '0.75rem' }}>VOUS ÊTES UN PROFESSIONNEL ?</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: 'white', marginBottom: '0.75rem' }}>Ouvrez votre boutique</h2>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#9e8e7e', marginBottom: '1.5rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
          Vendez vos pièces de luxe. 10 articles gratuits, Premium 129€/mois.
        </p>
        <Link to="/pro" className="btn-gold">CRÉER MA BOUTIQUE</Link>
      </div>
    </div>
  );
}
