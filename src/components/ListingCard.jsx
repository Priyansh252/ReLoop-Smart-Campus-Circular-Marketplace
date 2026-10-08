import { Link } from 'react-router-dom';
import { Heart, MapPin, User } from 'lucide-react';
import ItemArt from './ItemArt';
import { useApp } from '../hooks/useApp';
import { formatPrice } from '../utils/helpers';

/** The single marketplace card used on Home, Explore, Dashboard. */
export default function ListingCard({ listing }) {
  const { isFav, toggleFav } = useApp();
  const fav = isFav(listing.id);
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <Link to={`/item/${listing.id}`} tabIndex={-1} aria-hidden="true"><ItemArt listing={listing} /></Link>
        <button type="button" onClick={() => toggleFav(listing.id)} aria-pressed={fav}
          aria-label={fav ? `Remove ${listing.title} from favourites` : `Save ${listing.title} to favourites`}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface/95 shadow-sm transition hover:scale-105">
          <Heart size={18} className={fav ? 'animate-pop fill-red-500 text-red-500' : 'text-ink'} aria-hidden="true" />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-2.5 py-1 text-xs font-semibold">{listing.condition}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug">
          <Link to={`/item/${listing.id}`} className="hover:text-brand">{listing.title}</Link>
        </h3>
        <p className="mt-2 text-xl font-extrabold text-brand">{formatPrice(listing.price)}</p>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          <li className="flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" />{listing.location}</li>
          <li className="flex items-center gap-1.5"><User size={14} aria-hidden="true" />{listing.seller}</li>
        </ul>
        <Link to={`/item/${listing.id}`} className="btn btn-outline btn-sm mt-4 w-full">View details</Link>
      </div>
    </article>
  );
}
