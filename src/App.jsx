import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './hooks/useApp';
import Layout, { RequireAuth } from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ItemDetails from './pages/ItemDetails';
import CreateListing from './pages/CreateListing';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import HowItWorks from './pages/HowItWorks';
import { Login, SignUp } from './pages/Auth';

const Impact = lazy(() => import('./pages/Impact')); // keeps Recharts out of the first load

export default function App() {
  return (
    <AppProvider>
      <Suspense fallback={<p className="p-10 text-center text-muted">Loading…</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="item/:id" element={<ItemDetails />} />
            <Route path="create" element={<RequireAuth><CreateListing /></RequireAuth>} />
            <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="impact" element={<Impact />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<div className="container-x section text-center"><h1 className="h-section">Page not found</h1><p className="mt-2 text-muted">That page has gone back into the loop.</p></div>} />
          </Route>
        </Routes>
      </Suspense>
    </AppProvider>
  );
}
