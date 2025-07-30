import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ROUTE_PATH } from '@/routes/AppRoutes'

export function RequireAuth() {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} replace />
}
