import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronDown, LayoutDashboard, LogOut, Menu, Moon, Plus, Repeat2, Sun, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';

const LINKS = [['/', 'Home'], ['/explore', 'Explore'], ['/how-it-works', 'How it works'], ['/impact', 'Impact'], ['/leaderboard', 'Leaderboard']];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold" aria-label="ReLoop home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-brand-ink"><Repeat2 size={20} aria-hidden="true" /></span>
      ReLoop
    </Link>
  );
}

function Navbar() {
  const { user, logout, theme, setTheme, notify } = useApp();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);
  useEffect(() => {
    const close = (e) => (e.type === 'keydown' ? e.key === 'Escape' && setMenu(false) : !menuRef.current?.contains(e.target) && setMenu(false));
    document.addEventListener('mousedown', close); document.addEventListener('keydown', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close); };
  }, []);
  const link = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-brand/10 text-brand' : 'text-ink/80 hover:bg-sunken'}`;
  const out = () => { logout(); notify('You have been logged out'); navigate('/'); };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between gap-3">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={link}>{label}</NavLink>)}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="btn btn-ghost h-11 w-11 p-0"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <>
              <Link to="/create" className="btn btn-primary hidden sm:inline-flex"><Plus size={16} aria-hidden="true" />List an item</Link>
              <div className="relative hidden lg:block" ref={menuRef}>
                <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-haspopup="menu" className="btn btn-outline gap-2 px-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-ink">{user.name[0]}</span>
                  <span className="max-w-[7rem] truncate">{user.name.split(' ')[0]}</span><ChevronDown size={14} aria-hidden="true" />
                </button>
                {menu && (
                  <div role="menu" className="card absolute right-0 mt-2 w-48 animate-fade-in p-1.5 shadow-lg">
                    <Link role="menuitem" to="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sunken"><LayoutDashboard size={16} />Dashboard</Link>
                    <button role="menuitem" type="button" onClick={out} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sunken"><LogOut size={16} />Log out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="btn btn-ghost">Log in</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </div>
          )}
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle menu" className="btn btn-ghost h-11 w-11 p-0 lg:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-nav" className="animate-fade-in border-t border-line bg-canvas lg:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={link}>{label}</NavLink>)}
            {user ? (
              <>
                <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
                <NavLink to="/create" className={link}>List an item</NavLink>
                <button type="button" onClick={out} className="rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-sunken">Log out</button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" className="btn btn-outline">Log in</Link>
                <Link to="/signup" className="btn btn-primary">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const col = 'space-y-2 text-sm text-muted';
  return (
    <footer className="border-t border-line bg-sunken/60">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted">Give it another loop. A student-run marketplace for reusing what you no longer need.</p>
        </div>
        <nav aria-label="Marketplace"><h2 className="mb-3 text-sm font-bold">Marketplace</h2>
          <ul className={col}><li><Link to="/explore" className="hover:text-brand">Explore items</Link></li><li><Link to="/create" className="hover:text-brand">List an item</Link></li><li><Link to="/leaderboard" className="hover:text-brand">Leaderboard</Link></li></ul></nav>
        <nav aria-label="Learn"><h2 className="mb-3 text-sm font-bold">Learn</h2>
          <ul className={col}><li><Link to="/how-it-works" className="hover:text-brand">How it works</Link></li><li><Link to="/impact" className="hover:text-brand">Campus impact</Link></li></ul></nav>
        <nav aria-label="Account"><h2 className="mb-3 text-sm font-bold">Account</h2>
          <ul className={col}><li><Link to="/login" className="hover:text-brand">Log in</Link></li><li><Link to="/signup" className="hover:text-brand">Sign up</Link></li><li><Link to="/dashboard" className="hover:text-brand">Dashboard</Link></li></ul></nav>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">© 2026 ReLoop. Built for CSI3029 Front End Design and Testing.</div>
    </footer>
  );
}

function Toast() {
  const { toast } = useApp();
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      {toast && (
        <div key={toast.id} className="pointer-events-auto flex animate-fade-in items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-canvas shadow-lg">
          <CheckCircle2 size={18} aria-hidden="true" />{toast.message}
        </div>
      )}
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink">Skip to content</a>
      <Navbar />
      <main id="main" key={pathname} className="flex-1 animate-fade-in"><Outlet /></main>
      <Footer />
      <Toast />
    </div>
  );
}

export function RequireAuth({ children }) {
  const { user } = useApp();
  const { pathname } = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: pathname, notice: 'Log in to continue.' }} />;
}
