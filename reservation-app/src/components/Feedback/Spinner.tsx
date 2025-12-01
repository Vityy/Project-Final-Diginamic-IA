// src/components/Feedback/Spinner.tsx
export function Spinner({ label = 'Chargement...' }: { label?: string }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span>{label}</span>
    </div>
  )
}
