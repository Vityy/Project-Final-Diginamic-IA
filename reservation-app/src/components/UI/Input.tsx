// src/components/UI/Input.tsx
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; id?: string }
export function Input({ label, error, id, ...props }: Props) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`
  const errorId = `${inputId}-error`
  return (
    <div style={{ display: 'grid', gap: '.3rem' }}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props} />
      {error && (
        <small id={errorId} style={{ color: 'var(--danger)' }}>
          {error}
        </small>
      )}
    </div>
  )
}
