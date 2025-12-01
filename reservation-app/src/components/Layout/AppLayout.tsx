// src/components/Layout/AppLayout.tsx
import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function AppLayout({ isAuthenticated, children }: { isAuthenticated: boolean; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isAuthenticated ? '240px 1fr' : '1fr', minHeight: '100vh' }}>
      {isAuthenticated && <Sidebar />}
      <main className="container">{children}</main>
    </div>
  )
}
