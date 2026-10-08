import { useState } from 'react';
import { Medal } from 'lucide-react';
import { STUDENTS, badgeFor } from '../data/mock';
import { useApp } from '../hooks/useApp';

const PERIODS = [['Weekly', 0], ['Monthly', 1], ['All time', 2]];
const MEDAL = ['text-yellow-500', 'text-slate-400', 'text-amber-700'];

export default function Leaderboard() {
  const [p, setP] = useState(1);
  const { user } = useApp();
  const rows = [...STUDENTS].sort((a, b) => b.pts[p] - a.pts[p]);
  return (
    <div className="container-x py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Leaderboard</h1>
      <p className="mt-1 text-muted">The students keeping the most items in use.</p>
      <div role="group" aria-label="Time period" className="mt-6 inline-flex rounded-xl border border-line bg-surface p-1">
        {PERIODS.map(([l, i]) => (<button key={l} type="button" aria-pressed={p === i} onClick={() => setP(i)} className={`min-h-[40px] rounded-lg px-4 text-sm font-semibold transition ${p === i ? 'bg-brand text-brand-ink' : 'hover:bg-sunken'}`}>{l}</button>))}
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <caption className="sr-only">Top students by points, {PERIODS[p][0]}</caption>
          <thead className="border-b border-line bg-sunken/60 text-muted"><tr>{['Rank', 'Student', 'Items reused', 'Points', 'Badge'].map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((s, i) => { const me = user && s.name === user.name; return (
              <tr key={s.name} className={`border-b border-line last:border-0 ${me ? 'bg-brand/10' : ''}`}>
                <td className="px-4 py-3 font-bold">{i < 3 ? <Medal size={20} className={MEDAL[i]} aria-label={`Rank ${i + 1}`} /> : i + 1}</td>
                <td className="px-4 py-3"><p className="font-semibold">{s.name}{me && <span className="badge ml-2">You</span>}</p><p className="text-xs text-muted">{s.dept}</p></td>
                <td className="px-4 py-3">{s.items[p]}</td>
                <td className="px-4 py-3 font-bold text-brand">{s.pts[p].toLocaleString('en-IN')}</td>
                <td className="px-4 py-3"><span className="badge">{badgeFor(s.pts[2])}</span></td>
              </tr>); })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
