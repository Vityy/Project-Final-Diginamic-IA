// src/pages/ReservationFormPage.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { roomsService } from '../services/roomsService'
import { resourcesService } from '../services/resourcesService'
import { reservationsService } from '../services/reservationsService'
import { useForm } from '../hooks/useForm'
import { reservationSchema } from '../utils/validator'
import { Select } from '../components/UI/Select'
import { DateInput } from '../components/UI/DateInput'
import { TimeInput } from '../components/UI/TimeInput'
import { Button } from '../components/UI/Button'
import { Alert } from '../components/Feedback/Alert'
import type { Room } from '../types/room'
import type { Resource } from '../types/resource'

export default function ReservationFormPage() {
  const navigate = useNavigate()
  const { values, set, errors, validate } = useForm(
    { roomId: '', resourceId: '', date: '', startTime: '', endTime: '' },
    reservationSchema
  )
  const [rooms, setRooms] = useState<Room[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Utilisateur non authentifié')
      return
    }

    Promise.all([roomsService.list(token), resourcesService.list(token)])
      .then(([rms, rcs]) => {
        setRooms(rms)
        setResources(rcs)
      })
      .catch((e: Error) => setError(e.message))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Validation du schéma
    if (!validate()) return

    // Validation supplémentaire : endTime > startTime
    if (values.startTime && values.endTime && values.endTime <= values.startTime) {
      setError('L’heure de fin doit être après l’heure de début')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      setError('Utilisateur non authentifié')
      return
    }

    try {
      setSubmitting(true)
      await reservationsService.create(token, {
        roomId: values.roomId,
        resourceId: values.resourceId || undefined,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
      })
      navigate('/reservations')
    } catch (err) {
      setError((err as Error).message || 'Erreur serveur')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="card">
      <h2>Nouvelle réservation</h2>
      {error && <Alert kind="error" message={error} />}
      <form onSubmit={submit}>
        <Select
          label="Salle"
          value={values.roomId}
          onChange={(e) => set('roomId', e.target.value)}
          error={errors.roomId}
          required
        >
          <option value="">Sélectionner une salle</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} — {r.capacity} places
            </option>
          ))}
        </Select>

        <Select
          label="Ressource (optionnel)"
          value={values.resourceId}
          onChange={(e) => set('resourceId', e.target.value)}
          error={errors.resourceId}
        >
          <option value="">Aucune</option>
          {resources.map((res) => (
            <option key={res.id} value={res.id} disabled={!res.available}>
              {res.type} — {res.description} {res.available ? '' : '(Indisponible)'}
            </option>
          ))}
        </Select>

        <DateInput
          label="Date"
          value={values.date}
          onChange={(e) => set('date', e.target.value)}
          error={errors.date}
          required
        />
        <TimeInput
          label="Heure début"
          value={values.startTime}
          onChange={(e) => set('startTime', e.target.value)}
          error={errors.startTime}
          required
        />
        <TimeInput
          label="Heure fin"
          value={values.endTime}
          onChange={(e) => set('endTime', e.target.value)}
          error={errors.endTime}
          required
        />

        <div style={{ marginTop: '1rem' }}>
          <Button type="submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Réservation...' : 'Valider'}
          </Button>
        </div>
      </form>
    </section>
  )
}
