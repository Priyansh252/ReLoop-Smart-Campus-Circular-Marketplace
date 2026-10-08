import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { validateStep } from '../pages/CreateListing';
import { validatePrice } from '../utils/helpers';

const renderAt = (path = '/') => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
const signIn = () => sessionStorage.setItem('reloop_session', JSON.stringify({ name: 'Aditi Krishnan', email: 'demo@reloop.edu' }));

describe('Login validation', () => {
  it('shows errors for empty and invalid input', async () => {
    const user = userEvent.setup();
    renderAt('/login');
    await user.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Enter your password.')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Email'), 'demo@reloop.edu');
    await user.type(screen.getByLabelText('Password'), 'wrongpass1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Email or password is incorrect.');
  });

  it('logs in with the demo account and opens the dashboard', async () => {
    const user = userEvent.setup();
    renderAt('/login');
    await user.type(screen.getByLabelText('Email'), 'demo@reloop.edu');
    await user.type(screen.getByLabelText('Password'), 'Reloop@123');
    await user.click(screen.getByRole('button', { name: 'Log in' }));
    expect(await screen.findByRole('heading', { name: /Hello, Aditi/ })).toBeInTheDocument();
  });
});

describe('Explore search, filters and sorting', () => {
  it('filters results by search text', async () => {
    const user = userEvent.setup();
    renderAt('/explore');
    await user.type(screen.getByLabelText('Search items'), 'calculator');
    expect(screen.getByRole('link', { name: /Casio fx-991EX/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Mesh Study Chair/ })).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup();
    renderAt('/explore');
    await user.type(screen.getByLabelText('Search items'), 'zzzzqx');
    expect(screen.getByText('No items match your search')).toBeInTheDocument();
  });

  it('sorts by price low to high', async () => {
    const user = userEvent.setup();
    renderAt('/explore');
    await user.selectOptions(screen.getByLabelText('Sort by'), 'asc');
    const first = screen.getAllByRole('article')[0];
    expect(within(first).getByText('Free')).toBeInTheDocument();
  });
});

describe('Favourites', () => {
  it('toggles a favourite and persists it', async () => {
    const user = userEvent.setup();
    renderAt('/explore');
    const btn = screen.getAllByRole('button', { name: /^Save .* to favourites$/ })[0];
    await user.click(btn);
    expect(screen.getAllByRole('button', { pressed: true }).some((b) => /favourites/.test(b.getAttribute('aria-label')))).toBe(true);
    expect(JSON.parse(localStorage.getItem('reloop_favorites'))).toHaveLength(1);
  });
});

describe('Create listing', () => {
  it('validates each step and publishes to localStorage', async () => {
    signIn();
    const user = userEvent.setup();
    renderAt('/create');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText(/name of at least 3 characters/)).toBeInTheDocument();
    await user.type(screen.getByLabelText('Item name'), 'Desk Lamp');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.selectOptions(screen.getByLabelText('Category'), 'Electronics');
    await user.selectOptions(screen.getByLabelText('Condition'), 'Good');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.type(screen.getByLabelText('Price (₹)'), '-5');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Price cannot be negative.')).toBeInTheDocument();
    await user.clear(screen.getByLabelText('Price (₹)'));
    await user.type(screen.getByLabelText('Price (₹)'), '300');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.selectOptions(screen.getByLabelText('Pick-up location'), 'Tech Tower');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.type(screen.getByLabelText('Description'), 'Too short');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText(/Add a little more detail/)).toBeInTheDocument();
    await user.type(screen.getByLabelText('Description'), ' but now it is long enough to publish.');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.click(screen.getByRole('button', { name: 'Publish listing' }));
    expect(await screen.findByText('Your item is live')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('reloop_listings')).some((l) => l.title === 'Desk Lamp' && l.price === 300)).toBe(true);
  });

  it('unit: step validators reject bad data', () => {
    expect(validatePrice('')).toMatch(/Enter a price/);
    expect(validatePrice('-1')).toMatch(/negative/);
    expect(validatePrice('0')).toBe('');
    expect(validateStep(3, { location: '' }).location).toBeTruthy();
  });
});

describe('Navigation', () => {
  it('navigates between pages from the navbar', async () => {
    const user = userEvent.setup();
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ReLoop');
    await user.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'Explore' }));
    expect(await screen.findByRole('heading', { name: 'Explore items' })).toBeInTheDocument();
    await user.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'Leaderboard' }));
    expect(await screen.findByRole('heading', { name: 'Leaderboard' })).toBeInTheDocument();
  });

  it('redirects protected pages to login when signed out', () => {
    renderAt('/dashboard');
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  });

  it('toggles and persists dark mode', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(screen.getByRole('button', { name: /Switch to dark mode/ }));
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('reloop_theme')).toBe('"dark"');
  });
});
