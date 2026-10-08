import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Repeat2 } from 'lucide-react';
import Field from '../components/Field';
import { useApp } from '../hooks/useApp';
import { DEMO_USER } from '../data/mock';
import { EMAIL_RE } from '../utils/helpers';

function Shell({ title, subtitle, children, footer }) {
  return (
    <div className="container-x flex justify-center py-10 sm:py-16">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-ink"><Repeat2 size={24} aria-hidden="true" /></span>
          <h1 className="mt-4 text-3xl font-extrabold">{title}</h1><p className="mt-1 text-muted">{subtitle}</p></div>
        <div className="card p-6 sm:p-8">{children}</div>
        <p className="mt-5 text-center text-sm text-muted">{footer}</p>
      </div>
    </div>
  );
}

export function Login() {
  const { user, authenticate, login, notify } = useApp();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [v, setV] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  if (user) return <Navigate to="/dashboard" replace />;

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!EMAIL_RE.test(v.email.trim())) er.email = 'Enter a valid email address.';
    if (!v.password) er.password = 'Enter your password.';
    else if (v.password.length < 8) er.password = 'Password must be at least 8 characters.';
    if (!Object.keys(er).length) {
      const u = authenticate(v.email, v.password);
      if (!u) er.form = 'Email or password is incorrect.';
      else { login(u, v.remember); notify(`Welcome back, ${u.name.split(' ')[0]}`); navigate('/dashboard', { replace: true }); }
    }
    setErrors(er);
  };

  return (
    <Shell title="Welcome back" subtitle="Log in to manage your listings." footer={<>New to ReLoop? <Link to="/signup" className="font-semibold text-brand underline">Create an account</Link></>}>
      <form onSubmit={submit} noValidate className="space-y-5">
        {state?.notice && !errors.form && <p role="status" className="rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium text-brand">{state.notice}</p>}
        {errors.form && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">{errors.form}</p>}
        <Field label="Email" type="email" autoComplete="email" value={v.email} error={errors.email} onChange={(e) => setV({ ...v, email: e.target.value })} />
        <Field label="Password" type="password" autoComplete="current-password" value={v.password} error={errors.password} onChange={(e) => setV({ ...v, password: e.target.value })} />
        <label className="flex min-h-[44px] items-center gap-2 text-sm font-medium"><input type="checkbox" checked={v.remember} onChange={(e) => setV({ ...v, remember: e.target.checked })} className="h-4 w-4 accent-[rgb(var(--brand))]" />Remember me</label>
        <button type="submit" className="btn btn-primary w-full">Log in</button>
        <button type="button" onClick={() => setV({ ...v, email: DEMO_USER.email, password: DEMO_USER.password })} className="btn btn-outline w-full">Fill demo account</button>
      </form>
    </Shell>
  );
}

export function SignUp() {
  const { user, register, notify } = useApp();
  const navigate = useNavigate();
  const [v, setV] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  if (user) return <Navigate to="/dashboard" replace />;
  const bind = (k) => ({ value: v[k], error: errors[k], onChange: (e) => setV({ ...v, [k]: e.target.value }) });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (v.name.trim().length < 2) er.name = 'Enter your full name.';
    if (!EMAIL_RE.test(v.email.trim())) er.email = 'Enter a valid email address.';
    if (v.password.length < 8) er.password = 'Use at least 8 characters.';
    else if (!/\d/.test(v.password) || !/[a-zA-Z]/.test(v.password)) er.password = 'Include both letters and numbers.';
    if (v.confirm !== v.password) er.confirm = 'Passwords do not match.';
    if (!Object.keys(er).length) {
      const msg = register(v);
      if (msg) er.email = msg; else { notify('Account created. Welcome to ReLoop!'); navigate('/dashboard', { replace: true }); }
    }
    setErrors(er);
  };

  return (
    <Shell title="Join ReLoop" subtitle="Start giving your things another loop." footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand underline">Log in</Link></>}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field label="Full name" autoComplete="name" {...bind('name')} />
        <Field label="Email" type="email" autoComplete="email" {...bind('email')} />
        <Field label="Password" type="password" autoComplete="new-password" hint="At least 8 characters with letters and numbers." {...bind('password')} />
        <Field label="Confirm password" type="password" autoComplete="new-password" {...bind('confirm')} />
        <button type="submit" className="btn btn-primary w-full">Create account</button>
      </form>
    </Shell>
  );
}
