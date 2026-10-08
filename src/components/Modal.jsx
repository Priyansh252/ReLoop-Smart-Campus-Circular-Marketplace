import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/** Reusable accessible dialog: Esc + backdrop close, focus moved inside. */
export default function Modal({ open, onClose, title, children, footer }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    ref.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="modal-title"
        className="card max-h-[90vh] w-full max-w-md animate-fade-in overflow-y-auto rounded-b-none p-6 shadow-xl focus:outline-none sm:rounded-b-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="btn btn-ghost -mr-2 -mt-2 h-10 w-10 p-0"><X size={20} /></button>
        </div>
        <div className="mt-3 text-sm text-muted">{children}</div>
        {footer && <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
