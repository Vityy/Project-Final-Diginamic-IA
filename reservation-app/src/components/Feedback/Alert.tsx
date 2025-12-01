// src/components/Feedback/Alert.tsx
export function Alert({ kind = 'info', message }: { kind?: 'info' | 'error' | 'success'; message: string }) {
  const colors = { info: 'var(--muted)', error: 'var(--danger)', success: 'var(--success)' }
  return <div role="alert" style={{ color: colors[kind], margin: '.5rem 0' }}>{message}</div>
}
