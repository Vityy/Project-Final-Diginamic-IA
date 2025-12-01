// src/hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { getCurrentUser, logout as doLogout } from '../services/authService'

export function useAuth() {
  const [user, setUser] = useState(getCurrentUser())
  useEffect(() => {
    const raw = localStorage.getItem('user')
    setUser(raw ? JSON.parse(raw) : null)
  }, [])
  return {
    user,
    isAuthenticated: Boolean(localStorage.getItem('token')),
    logout: doLogout,
  }
}
