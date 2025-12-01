// src/components/UI/Table.tsx
import { ReactNode } from 'react'

export function Table({ children }: { children: ReactNode }) {
  return (
    <div role="region" aria-label="Tableau des données" className="card">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {children}
      </table>
    </div>
  )
}
