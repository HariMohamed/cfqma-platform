import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingState } from '../components/StateBlock';
import { adminService } from '../services/adminService';

export function ProtectedRoute() {
  const [status, setStatus] = useState(() => (localStorage.getItem('cfqma_admin_token') ? 'checking' : 'guest'));

  useEffect(() => {
    if (status !== 'checking') return;

    let active = true;

    adminService
      .me()
      .then(() => {
        if (active) setStatus('authorized');
      })
      .catch(() => {
        localStorage.removeItem('cfqma_admin_token');
        if (active) setStatus('guest');
      });

    return () => {
      active = false;
    };
  }, [status]);

  if (status === 'checking') {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <LoadingState label="Vérification de la session admin..." />
      </main>
    );
  }

  return status === 'authorized' ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
