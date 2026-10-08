import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Droplets, IndianRupee, Minus, Plus, Recycle, Trash2 } from 'lucide-react';
import { CALC_ITEMS, IMPACT_MONTHS, WASTE_BY_CATEGORY } from '../data/mock';
import { calcImpact } from '../utils/helpers';

const COLORS = ['#0f766e', '#f2b33d', '#16a34a', '#0284c7', '#e11d48', '#7c3aed', '#64748b'];
const tip = { contentStyle: { background: 'rgb(var(--surface))', border: '1px solid rgb(var(--line))', borderRadius: 12, color: 'rgb(var(--ink))' } };
const axis = { stroke: 'rgb(var(--muted))', fontSize: 12, tickLine: false, axisLine: false };

export default function Impact() {
  const [sel, setSel] = useState({ book: 2, calc: 1, lamp: 1 });
  const total = calcImpact(sel, CALC_ITEMS);
  const change = (id, d) => setSel((s) => ({ ...s, [id]: Math.max(0, (s[id] || 0) + d) }));
  const tiles = [[Recycle, '1,284', 'Items reused'], [Trash2, '438 kg', 'Waste avoided'], [IndianRupee, '₹1.8L', 'Student savings'], [Droplets, '3,150 kg', 'CO₂ emissions avoided']];

  return (
    <div className="container-x py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Campus impact</h1>
      <p className="mt-1 max-w-2xl text-muted">What happens when a whole campus gives things another loop. Figures are estimates based on item weight and typical manufacturing footprints.</p>

      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map(([I, v, l]) => (<li key={l} className="card p-5"><I size={22} className="text-brand" aria-hidden="true" /><p className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{v}</p><p className="text-sm text-muted">{l}</p></li>))}
      </ul>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card p-5" aria-labelledby="c1"><h2 id="c1" className="text-lg font-bold">Items reused per month</h2>
          <div className="mt-4 h-64" role="img" aria-label="Bar chart: items reused rose from 96 in March to 296 in September">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={IMPACT_MONTHS}><CartesianGrid vertical={false} stroke="rgb(var(--line))" /><XAxis dataKey="month" {...axis} /><YAxis width={36} {...axis} /><Tooltip {...tip} cursor={{ fill: 'rgb(var(--sunken))' }} /><Bar dataKey="items" name="Items" fill="rgb(var(--brand))" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
        <section className="card p-5" aria-labelledby="c2"><h2 id="c2" className="text-lg font-bold">Cumulative student savings (₹ thousand)</h2>
          <div className="mt-4 h-64" role="img" aria-label="Area chart: savings grew from 12 thousand rupees in March to 180 thousand in September">
            <ResponsiveContainer width="100%" height="100%"><AreaChart data={IMPACT_MONTHS}><CartesianGrid vertical={false} stroke="rgb(var(--line))" /><XAxis dataKey="month" {...axis} /><YAxis width={36} {...axis} /><Tooltip {...tip} /><Area type="monotone" dataKey="savings" name="Savings (₹k)" stroke="#f2b33d" fill="#f2b33d" fillOpacity={0.3} strokeWidth={2.5} /></AreaChart></ResponsiveContainer></div></section>
        <section className="card p-5 lg:col-span-2" aria-labelledby="c3"><h2 id="c3" className="text-lg font-bold">Waste avoided by category (kg)</h2>
          <div className="mt-2 grid items-center gap-4 sm:grid-cols-2">
            <div className="h-64" role="img" aria-label="Donut chart of waste avoided by category; books and furniture contribute the most">
              <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={WASTE_BY_CATEGORY} dataKey="kg" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2} stroke="none">{WASTE_BY_CATEGORY.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip {...tip} /></PieChart></ResponsiveContainer></div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">{WASTE_BY_CATEGORY.map((c, i) => (<li key={c.name} className="flex items-center gap-2"><span className="h-3 w-3 shrink-0 rounded-full" style={{ background: COLORS[i] }} aria-hidden="true" />{c.name}<span className="ml-auto font-semibold">{c.kg} kg</span></li>))}</ul>
          </div></section>
      </div>

      <section className="card mt-8 p-6 sm:p-8" aria-labelledby="calc-h">
        <h2 id="calc-h" className="h-section">Impact calculator</h2>
        <p className="mt-1 text-muted">Choose how many of each item you plan to reuse to see your personal impact.</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <ul className="grid gap-3 sm:grid-cols-2">
            {CALC_ITEMS.map((it) => (
              <li key={it.id} className="flex items-center justify-between rounded-xl border border-line p-3">
                <span className="font-semibold">{it.name}</span>
                <span className="flex items-center gap-2">
                  <button type="button" onClick={() => change(it.id, -1)} className="btn btn-outline h-9 min-h-0 w-9 p-0" aria-label={`Decrease ${it.name}`}><Minus size={14} /></button>
                  <output aria-label={`${it.name} quantity`} className="w-6 text-center font-bold">{sel[it.id] || 0}</output>
                  <button type="button" onClick={() => change(it.id, 1)} className="btn btn-outline h-9 min-h-0 w-9 p-0" aria-label={`Increase ${it.name}`}><Plus size={14} /></button>
                </span>
              </li>))}
          </ul>
          <dl className="grid grid-cols-3 gap-3 text-center" aria-live="polite">
            {[['Waste avoided', `${total.waste.toFixed(1)} kg`], ['Money saved', `₹${Math.round(total.saved).toLocaleString('en-IN')}`], ['CO₂ avoided', `${total.co2.toFixed(1)} kg`]].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-brand/10 p-4"><dd className="font-display text-xl font-extrabold text-brand sm:text-2xl">{v}</dd><dt className="mt-1 text-xs text-muted">{k}</dt></div>))}
          </dl>
        </div>
      </section>
    </div>
  );
}
