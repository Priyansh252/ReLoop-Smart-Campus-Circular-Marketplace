import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Bell, CheckCheck, Clock, Heart, Leaf, Package, Pencil, Plus, Repeat2, Trash2, X, Check } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import ItemArt from '../components/ItemArt';
import Modal from '../components/Modal';
import Field from '../components/Field';
import { useApp } from '../hooks/useApp';
import { LOCATIONS } from '../data/mock';
import { formatPrice, validatePrice } from '../utils/helpers';

const BADGES = [
  ['Seedling', 'List your first item', (s) => s.active + s.done >= 1],
  ['Loop Starter', 'Complete an exchange', (s) => s.done >= 1],
  ['Community Pillar', 'Complete 3 exchanges', (s) => s.done >= 3],
  ['Eco Hero', 'Reach 500 points', (s) => s.points >= 500],
];

export default function Dashboard() {
  const { user, listings, favorites, requests, resolveRequest, updateListing, deleteListing, markExchanged, notifications, activity, notify } = useApp();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [deleting, setDeleting] = useState(null);

  const mine = listings.filter((l) => l.owner === 'me');
  const active = mine.filter((l) => l.status === 'active');
  const done = mine.filter((l) => l.status === 'exchanged');
  const saved = listings.filter((l) => favorites.includes(l.id));
  const points = 150 + active.length * 60 + done.length * 120;
  const waste = done.reduce((t, l) => t + l.weightKg, 0).toFixed(1);
  const stats = { active: active.length, done: done.length, points };
  const tiles = [[Package, 'Active listings', active.length], [CheckCheck, 'Exchanged items', done.length], [Heart, 'Saved items', saved.length], [Leaf, 'Waste diverted', `${waste} kg`]];

  const openEdit = (l) => { setEditing(l); setForm({ title: l.title, price: String(l.price), location: l.location }); setErrors({}); };
  const saveEdit = () => {
    const e = {};
    if (form.title.trim().length < 3) e.title = 'Name must be at least 3 characters.';
    const pm = validatePrice(form.price); if (pm) e.price = pm;
    setErrors(e);
    if (Object.keys(e).length) return;
    updateListing(editing.id, { title: form.title.trim(), price: Number(form.price), location: form.location });
    setEditing(null); notify('Listing updated');
  };

  return (
    <div className="container-x py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-3xl font-extrabold sm:text-4xl">Hello, {user.name.split(' ')[0]}</h1><p className="mt-1 text-muted">Here is how your items are doing on campus.</p></div>
        <Link to="/create" className="btn btn-primary"><Plus size={16} aria-hidden="true" />List an item</Link>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map(([I, l, v]) => (<li key={l} className="card p-5"><I size={20} className="text-brand" aria-hidden="true" /><p className="mt-3 font-display text-3xl font-extrabold">{v}</p><p className="text-sm text-muted">{l}</p></li>))}
      </ul>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section aria-labelledby="my-h">
            <h2 id="my-h" className="h-section mb-4">Your listings</h2>
            {mine.length === 0 ? (
              <div className="card p-8 text-center"><p className="font-semibold">You have not listed anything yet.</p><Link to="/create" className="btn btn-primary mt-4">Create your first listing</Link></div>
            ) : (
              <ul className="space-y-3">
                {mine.map((l) => (
                  <li key={l.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <ItemArt listing={l} className="h-20 w-full rounded-xl sm:w-24" size={32} />
                    <div className="min-w-0 flex-1">
                      <Link to={`/item/${l.id}`} className="line-clamp-1 font-bold hover:text-brand">{l.title}</Link>
                      <p className="text-sm text-muted">{formatPrice(l.price)} · {l.location}</p>
                      <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${l.status === 'active' ? 'bg-brand/10 text-brand' : 'bg-sunken text-muted'}`}>{l.status === 'active' ? 'Active' : 'Exchanged'}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {l.status === 'active' && <>
                        <button type="button" onClick={() => openEdit(l)} className="btn btn-outline btn-sm" aria-label={`Edit ${l.title}`}><Pencil size={14} aria-hidden="true" />Edit</button>
                        <button type="button" onClick={() => { markExchanged(l.id); notify('Marked as exchanged. Nice loop!'); }} className="btn btn-outline btn-sm" aria-label={`Mark ${l.title} as exchanged`}><CheckCheck size={14} aria-hidden="true" />Exchanged</button></>}
                      <button type="button" onClick={() => setDeleting(l)} className="btn btn-ghost btn-sm text-red-600 dark:text-red-400" aria-label={`Delete ${l.title}`}><Trash2 size={14} aria-hidden="true" />Delete</button>
                    </div>
                  </li>))}
              </ul>)}
          </section>

          <section aria-labelledby="req-h">
            <h2 id="req-h" className="h-section mb-4">Exchange requests</h2>
            <ul className="space-y-3">
              {requests.map((r) => (
                <li key={r.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="min-w-0"><p className="font-semibold"><Repeat2 size={14} className="mr-1.5 inline text-brand" aria-hidden="true" />{r.dir === 'in' ? `${r.person} wants` : `You asked ${r.person} for`} “{r.item}”</p><p className="text-sm text-muted">{r.note}</p></div>
                  {r.status !== 'pending' ? <span className="badge capitalize">{r.status}</span>
                    : r.dir === 'in' ? <div className="flex gap-2">
                      <button type="button" onClick={() => resolveRequest(r.id, 'accepted')} className="btn btn-primary btn-sm"><Check size={14} aria-hidden="true" />Accept</button>
                      <button type="button" onClick={() => resolveRequest(r.id, 'declined')} className="btn btn-outline btn-sm"><X size={14} aria-hidden="true" />Decline</button></div>
                    : <span className="badge">Awaiting reply</span>}
                </li>))}
            </ul>
          </section>

          <section aria-labelledby="saved-h">
            <h2 id="saved-h" className="h-section mb-4">Saved items</h2>
            {saved.length ? <div className="grid gap-5 sm:grid-cols-2">{saved.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
              : <div className="card p-8 text-center"><p className="text-muted">Tap the heart on any item to save it here.</p><Link to="/explore" className="btn btn-outline mt-4">Browse items</Link></div>}
          </section>
        </div>

        <aside className="space-y-8" aria-label="Activity and rewards">
          <section className="card p-5" aria-labelledby="pts-h">
            <h2 id="pts-h" className="flex items-center gap-2 text-lg font-bold"><Award size={20} className="text-accent" aria-hidden="true" />ReLoop points</h2>
            <p className="mt-2 font-display text-4xl font-extrabold text-brand">{points}</p>
            <ul className="mt-4 space-y-2">
              {BADGES.map(([n, d, ok]) => { const got = ok(stats); return (
                <li key={n} className={`flex items-center gap-3 rounded-xl border p-3 ${got ? 'border-brand/40 bg-brand/5' : 'border-line opacity-60'}`}>
                  <Award size={20} className={got ? 'text-brand' : 'text-muted'} aria-hidden="true" />
                  <div><p className="text-sm font-bold">{n}{got ? '' : ' (locked)'}</p><p className="text-xs text-muted">{d}</p></div></li>); })}
            </ul>
          </section>
          <section className="card p-5" aria-labelledby="not-h">
            <h2 id="not-h" className="flex items-center gap-2 text-lg font-bold"><Bell size={18} aria-hidden="true" />Notifications</h2>
            <ul className="mt-3 space-y-3 text-sm">{notifications.map((n) => (<li key={n.id}><p>{n.text}</p><p className="text-xs text-muted">{n.time}</p></li>))}</ul>
          </section>
          <section className="card p-5" aria-labelledby="act-h">
            <h2 id="act-h" className="flex items-center gap-2 text-lg font-bold"><Clock size={18} aria-hidden="true" />Recent activity</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">{activity.map((a, i) => <li key={i} className="border-l-2 border-brand/40 pl-3">{a}</li>)}</ul>
          </section>
        </aside>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit listing"
        footer={<><button type="button" className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button><button type="button" className="btn btn-primary" onClick={saveEdit}>Save changes</button></>}>
        <div className="space-y-4 text-ink">
          <Field label="Item name" value={form.title || ''} error={errors.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Field label="Price (₹)" type="number" min="0" value={form.price || ''} error={errors.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Field as="select" label="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })}>{LOCATIONS.map((c) => <option key={c}>{c}</option>)}</Field>
        </div>
      </Modal>
      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete this listing?"
        footer={<><button type="button" className="btn btn-outline" onClick={() => setDeleting(null)}>Keep it</button>
          <button type="button" className="btn btn-danger" onClick={() => { deleteListing(deleting.id); setDeleting(null); notify('Listing deleted'); }}>Delete listing</button></>}>
        <p>“{deleting?.title}” will be removed from ReLoop. This cannot be undone.</p>
      </Modal>
    </div>
  );
}
