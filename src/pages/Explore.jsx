import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { useApp } from '../hooks/useApp';
import { CATEGORIES, CONDITIONS, LOCATIONS } from '../data/mock';

const PRICES = { any: ['Any price', 0, Infinity], free: ['Free', 0, 0], u500: ['Under ₹500', 0, 499], mid: ['₹500 – ₹2,000', 500, 2000], high: ['Over ₹2,000', 2001, Infinity] };
const SORTS = { rec: 'Recommended', new: 'Newest', asc: 'Price: Low to High', desc: 'Price: High to Low' };

export default function Explore() {
  const { listings } = useApp();
  const [params, setParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const f = { q: params.get('q') || '', category: params.get('category') || '', condition: params.get('condition') || '', location: params.get('location') || '', price: params.get('price') || 'any', sort: params.get('sort') || 'rec' };
  const set = (k, v) => setParams((p) => { const n = new URLSearchParams(p); v && v !== 'any' && !(k === 'sort' && v === 'rec') ? n.set(k, v) : n.delete(k); return n; }, { replace: true });

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const [, min, max] = PRICES[f.price] || PRICES.any;
    const out = listings.filter((l) => l.status === 'active'
      && (!q || [l.title, l.description, l.category, l.seller, l.location].join(' ').toLowerCase().includes(q))
      && (!f.category || l.category === f.category) && (!f.condition || l.condition === f.condition)
      && (!f.location || l.location === f.location) && l.price >= min && l.price <= max);
    const by = { rec: (a, b) => b.rec - a.rec, new: (a, b) => b.date.localeCompare(a.date), asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price };
    return out.sort(by[f.sort] || by.rec);
  }, [listings, f.q, f.category, f.condition, f.location, f.price, f.sort]);

  const active = ['category', 'condition', 'location'].filter((k) => f[k]).length + (f.price !== 'any' ? 1 : 0);
  const clear = () => setParams({}, { replace: true });

  return (
    <div className="container-x py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Explore items</h1>
      <p className="mt-1 text-muted">Everything students on campus are ready to pass on.</p>

      <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">Search items</label>
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input id="search" type="search" value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Search books, calculators, chairs…" className="input pl-10" />
        </div>
        <div>
          <label htmlFor="sort" className="sr-only">Sort by</label>
          <select id="sort" value={f.sort} onChange={(e) => set('sort', e.target.value)} className="input sm:w-56">
            {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <button type="button" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters} aria-controls="filters" className="btn btn-outline lg:hidden">
          <SlidersHorizontal size={16} aria-hidden="true" />Filters{active > 0 && ` (${active})`}
        </button>
      </form>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Categories">
        {['', ...CATEGORIES].map((c) => (
          <button key={c || 'all'} type="button" onClick={() => set('category', c)} aria-pressed={f.category === c} className={`chip shrink-0 ${f.category === c ? 'chip-on' : ''}`}>{c || 'All'}</button>
        ))}
      </div>

      <div className="mt-4 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside id="filters" aria-label="Filters" className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="card space-y-4 p-5 lg:sticky lg:top-24">
            <h2 className="text-base font-bold">Filters</h2>
            {[['price', 'Price', Object.entries(PRICES).map(([k, v]) => [k, v[0]])],
              ['condition', 'Condition', [['', 'Any condition'], ...CONDITIONS.map((c) => [c, c])]],
              ['location', 'Location', [['', 'Anywhere on campus'], ...LOCATIONS.map((c) => [c, c])]]].map(([key, label, opts]) => (
              <div key={key}>
                <label htmlFor={`f-${key}`} className="label">{label}</label>
                <select id={`f-${key}`} value={f[key]} onChange={(e) => set(key, e.target.value)} className="input">
                  {opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                </select>
              </div>))}
            <button type="button" onClick={clear} className="btn btn-outline w-full"><X size={16} aria-hidden="true" />Clear all</button>
          </div>
        </aside>

        <section aria-label="Results">
          <p className="mb-4 text-sm text-muted" aria-live="polite">{results.length} {results.length === 1 ? 'item' : 'items'} found</p>
          {results.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{results.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
          ) : (
            <div className="card p-10 text-center">
              <h2 className="text-xl font-bold">No items match your search</h2>
              <p className="mt-1 text-muted">Try a different keyword or remove some filters.</p>
              <button type="button" onClick={clear} className="btn btn-primary mt-5">Clear search and filters</button>
            </div>)}
        </section>
      </div>
    </div>
  );
}
