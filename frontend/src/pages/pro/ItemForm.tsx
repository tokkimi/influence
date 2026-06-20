import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { api, uploadFiles, imgUrl } from '../../lib/api';

const CONDITIONS = [
  { value: 'excellent', label: 'Excellent état (comme neuf)' },
  { value: 'very_good', label: 'Très bon état (légères traces)' },
  { value: 'good', label: 'Bon état (traces d\'usure visibles)' },
  { value: 'fair', label: 'État correct (imperfections notables)' },
];

export default function ItemForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id && id !== 'nouveau';

  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '', description: '', brand: '', category_id: '', condition: 'very_good',
    size: '', color: '', material: '', photos: [] as string[],
    fixed_price: '', auction_enabled: false, auction_start_price: '', auction_min_price: '',
    auction_end_time: '', status: 'draft', seo_title: '', seo_description: '', seo_keywords: '',
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categories').then(d => setCategories(d.categories || [])).catch(() => {});
    if (isEdit) {
      api.get(`/items/${id}`).then(d => {
        const i = d.item;
        setForm({
          title: i.title || '', description: i.description || '', brand: i.brand || '',
          category_id: i.category_id || '', condition: i.condition || 'very_good',
          size: i.size || '', color: i.color || '', material: i.material || '',
          photos: i.photos || [], fixed_price: i.fixed_price?.toString() || '',
          auction_enabled: !!i.auction_enabled, auction_start_price: i.auction_start_price?.toString() || '',
          auction_min_price: i.auction_min_price?.toString() || '',
          auction_end_time: i.auction_end_time ? i.auction_end_time.slice(0, 16) : '',
          status: i.status || 'draft', seo_title: i.seo_title || '',
          seo_description: i.seo_description || '', seo_keywords: i.seo_keywords || '',
        });
      }).catch(() => navigate('/boutique/articles'));
    }
  }, [id]);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handlePhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    try {
      const urls = await uploadFiles(Array.from(e.target.files));
      set('photos', [...form.photos, ...urls]);
    } catch { setError('Erreur upload photos'); } finally { setUploading(false); }
  };

  const removePhoto = (i: number) => set('photos', form.photos.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent, statusOverride?: string) => {
    e.preventDefault();
    setError(''); setSaving(true);
    try {
      const body = {
        ...form,
        fixed_price: form.fixed_price ? parseFloat(form.fixed_price) : null,
        auction_start_price: form.auction_start_price ? parseFloat(form.auction_start_price) : null,
        auction_min_price: form.auction_min_price ? parseFloat(form.auction_min_price) : null,
        status: statusOverride || form.status,
      };
      if (isEdit) await api.put(`/items/${id}`, body);
      else await api.post('/items', body);
      navigate('/boutique/articles');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const rootCats = categories.filter(c => !c.parent_id);
  const subCats = categories.filter(c => form.category_id && c.parent_id === rootCats.find(r => r.id === form.category_id)?.id);

  return (
    <div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '2rem' }}>
        {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
      </h1>

      {error && <div style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Section title="INFORMATIONS ARTICLE">
              <Field label="Titre *"><input required value={form.title} onChange={e => set('title', e.target.value)} style={inp} placeholder="Ex: Sac Chanel 2.55 Noir" /></Field>
              <Field label="Marque *"><input required value={form.brand} onChange={e => set('brand', e.target.value)} style={inp} placeholder="Ex: Chanel" /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Catégorie">
                  <select value={form.category_id} onChange={e => set('category_id', e.target.value)} style={{ ...inp, backgroundColor: 'white' }}>
                    <option value="">Choisir...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.parent_id ? '  └ ' : ''}{c.name_fr}</option>
                    ))}
                  </select>
                </Field>
                <Field label="État *">
                  <select required value={form.condition} onChange={e => set('condition', e.target.value)} style={{ ...inp, backgroundColor: 'white' }}>
                    {CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Description">
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} style={{ ...inp, resize: 'vertical' }} placeholder="Décrivez l'article en détail..." />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <Field label="Taille"><input value={form.size} onChange={e => set('size', e.target.value)} style={inp} placeholder="36, S, Unique..." /></Field>
                <Field label="Couleur"><input value={form.color} onChange={e => set('color', e.target.value)} style={inp} placeholder="Noir, Beige..." /></Field>
                <Field label="Matière"><input value={form.material} onChange={e => set('material', e.target.value)} style={inp} placeholder="Cuir, Soie..." /></Field>
              </div>
            </Section>

            <Section title="SEO (RÉFÉRENCEMENT)">
              <Field label="Titre SEO"><input value={form.seo_title} onChange={e => set('seo_title', e.target.value)} style={inp} /></Field>
              <Field label="Description SEO"><textarea value={form.seo_description} onChange={e => set('seo_description', e.target.value)} rows={2} style={{ ...inp, resize: 'vertical' }} /></Field>
              <Field label="Mots-clés"><input value={form.seo_keywords} onChange={e => set('seo_keywords', e.target.value)} style={inp} placeholder="luxe, sac, Chanel..." /></Field>
            </Section>
          </div>

          {/* Right: Photos & Price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Section title="PHOTOS">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {form.photos.map((p, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#f8f4ef' }}>
                    <img src={imgUrl(p)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={() => removePhoto(i)}
                      style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', color: 'white', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={12} />
                    </button>
                    {i === 0 && <span style={{ position: 'absolute', bottom: '4px', left: '4px', backgroundColor: '#c9a96e', color: 'white', fontSize: '0.55rem', padding: '2px 6px', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>PRINCIPALE</span>}
                  </div>
                ))}
                <label style={{ aspectRatio: '3/4', backgroundColor: '#f0ece6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #e8d5b7', gap: '6px' }}>
                  <Upload size={20} color="#9e8e7e" />
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: '#9e8e7e' }}>{uploading ? 'Upload...' : 'Ajouter'}</span>
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePhotos} disabled={uploading} />
                </label>
              </div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e' }}>La première photo est l'image principale. Max 10 photos, 10 Mo chacune.</p>
            </Section>

            <Section title="PRIX DE VENTE">
              <Field label="Prix fixe (€)">
                <input type="number" value={form.fixed_price} onChange={e => set('fixed_price', e.target.value)} style={inp} placeholder="0.00" min="0" step="0.01" />
              </Field>
            </Section>

            <Section title="ENCHÈRES">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '1rem' }}>
                <input type="checkbox" checked={form.auction_enabled} onChange={e => set('auction_enabled', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#c9a96e' }} />
                <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#1a1a1a' }}>Activer les enchères</span>
              </label>
              {form.auction_enabled && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Mise de départ (€)"><input type="number" value={form.auction_start_price} onChange={e => set('auction_start_price', e.target.value)} style={inp} min="0" step="0.01" /></Field>
                    <Field label="Prix minimum (€)"><input type="number" value={form.auction_min_price} onChange={e => set('auction_min_price', e.target.value)} style={inp} min="0" step="0.01" /></Field>
                  </div>
                  <Field label="Date de fin">
                    <input type="datetime-local" value={form.auction_end_time} onChange={e => set('auction_end_time', e.target.value)} style={inp} />
                  </Field>
                </>
              )}
            </Section>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e8d5b7' }}>
          <button type="button" disabled={saving} onClick={e => handleSubmit(e as any, 'draft')} className="btn-outline">
            Sauvegarder brouillon
          </button>
          <button type="button" disabled={saving} onClick={e => handleSubmit(e as any, 'active')} className="btn-gold">
            {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Mettre en ligne'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #e8d5b7', padding: '1.5rem' }}>
      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#9e8e7e', marginBottom: '1rem' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9e8e7e', marginBottom: '5px' }}>{label.toUpperCase()}</label>
      {children}
    </div>
  );
}

const inp: React.CSSProperties = {
  width: '100%', border: '1px solid #e8d5b7', padding: '9px 12px',
  fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.85rem', color: '#1a1a1a',
};
