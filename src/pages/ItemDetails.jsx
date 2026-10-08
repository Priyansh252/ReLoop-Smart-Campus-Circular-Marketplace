import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Droplets, Heart, IndianRupee, MapPin, Recycle, Repeat2, ShieldCheck, User } from 'lucide-react';
import ItemArt from '../components/ItemArt';
import ListingCard from '../components/ListingCard';
import Modal from '../components/Modal';
import { useApp } from '../hooks/useApp';
import { formatDate, formatPrice, listingImpact } from '../utils/helpers';

export default function ItemDetails() {
  const { id } = useParams();
  const { listings, isFav, toggleFav, requestExchange, user, notify } = useApp();
  const [open, setOpen] = useState(false);
  const item = listings.find((l) => l.id === id);

  if (!item) return (
    <div className="container-x section text-center"><h1 className="h-section">Item not found</h1>
      <p className="mt-2 text-muted">It may have been exchanged or removed.</p><Link to="/explore" className="btn btn-primary mt-6">Back to Explore</Link></div>);

  const impact = listingImpact(item);
  const similar = listings.filter((l) => l.category === item.category && l.id !== item.id && l.status === 'active').slice(0, 3);
  const mine = item.owner === 'me';
  const confirm = () => { requestExchange(item); setOpen(false); notify(`Exchange request sent to ${item.seller}`); };
  const rows = [[User, 'Seller', item.seller], [MapPin, 'Location', item.location], [CalendarDays, 'Listed', formatDate(item.date)], [ShieldCheck, 'Condition', item.condition]];

  return (
    <div className="container-x py-8 sm:py-12">
      <Link to="/explore" className="btn btn-ghost -ml-3 mb-4"><ArrowLeft size={16} aria-hidden="true" />Back to Explore</Link>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="card overflow-hidden"><ItemArt listing={item} className="aspect-square sm:aspect-[4/3]" size={120} /></div>
        <div>
          <span className="badge">{item.category}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{item.title}</h1>
          <p className="mt-3 text-3xl font-extrabold text-brand">{formatPrice(item.price)}</p>
          <p className="mt-4 leading-relaxed text-muted">{item.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4">
            {rows.map(([I, k, v]) => (<div key={k} className="flex items-start gap-3"><I size={18} className="mt-0.5 text-brand" aria-hidden="true" /><div><dt className="text-xs text-muted">{k}</dt><dd className="font-semibold">{v}</dd></div></div>))}
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => setOpen(true)} disabled={mine || item.status !== 'active'} className="btn btn-primary flex-1 sm:flex-none"><Repeat2 size={16} aria-hidden="true" />{mine ? 'This is your listing' : 'Request exchange'}</button>
            <button type="button" onClick={() => toggleFav(item.id)} aria-pressed={isFav(item.id)} className="btn btn-outline flex-1 sm:flex-none">
              <Heart size={16} className={isFav(item.id) ? 'fill-red-500 text-red-500' : ''} aria-hidden="true" />{isFav(item.id) ? 'Saved' : 'Save item'}</button>
          </div>
          <section aria-labelledby="impact-h" className="card mt-8 bg-brand/5 p-5">
            <h2 id="impact-h" className="text-lg font-bold">Impact of reusing this</h2>
            <ul className="mt-3 grid grid-cols-3 gap-3 text-center">
              {[[Recycle, `${impact.waste} kg`, 'waste avoided'], [Droplets, `${impact.co2} kg`, 'CO₂ avoided'], [IndianRupee, impact.saved.toLocaleString('en-IN'), 'saved vs new']].map(([I, v, l]) => (
                <li key={l}><I size={18} className="mx-auto text-brand" aria-hidden="true" /><p className="mt-1 font-display text-lg font-extrabold">{v}</p><p className="text-xs text-muted">{l}</p></li>))}
            </ul>
          </section>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-14"><h2 className="h-section mb-5">More in {item.category}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similar.map((l) => <ListingCard key={l.id} listing={l} />)}</div></section>)}

      <Modal open={open} onClose={() => setOpen(false)} title="Request this exchange?"
        footer={<><button type="button" className="btn btn-outline" onClick={() => setOpen(false)}>Cancel</button><button type="button" className="btn btn-primary" onClick={confirm}>Send request</button></>}>
        <p>{user ? `${item.seller} will be notified that you are interested in "${item.title}".` : `${item.seller} will be notified. You can sign in later to track the request.`} Agree on the pick-up time and place on campus once they accept.</p>
      </Modal>
    </div>
  );
}
