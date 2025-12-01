// src/pages/ResourcesPage.tsx
import { useEffect, useState } from 'react'
import { resourcesService } from '../services/resourcesService'
import type { Resource } from '../types/resource'
import { Table } from '../components/UI/Table'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Select } from '../components/UI/Select'
import { Alert } from '../components/Feedback/Alert'

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [error, setError] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Resource, 'id'>>({ type: '', description: '', available: true })

  async function load() {
    try {
      setResources(await resourcesService.list())
    } catch (e) {
      setError((e as Error).message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function create() {
    try {
      await resourcesService.create(draft)
      setDraft({ type: '', description: '', available: true })
      load()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function remove(id: string) {
    try {
      await resourcesService.remove(id)
      load()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <section>
      <h2>Ressources</h2>
      {error && <Alert kind="error" message={error} />}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3>Ajouter une ressource</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <Input label="Type" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} />
          <Input label="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          <Select label="Disponibilité" value={draft.available ? 'true' : 'false'} onChange={(e) => setDraft({ ...draft, available: e.target.value === 'true' })}>
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </Select>
          <Button onClick={create}>Ajouter</Button>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Type</th>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Description</th>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Disponibilité</th>
            <th style={{ textAlign: 'left', padding: '.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r.id} style={{ borderTop: '1px solid var(--border)' }}>
              <td style={{ padding: '.5rem' }}>{r.type}</td>
              <td style={{ padding: '.5rem' }}>{r.description}</td>
              <td style={{ padding: '.5rem' }}>{r.available ? 'Oui' : 'Non'}</td>
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
