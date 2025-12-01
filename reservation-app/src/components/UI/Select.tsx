// src/components/UI/Select.tsx
import { SelectHTMLAttributes, ReactNode } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  id?: string
  children: ReactNode
}
export function Select({ label, error, id, children, ...props }: Props) {
  const selectId = id || `select-${Math.random().toString(36).slice(2)}`
  const errorId = `${selectId}-error`
  return (
    <div style={{ display: 'grid', gap: '.3rem' }}>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props}>
        {children}
      </select>
      {error && (
        <small id={errorId} style={{ color: 'var(--danger)' }}>
          {error}
        </small>
      )}
    </div>
  )
}
