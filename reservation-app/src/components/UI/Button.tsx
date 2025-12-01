// src/components/UI/Button.tsx
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
}
export function Button({ variant = 'primary', children, ...props }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--primary)', color: 'var(--primary-contrast)', border: 0, padding: '0.6rem 1rem', borderRadius: 8 },
    secondary: { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', padding: '0.6rem 1rem', borderRadius: 8 },
    danger: { background: 'var(--danger)', color: 'var(--primary-contrast)', border: 0, padding: '0.6rem 1rem', borderRadius: 8 },
  }
  return (
    <button style={styles[variant]} {...props}>
      {children}
    </button>
  )
}
