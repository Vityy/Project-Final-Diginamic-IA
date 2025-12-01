// src/components/Layout/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../UI/Button'

export function Sidebar() {
  const navigate = useNavigate()

  function logout() {
    // Supprime le token JWT stocké
    localStorage.removeItem('token')
    // Redirige vers la page de login
    navigate('/login')
  }

  return (
    <aside style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ padding: '1rem' }}>
        <h1 style={{ fontSize: 18, margin: 0 }}>Réservations</h1>
        <nav
          aria-label="Navigation principale"
          style={{ display: 'grid', gap: '.5rem', marginTop: '1rem' }}
        >
          <NavLink to="/" end>Tableau des réservations</NavLink>
          <NavLink to="/reservations/new">Nouvelle réservation</NavLink>
          <NavLink to="/rooms">Salles</NavLink>
          <NavLink to="/resources">Ressources</NavLink>
        </nav>
        <div style={{ marginTop: '1rem' }}>
          <Button
            aria-label="Se déconnecter"
            variant="secondary"
            onClick={logout}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  )
}
