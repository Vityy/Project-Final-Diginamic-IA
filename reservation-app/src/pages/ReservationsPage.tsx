// src/pages/ReservationsPage.tsx
import { useFetch } from '../hooks/useFetch'
import { reservationsService } from '../services/reservationsService'
import type { Reservation } from '../types/reservation'
import { Table } from '../components/UI/Table'
import { Button } from '../components/UI/Button'
import { Spinner } from '../components/Feedback/Spinner'
import { Alert } from '../components/Feedback/Alert'
import { useNavigate } from 'react-router-dom'
import { formatTimeRange } from '../utils/format'

export default function ReservationsPage() {
  const { data, loading, error, refresh } = useFetch<Reservation[]>(reservationsService.list, [])
  const navigate = useNavigate()

  async function cancel(id: string) {
    try {
      await reservationsService.remove(id)
      await refresh()
    } catch (e) {
      // Surface minimal error
      console.error(e)
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
      {data && (
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
            {data.map((r) => (
              <tr key={r.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '.5rem' }}>{r.roomId}</td>
                <td style={{ padding: '.5rem' }}>{r.resourceId || '-'}</td>
                <td style={{ padding: '.5rem' }}>{r.date}</td>
                <td style={{ padding: '.5rem' }}>{formatTimeRange(r.startTime, r.endTime)}</td>
                <td style={{ padding: '.5rem' }}>{r.status}</td>
                <td style={{ padding: '.5rem' }}>
                  <Button variant="danger" onClick={() => cancel(r.id)} aria-label={`Annuler réservation ${r.id}`}>
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
