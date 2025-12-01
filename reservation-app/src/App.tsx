// src/App.tsx
import { Router } from './routes/Router'
import { AppLayout } from './components/Layout/AppLayout'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const { isAuthenticated } = useAuth()
  return (
    <AppLayout isAuthenticated={isAuthenticated}>
      <Router />
    </AppLayout>
  )
}
