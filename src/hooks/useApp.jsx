import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { CATEGORY_IMPACT, DEMO_USER, LISTINGS, SEED_ACTIVITY, SEED_NOTIFICATIONS, SEED_REQUESTS } from '../data/mock';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const SESSION_KEY = 'reloop_session';
const readSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
};

/** One provider holds all app state; everything persists to localStorage (mock backend). */
export function AppProvider({ children }) {
  const [theme, setThemeState] = useLocalStorage('reloop_theme', () =>
    (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [users, setUsers] = useLocalStorage('reloop_users', [DEMO_USER]);
  const [listings, setListings] = useLocalStorage('reloop_listings', LISTINGS);
  const [favorites, setFavorites] = useLocalStorage('reloop_favorites', []);
  const [requests, setRequests] = useLocalStorage('reloop_requests', SEED_REQUESTS);
  const [activity, setActivity] = useLocalStorage('reloop_activity', SEED_ACTIVITY);
  const [user, setUser] = useState(readSession);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const notify = useCallback((message) => {
    setToast({ message, id: Date.now() });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);
  const log = useCallback((text) => setActivity((a) => [text, ...a].slice(0, 8)), [setActivity]);

  // theme: toggle the `dark` class (tokens in index.css do the rest)
  const applyTheme = (t) => document.documentElement.classList.toggle('dark', t === 'dark');
  const setTheme = (t) => { setThemeState(t); applyTheme(t); };
  useState(() => applyTheme(theme));

  // auth (mock)
  const authenticate = (email, password) =>
    users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password) || null;
  const login = (u, remember) => {
    const s = { name: u.name, email: u.email };
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(s));
    setUser(s);
  };
  const register = ({ name, email, password }) => {
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) return 'An account with this email already exists.';
    const u = { name: name.trim(), email: email.trim(), password };
    setUsers((x) => [...x, u]);
    login(u, true);
    return '';
  };
  const logout = () => {
    localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); setUser(null);
  };

  // listings
  const addListing = (data) => {
    const base = CATEGORY_IMPACT[data.category] || { weightKg: 1, co2Kg: 3 };
    const price = Number(data.price);
    const listing = {
      ...base, ...data, price, id: `u${Date.now()}`, owner: 'me', status: 'active', rec: 6,
      seller: user?.name || 'You', date: new Date().toISOString().slice(0, 10),
      retail: price === 0 ? 500 : Math.round(price * 2.2),
    };
    setListings((l) => [listing, ...l]);
    log(`Listed "${listing.title}"`);
    return listing;
  };
  const updateListing = (id, patch) => setListings((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const deleteListing = (id) => {
    const item = listings.find((x) => x.id === id);
    setListings((l) => l.filter((x) => x.id !== id));
    if (item) log(`Deleted "${item.title}"`);
  };
  const markExchanged = (id) => {
    const item = listings.find((x) => x.id === id);
    updateListing(id, { status: 'exchanged' });
    if (item) log(`Exchanged "${item.title}"`);
  };

  // favorites + requests
  const isFav = (id) => favorites.includes(id);
  const toggleFav = (id) => {
    const on = !favorites.includes(id);
    setFavorites((f) => (on ? [...f, id] : f.filter((x) => x !== id)));
    notify(on ? 'Saved to your favourites' : 'Removed from favourites');
  };
  const requestExchange = (item) => {
    setRequests((r) => [{ id: `r${Date.now()}`, dir: 'out', person: item.seller, item: item.title, note: 'Request sent', status: 'pending' }, ...r]);
    log(`Requested "${item.title}"`);
  };
  const resolveRequest = (id, status) => {
    setRequests((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    notify(status === 'accepted' ? 'Request accepted. Arrange a pick-up.' : 'Request declined');
  };

  const value = useMemo(() => ({
    theme, setTheme, user, authenticate, login, register, logout,
    listings, addListing, updateListing, deleteListing, markExchanged,
    favorites, isFav, toggleFav, requests, requestExchange, resolveRequest,
    activity, notifications: SEED_NOTIFICATIONS, toast, notify,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [theme, user, users, listings, favorites, requests, activity, toast]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
