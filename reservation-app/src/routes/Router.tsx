// src/routes/Router.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import ReservationsPage from '../pages/ReservationsPage'
import ReservationFormPage from '../pages/ReservationFormPage'
import RoomsPage from '../pages/RoomsPage'
import ResourcesPage from '../pages/ResourcesPage'

// ProtectedRoute inline pour simplifier
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ReservationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations/new"
        element={
          <ProtectedRoute>
            <ReservationFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <RoomsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <ResourcesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

