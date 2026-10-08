import { useEffect, useState } from 'react';

/** useState that persists to localStorage (JSON). */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch { /* ignore corrupt storage */ }
    return typeof initial === 'function' ? initial() : initial;
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage full/blocked */ }
  }, [key, value]);
  return [value, setValue];
}
