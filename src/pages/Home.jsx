import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Bike, Armchair, Headphones, Leaf, Quote, Recycle, Search, Shirt, Backpack, Pencil, Repeat2, HandCoins, PackagePlus } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { useApp } from '../hooks/useApp';
import { CATEGORIES, STATS, TESTIMONIALS } from '../data/mock';

const CAT_ICONS = { Books: BookOpen, Electronics: Headphones, Transport: Bike, Furniture: Armchair, Clothing: Shirt, Accessories: Backpack, Stationery: Pencil };
const STEPS = [
  { t: 'List', d: 'Snap the details of anything you no longer use.', i: PackagePlus },
  { t: 'Discover', d: 'Browse what students nearby are offering.', i: Search },
  { t: 'Exchange', d: 'Request an item and meet on campus.', i: Repeat2 },
  { t: 'Reuse', d: 'Give it a second life and track your impact.', i: Recycle },
];

function LoopRing() {
  // Four nodes on a circle: LIST → DISCOVER → EXCHANGE → REUSE
  const pos = [['50%', '8%'], ['92%', '50%'], ['50%', '92%'], ['8%', '50%']];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" role="img" aria-label="The ReLoop cycle: list, discover, exchange, reuse">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(var(--brand))" strokeOpacity=".35" strokeWidth=".8" strokeDasharray="2 3" />
        <path d="M50 8a42 42 0 0 1 42 42" fill="none" stroke="rgb(var(--accent))" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-brand text-center text-brand-ink">
        <Repeat2 size={30} aria-hidden="true" /><span className="mt-1 font-display text-lg font-extrabold">ReLoop</span>
      </div>
      {STEPS.map((s, i) => (
        <div key={s.t} className="loop-node" style={{ left: pos[i][0], top: pos[i][1] }}>
          <s.i size={20} className="mb-1 text-brand" aria-hidden="true" />{s.t.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { listings } = useApp();
  const featured = listings.filter((l) => l.featured && l.status === 'active').slice(0, 4);
  return (
    <>
      <section className="border-b border-line">
        <div className="container-x grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="badge mb-5"><Leaf size={14} aria-hidden="true" />Smart campus circular marketplace</p>
            <h1 className="h-display">ReLoop. Give it another loop.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">Sell, swap or donate the books, gadgets and hostel gear you have finished with. Find what you need from students down the corridor and keep good things out of the bin.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="btn btn-primary px-6">Explore items<ArrowRight size={16} aria-hidden="true" /></Link>
              <Link to="/create" className="btn btn-outline px-6">List an item</Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-2 gap-6">
              {STATS.slice(0, 2).map((s) => (<div key={s.label}><dt className="text-sm text-muted">{s.label}</dt><dd className="font-display text-3xl font-extrabold">{s.value}</dd></div>))}
            </dl>
          </div>
          <LoopRing />
        </div>
      </section>

      <section className="section container-x">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><h2 className="h-section">Featured on campus this week</h2><p className="mt-1 text-muted">Hand-picked items that students are asking about.</p></div>
          <Link to="/explore" className="btn btn-ghost hidden sm:inline-flex">See all<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((l) => <ListingCard key={l.id} listing={l} />)}</div>
      </section>

      <section className="bg-sunken/60 py-14">
        <div className="container-x">
          <h2 className="h-section mb-6">Shop by category</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((c) => { const Icon = CAT_ICONS[c]; return (
              <li key={c}><Link to={`/explore?category=${c}`} className="card flex flex-col items-center gap-2 p-4 text-sm font-semibold transition hover:border-brand hover:text-brand">
                <Icon size={26} aria-hidden="true" />{c}</Link></li>); })}
          </ul>
        </div>
      </section>

      <section className="section container-x">
        <h2 className="h-section">Four steps, no waste</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><s.i size={22} aria-hidden="true" /></span>
              <h3 className="mt-4 text-lg font-bold">{i + 1}. {s.t}</h3><p className="mt-1 text-sm text-muted">{s.d}</p>
            </li>))}
        </ol>
      </section>

      <section className="bg-brand text-brand-ink">
        <div className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Every reused item keeps a little more out of landfill.</h2>
            <p className="mt-4 max-w-lg opacity-90">Making a new textbook, chair or cycle takes materials and energy. Passing one on across campus skips all of that. Together, ReLoop members have turned unused things into real savings and real impact.</p>
            <Link to="/impact" className="btn btn-accent mt-6">See campus impact<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (<div key={s.label} className="rounded-2xl bg-white/10 p-5"><dd className="font-display text-3xl font-extrabold">{s.value}</dd><dt className="mt-1 text-sm opacity-90">{s.label}</dt></div>))}
          </dl>
        </div>
      </section>

      <section className="section container-x">
        <h2 className="h-section">Students on ReLoop</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="card flex flex-col p-6">
              <Quote size={22} className="text-accent" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed">{t.quote}</blockquote>
              <p className="mt-5 font-bold">{t.name}</p><p className="text-sm text-muted">{t.role}</p>
            </li>))}
        </ul>
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <div className="card flex flex-col items-start gap-6 bg-sunken/60 p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div><h2 className="h-section">Got something gathering dust?</h2><p className="mt-2 max-w-xl text-muted">List it in under two minutes. Someone on campus is probably looking for it right now.</p></div>
          <div className="flex flex-wrap gap-3"><Link to="/create" className="btn btn-primary"><HandCoins size={16} aria-hidden="true" />List an item</Link><Link to="/signup" className="btn btn-outline">Create account</Link></div>
        </div>
      </section>
    </>
  );
}
