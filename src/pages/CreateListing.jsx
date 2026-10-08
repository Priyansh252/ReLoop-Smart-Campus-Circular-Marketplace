import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2 } from 'lucide-react';
import Field from '../components/Field';
import ItemArt, { ICONS } from '../components/ItemArt';
import { useApp } from '../hooks/useApp';
import { CATEGORIES, CONDITIONS, ICON_CHOICES, LOCATIONS } from '../data/mock';
import { formatPrice, validatePrice } from '../utils/helpers';

const STEPS = ['Item', 'Details', 'Price', 'Location', 'Description', 'Preview', 'Publish'];
const EMPTY = { title: '', icon: 'Package', category: '', condition: '', price: '', location: '', description: '' };

/** Returns { field: message } for the given step. */
export function validateStep(step, d) {
  const e = {};
  if (step === 0) {
    if (d.title.trim().length < 3) e.title = 'Give your item a name of at least 3 characters.';
    else if (d.title.length > 80) e.title = 'Keep the name under 80 characters.';
  }
  if (step === 1) {
    if (!d.category) e.category = 'Choose a category.';
    if (!d.condition) e.condition = 'Choose the item condition.';
  }
  if (step === 2) { const m = validatePrice(d.price); if (m) e.price = m; }
  if (step === 3 && !d.location) e.location = 'Choose where buyers can pick it up.';
  if (step === 4) {
    const n = d.description.trim().length;
    if (n < 20) e.description = `Add a little more detail (${n}/20 characters minimum).`;
    else if (n > 400) e.description = 'Keep the description under 400 characters.';
  }
  return e;
}

export default function CreateListing() {
  const { addListing, notify } = useApp();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [published, setPublished] = useState(null);
  const bind = (k) => ({ value: data[k], onChange: (e) => setData((d) => ({ ...d, [k]: e.target.value })), error: errors[k] });

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (!Object.keys(e).length) setStep(step + 1);
  };
  const publish = () => {
    const all = [0, 1, 2, 3, 4].map((s) => validateStep(s, data));
    const bad = all.findIndex((e) => Object.keys(e).length);
    if (bad >= 0) { setErrors(all[bad]); setStep(bad); return; }
    setPublished(addListing({ ...data, title: data.title.trim(), description: data.description.trim() }));
    setStep(6);
    notify('Published. Your item is live on Explore.');
  };
  const reset = () => { setData(EMPTY); setErrors({}); setPublished(null); setStep(0); };

  return (
    <div className="container-x max-w-3xl py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold sm:text-4xl">List an item</h1>
      <p className="mt-1 text-muted">Six quick steps and your item goes live for the whole campus.</p>

      <ol className="mt-7 flex gap-1.5" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? 'step' : undefined}>
            <div className={`h-1.5 rounded-full transition-colors ${i <= step ? 'bg-brand' : 'bg-line'}`} />
            <span className={`mt-1.5 hidden text-xs sm:block ${i === step ? 'font-bold text-brand' : 'text-muted'}`}>{s}</span>
          </li>))}
      </ol>
      <p className="mt-3 text-sm font-semibold text-brand sm:hidden">Step {step + 1} of 7: {STEPS[step]}</p>

      <form noValidate onSubmit={(e) => e.preventDefault()} className="card mt-6 space-y-5 p-6 sm:p-8">
        {step === 0 && (<>
          <Field label="Item name" placeholder="e.g. Scientific calculator" maxLength={90} {...bind('title')} />
          <fieldset>
            <legend className="label">Pick an illustration</legend>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {ICON_CHOICES.map((n) => { const I = ICONS[n]; const on = data.icon === n; return (
                <button key={n} type="button" onClick={() => setData((d) => ({ ...d, icon: n }))} aria-pressed={on} aria-label={n}
                  className={`flex h-14 items-center justify-center rounded-xl border transition ${on ? 'border-brand bg-brand/10 text-brand' : 'border-line hover:border-brand'}`}><I size={24} aria-hidden="true" /></button>); })}
            </div>
          </fieldset>
        </>)}
        {step === 1 && (<div className="grid gap-5 sm:grid-cols-2">
          <Field as="select" label="Category" {...bind('category')}><option value="">Select category</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</Field>
          <Field as="select" label="Condition" {...bind('condition')}><option value="">Select condition</option>{CONDITIONS.map((c) => <option key={c}>{c}</option>)}</Field>
        </div>)}
        {step === 2 && <Field label="Price (₹)" type="number" inputMode="decimal" min="0" placeholder="0" hint="Enter 0 to donate the item for free." {...bind('price')} />}
        {step === 3 && <Field as="select" label="Pick-up location" {...bind('location')}><option value="">Select location</option>{LOCATIONS.map((c) => <option key={c}>{c}</option>)}</Field>}
        {step === 4 && <Field as="textarea" rows={5} label="Description" maxLength={450} placeholder="Describe the condition, what is included and why you are passing it on." hint={`${data.description.trim().length}/400 characters (minimum 20)`} {...bind('description')} />}
        {step === 5 && (
          <div>
            <h2 className="mb-4 text-lg font-bold">Preview your listing</h2>
            <div className="card overflow-hidden sm:flex">
              <ItemArt listing={{ ...data, title: data.title }} className="aspect-[4/3] sm:aspect-auto sm:w-48 sm:shrink-0" size={64} />
              <div className="p-5">
                <h3 className="text-lg font-bold">{data.title}</h3>
                <p className="mt-1 text-xl font-extrabold text-brand">{formatPrice(data.price)}</p>
                <p className="mt-1 text-sm text-muted">{data.category} · {data.condition} · {data.location}</p>
                <p className="mt-3 text-sm">{data.description}</p>
              </div>
            </div>
          </div>)}
        {step === 6 && published && (
          <div className="py-6 text-center">
            <CheckCircle2 size={56} className="mx-auto text-brand" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Your item is live</h2>
            <p className="mt-1 text-muted">“{published.title}” is now visible on Explore.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to={`/item/${published.id}`} className="btn btn-primary">View listing</Link>
              <Link to="/dashboard" className="btn btn-outline">Go to dashboard</Link>
              <button type="button" onClick={reset} className="btn btn-ghost">List another</button>
            </div>
          </div>)}

        {step < 6 && (
          <div className="flex justify-between gap-3 border-t border-line pt-5">
            <button type="button" onClick={() => { setErrors({}); setStep(step - 1); }} disabled={step === 0} className="btn btn-outline">Back</button>
            {step < 5 ? <button type="button" onClick={next} className="btn btn-primary">Continue</button>
              : <button type="button" onClick={publish} className="btn btn-primary"><Check size={16} aria-hidden="true" />Publish listing</button>}
          </div>)}
      </form>
    </div>
  );
}
