import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('cfqma_admin_token');
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
