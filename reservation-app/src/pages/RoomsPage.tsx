// src/pages/RoomsPage.tsx
import { useEffect, useState } from 'react'
import { roomsService } from '../services/roomsService'
import type { Room } from '../types/room'
import { Table } from '../components/UI/Table'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Alert } from '../components/Feedback/Alert'

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [error, setError] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Room, 'id'>>({ name: '', capacity: 0, location: '' })

  async function load() {
    try {
      setRooms(await roomsService.list())
    } catch (e) {
      setError((e as Error).message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function create() {
    try {
      await roomsService.create(draft)
      setDraft({ name: '', capacity: 0, location: '' })
      load()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function remove(id: string) {
    try {
      await roomsService.remove(id)
      load()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <section>
      <h2>Salles</h2>
      {error && <Alert kind="error" message={error} />}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3>Ajouter une salle</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <Input label="Nom" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <Input
            label="Capacité"
            type="number"
            min={0}
            value={draft.capacity}
            onChange={(e) => setDraft({ ...draft, capacity: Number(e.target.value) })}
          />
          <Input label="Localisation" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
          <Button onClick={create}>Ajouter</Button>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Nom</th>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Capacité</th>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Localisation</th>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '.5rem' }}>{r.name}</td>
              <td style={{ padding: '.5rem' }}>{r.capacity}</td>
              <td style={{ padding: '.5rem' }}>{r.location}</td>
              <td style={{ padding: '.5rem' }}>
                <Button variant="danger" onClick={() => remove(r.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}
