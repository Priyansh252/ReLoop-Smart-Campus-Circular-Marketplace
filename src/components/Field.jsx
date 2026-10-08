import { useId } from 'react';

/** Labelled form control with inline error. `as` = input | textarea | select. */
export default function Field({ label, error, hint, as: Tag = 'input', children, className = '', ...props }) {
  const id = useId();
  const describedBy = [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      <Tag id={id} aria-invalid={!!error} aria-describedby={describedBy} className={`input ${error ? 'input-error' : ''}`} {...props}>{children}</Tag>
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="error-text">{error}</p>}
    </div>
  );
}
