import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../lib/store';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useStore();

  const isAuctions = location.search.includes('type=auction') || location.pathname === '/catalogue' && location.search.includes('auction');
  const isSales = location.search.includes('type=fixed');

  const handleFavorites = () => {
    if (!user) return;
    navigate('/favoris');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      width: 'calc(100% - 40px)',
      maxWidth: '480px',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
      }}>
        {/* Vente */}
        <Link
          to="/catalogue?type=fixed"
          style={{
            flex: 1,
            textAlign: 'center',
            textDecoration: 'none',
            padding: '8px 12px',
            borderRadius: '40px',
            background: isSales ? 'rgba(201, 169, 110, 0.9)' : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: isSales ? 'white' : '#1a1a1a',
          }}>
            VENTE
          </span>
        </Link>

        {/* Heart — center */}
        <button
          onClick={handleFavorites}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #c9a96e, #b8935a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(201, 169, 110, 0.5)',
            flexShrink: 0,
            margin: '0 8px',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(201, 169, 110, 0.6)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(201, 169, 110, 0.5)';
          }}
        >
          <Heart size={22} color="white" fill="white" />
        </button>

        {/* Enchères */}
        <Link
          to="/catalogue?type=auction"
          style={{
            flex: 1,
            textAlign: 'center',
            textDecoration: 'none',
            padding: '8px 12px',
            borderRadius: '40px',
            background: isAuctions ? 'rgba(201, 169, 110, 0.9)' : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: isAuctions ? 'white' : '#1a1a1a',
          }}>
            ENCHÈRES
          </span>
        </Link>
      </div>
    </div>
  );
}
