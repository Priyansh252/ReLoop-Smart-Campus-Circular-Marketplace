export const formatPrice = (p) => (Number(p) === 0 ? 'Free' : `₹${Number(p).toLocaleString('en-IN')}`);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an error message or ''. */
export function validatePrice(value) {
  if (String(value).trim() === '') return 'Enter a price. Use 0 to donate the item.';
  const n = Number(value);
  if (Number.isNaN(n)) return 'Price must be a number.';
  if (n < 0) return 'Price cannot be negative.';
  if (n > 100000) return 'Price must be ₹1,00,000 or less.';
  return '';
}

/** Impact of reusing one item (waste kg, CO₂ kg, money saved ₹). */
export function listingImpact(l) {
  return { waste: l.weightKg, co2: l.co2Kg, saved: Math.max(0, l.retail - l.price) };
}

export function calcImpact(selection, items) {
  return items.reduce(
    (t, it) => {
      const q = selection[it.id] || 0;
      return { waste: t.waste + q * it.waste, saved: t.saved + q * it.saved, co2: t.co2 + q * it.co2 };
    },
    { waste: 0, saved: 0, co2: 0 }
  );
}
