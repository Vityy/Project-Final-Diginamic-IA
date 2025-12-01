// src/pages/LoginPage.tsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../services/apiClient' // 👈 utilise directement apiClient
import { useForm } from '../hooks/useForm'
import { loginSchema } from '../utils/validator'
import { Input } from '../components/UI/Input'
import { Button } from '../components/UI/Button'
import { Alert } from '../components/Feedback/Alert'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/reservations' // 👈 redirection par défaut
  const { values, set, errors, validate } = useForm({ email: '', password: '' }, loginSchema)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)
    if (!validate()) return
    try {
      setSubmitting(true)
      const res = await api.login(values.email, values.password) // 👈 utilise api.login
      localStorage.setItem('token', res.token)                   // 👈 stocke le token
      navigate(from, { replace: true })                          // 👈 redirection
    } catch (err) {
      setServerError((err as Error).message || 'Authentification échouée')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '4rem auto' }}>
      <h2>Connexion</h2>
      <form onSubmit={onSubmit} aria-describedby={serverError ? 'login-error' : undefined}>
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          error={errors.email}
          required
        />
        <Input
          label="Mot de passe"
          type="password"
          value={values.password}
          onChange={(e) => set('password', e.target.value)}
          error={errors.password}
          required
        />
        {serverError && <Alert kind="error" message={serverError} />}
        <div style={{ marginTop: '1rem' }}>
          <Button type="submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Connexion...' : 'Se connecter'}
          </Button>
        </div>
      </form>
    </div>
  )
}
