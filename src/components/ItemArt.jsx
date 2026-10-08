import { Armchair, BookOpen, Backpack, Bike, Calculator, Fan, Headphones, Keyboard, Lamp, Package, Pencil, Shirt } from 'lucide-react';

export const ICONS = { Armchair, BookOpen, Backpack, Bike, Calculator, Fan, Headphones, Keyboard, Lamp, Package, Pencil, Shirt };

// One soft tone per category (light + dark variants)
const TONES = {
  Books: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  Electronics: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  Transport: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-200',
  Furniture: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  Clothing: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  Accessories: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  Stationery: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
};

/** Reliable, offline "photo": category-tinted tile with a large icon. */
export default function ItemArt({ listing, className = 'aspect-[4/3]', size = 56 }) {
  const Icon = ICONS[listing.icon] || Package;
  return (
    <div role="img" aria-label={`${listing.title} (${listing.category})`}
      className={`relative flex w-full items-center justify-center overflow-hidden ${TONES[listing.category] || TONES.Books} ${className}`}>
      <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/30 dark:bg-white/5" aria-hidden="true" />
      <span className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/25 dark:bg-white/5" aria-hidden="true" />
      <Icon size={size} strokeWidth={1.5} className="relative" aria-hidden="true" />
    </div>
  );
}
