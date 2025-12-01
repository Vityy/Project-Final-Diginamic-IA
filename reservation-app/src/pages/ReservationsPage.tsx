// src/pages/ReservationsPage.tsx
import { useEffect, useState } from 'react'
import { reservationsService } from '../services/reservationsService'
import type { Reservation } from '../types/reservation'
import { Table } from '../components/UI/Table'
import { Button } from '../components/UI/Button'
import { Spinner } from '../components/Feedback/Spinner'
import { Alert } from '../components/Feedback/Alert'
import { useNavigate } from 'react-router-dom'
import { formatTimeRange } from '../utils/format'

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  async function load() {
    try {
      if (!token) throw new Error('Utilisateur non authentifié')
      setLoading(true)
      const data = await reservationsService.list(token)
      setReservations(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function cancel(id: string) {
    try {
      if (!token) throw new Error('Utilisateur non authentifié')
      await reservationsService.remove(token, id)
      await load()
    } catch (e) {
      console.error(e)
      setError((e as Error).message)
    }
  }

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Réservations</h2>
        <Button onClick={() => navigate('/reservations/new')}>Nouvelle réservation</Button>
      </header>
      {loading && <Spinner />}
      {error && <Alert kind="error" message={error} />}
      {reservations.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '.5rem' }}>Salle</th>
              <th style={{ textAlign: 'left', padding: '.5rem' }}>Ressource</th>
              <th style={{ textAlign: 'left', padding: '.5rem' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '.5rem' }}>Heure</th>
              <th style={{ textAlign: 'left', padding: '.5rem' }}>Statut</th>
              <th style={{ textAlign: 'left', padding: '.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '.5rem' }}>{r.roomId}</td>
                <td style={{ padding: '.5rem' }}>{r.resourceId || '-'}</td>
                <td style={{ padding: '.5rem' }}>{new Date(r.date).toLocaleDateString()}</td>
                <td style={{ padding: '.5rem' }}>{formatTimeRange(r.startTime, r.endTime)}</td>
                <td style={{ padding: '.5rem' }}>{r.status}</td>
                <td style={{ padding: '.5rem' }}>
                  <Button
                    variant="danger"
                    onClick={() => cancel(r.id)}
                    aria-label={`Annuler réservation ${r.id}`}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  )
}
