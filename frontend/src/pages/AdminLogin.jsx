import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { adminService } from '../services/adminService';

export function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await adminService.login(form);
      localStorage.setItem('cfqma_admin_token', data.token);
      navigate('/admin');
    } catch {
      setError('Identifiants invalides ou serveur indisponible.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold">Connexion admin</h1>
        <label className="mt-6 block text-sm font-semibold">
          Email
          <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring" />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Mot de passe
          <input type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-2 w-full rounded-md border px-3 py-2 focus-ring" />
        </label>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <Button className="mt-6 w-full">Se connecter</Button>
      </form>
    </main>
  );
}
