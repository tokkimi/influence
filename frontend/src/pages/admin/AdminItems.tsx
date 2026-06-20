import { useEffect, useState } from 'react';
import { Eye, Star, Pause, Play, Trash2, Edit } from 'lucide-react';
import { api, imgUrl } from '../../lib/api';
import { Link } from 'react-router-dom';
import { STATIC_ITEMS } from '../../lib/staticItems';

export default function AdminItems() {
  const [items, setItems] = useState<any[]>(STATIC_ITEMS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/admin/items').then(d => {
      if (d.items?.length) setItems(d.items);
    }).catch(() => {});
  }, []);

  const setStatus = async (id: string, status: string) => {
    await api.put(`/admin/items/${id}/status`, { status });
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const toggleFeature = async (id: string, current: number) => {
    await api.put(`/admin/items/${id}/feature`, { featured: !current });
    setItems(prev => prev.map(i => i.id === id ? { ...i, featured: current ? 0 : 1 } : i));
  };

  const removeItem = async (id: string) => {
    if (!confirm('Retirer cet article ?')) return;
    await api.delete(`/admin/items/${id}`);
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'removed' } : i));
  };

  const filtered = items.filter(i => {
    const m = i.title?.toLowerCase().includes(search.toLowerCase()) || i.brand?.toLowerCase().includes(search.toLowerCase());
    if (filter === 'active') return m && i.status === 'active';
    if (filter === 'auction') return m && i.auction_enabled;
    if (filter === 'suspended') return m && i.status === 'suspended';
    if (filter === 'featured') return m && i.featured;
    return m;
  });

  const statusColors: Record<string, string> = { active: '#2e7d32', draft: '#9e8e7e', suspended: '#ff9800', sold: '#1976d2', removed: '#cc0000' };
  const statusLabels: Record<string, string> = { active: 'En ligne', draft: 'Brouillon', suspended: 'Suspendu', sold: 'Vendu', removed: 'Retiré' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 400, color: '#1a1a1a' }}>Articles ({filtered.length})</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
            style={{ border: '1px solid #e8d5b7', padding: '6px 12px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', width: '200px' }} />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ border: '1px solid #e8d5b7', padding: '6px 12px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', backgroundColor: 'white' }}>
            <option value="all">Tous</option>
            <option value="active">En ligne</option>
            <option value="auction">Enchères</option>
            <option value="suspended">Suspendus</option>
            <option value="featured">Mis en avant</option>
          </select>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', border: '1px solid #e8d5b7', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e8d5b7', backgroundColor: '#f8f4ef' }}>
              {['Article', 'Boutique', 'Prix', 'Statut', 'Vues', 'Enchère', 'Mis en avant', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#9e8e7e' }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f0ece6' }}>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={imgUrl(item.photos?.[0])} alt="" style={{ width: '40px', height: '50px', objectFit: 'cover', backgroundColor: '#f8f4ef' }} />
                    <div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#1a1a1a' }}>{item.title?.slice(0, 30)}</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: '#c9a96e' }}>{item.brand}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.78rem', color: '#666' }}>{item.shop_name}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'Georgia, serif', fontSize: '0.85rem' }}>
                  {item.fixed_price ? `${item.fixed_price.toLocaleString('fr-FR')} €` : item.auction_start_price ? `${item.auction_start_price.toLocaleString('fr-FR')} €` : '-'}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: statusColors[item.status] || '#9e8e7e', fontWeight: 600 }}>
                    {statusLabels[item.status] || item.status}
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.78rem', color: '#1a1a1a' }}>
                    <Eye size={12} color="#9e8e7e" /> {item.views || 0}
                  </div>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  {item.auction_enabled ? (
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#c9a96e' }}>
                      {item.current_bid ? `${item.current_bid.toLocaleString('fr-FR')} €` : '—'}
                    </span>
                  ) : '-'}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <button onClick={() => toggleFeature(item.id, item.featured)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Star size={16} fill={item.featured ? '#c9a96e' : 'none'} color={item.featured ? '#c9a96e' : '#ccc'} />
                  </button>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {item.status === 'active' ? (
                      <button onClick={() => setStatus(item.id, 'suspended')} title="Suspendre" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff9800' }}><Pause size={15} /></button>
                    ) : item.status === 'suspended' || item.status === 'draft' ? (
                      <button onClick={() => setStatus(item.id, 'active')} title="Mettre en ligne" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2e7d32' }}><Play size={15} /></button>
                    ) : null}
                    <button onClick={() => removeItem(item.id)} title="Retirer" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cc0000' }}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
