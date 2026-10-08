import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Newer Node versions ship a built-in `localStorage` that can shadow jsdom's and be undefined.
// Install our own in-memory Storage so tests behave the same on every Node version.
function createStorage() {
  let data = {};
  return {
    get length() { return Object.keys(data).length; },
    key: (i) => Object.keys(data)[i] ?? null,
    getItem: (k) => (Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
    clear: () => { data = {}; },
  };
}
vi.stubGlobal('localStorage', createStorage());
vi.stubGlobal('sessionStorage', createStorage());
window.scrollTo = vi.fn();

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.className = '';
});
afterEach(() => cleanup());
