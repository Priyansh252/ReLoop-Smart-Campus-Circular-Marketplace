import { useState } from 'react';
import { ChevronDown, HandHeart, Leaf, Recycle, Repeat2, Search, PackagePlus, ShieldCheck, ArrowDown } from 'lucide-react';
import { FAQS } from '../data/mock';

const STEPS = [[PackagePlus, 'List', 'Add a photo-style card, price and pick-up spot.'], [Search, 'Discover', 'Search and filter items from nearby students.'], [Repeat2, 'Exchange', 'Send a request, agree a time and meet on campus.'], [Recycle, 'Reuse', 'The item gets a second life and your impact grows.']];
const SAFETY = ['Meet in busy campus spots such as the library lobby or Student Centre.', 'Inspect electronics before you hand anything over.', 'Never share passwords, OTPs or bank details.', 'Bring a friend for large items like furniture or cycles.'];
const EXCHANGE = ['Reply to requests within 48 hours.', 'Describe condition and flaws honestly.', 'Mark the item as exchanged once it has changed hands.', 'Be on time, or message to reschedule.'];

export default function HowItWorks() {
  const [open, setOpen] = useState(0);
  return (
    <div className="container-x py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold sm:text-4xl">How ReLoop works</h1>
      <p className="mt-1 text-muted">From shelf to someone else’s desk in four steps.</p>
      <ol className="mx-auto mt-10 flex max-w-md flex-col items-center gap-2">
        {STEPS.map(([I, t, d], i) => (
          <li key={t} className="flex w-full flex-col items-center">
            <div className="card flex w-full items-center gap-4 p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-ink"><I size={22} aria-hidden="true" /></span>
              <div><h2 className="text-lg font-extrabold uppercase tracking-wide">{t}</h2><p className="text-sm text-muted">{d}</p></div></div>
            {i < 3 && <ArrowDown size={22} className="mt-2 text-brand" aria-hidden="true" />}
          </li>))}
      </ol>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {[['Safety guidelines', ShieldCheck, SAFETY], ['Exchange guidelines', HandHeart, EXCHANGE]].map(([t, I, items]) => (
          <section key={t} className="card p-6"><h2 className="flex items-center gap-2 text-xl font-bold"><I size={22} className="text-brand" aria-hidden="true" />{t}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted marker:text-brand">{items.map((x) => <li key={x}>{x}</li>)}</ul></section>))}
      </div>

      <section className="card mt-6 bg-brand/5 p-6"><h2 className="flex items-center gap-2 text-xl font-bold"><Leaf size={22} className="text-brand" aria-hidden="true" />Why reuse matters</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Most of a product’s carbon footprint is created before it ever reaches you, during mining, manufacturing and shipping. Reusing a single textbook, lamp or chair avoids that footprint entirely and also keeps usable items out of landfill. Students save money, and the campus produces less waste at the end of every semester.</p></section>

      <section className="mx-auto mt-14 max-w-3xl" aria-labelledby="faq-h">
        <h2 id="faq-h" className="h-section">Frequently asked questions</h2>
        <div className="mt-5 space-y-3">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="card">
              <h3><button type="button" id={`faq-b${i}`} aria-expanded={open === i} aria-controls={`faq-p${i}`} onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
                {q}<ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" /></button></h3>
              <div id={`faq-p${i}`} role="region" aria-labelledby={`faq-b${i}`} hidden={open !== i} className="px-5 pb-5 text-sm text-muted">{a}</div>
            </div>))}
        </div>
      </section>
    </div>
  );
}
