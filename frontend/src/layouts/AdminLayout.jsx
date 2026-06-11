import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BookOpen, ClipboardList, Images, Layers, LayoutDashboard, LogOut, Mail, Newspaper } from 'lucide-react';
import { ScrollToTop } from '../components/ScrollToTop';

const links = [
  ['Dashboard', '/admin', LayoutDashboard],
  ['Formations', '/admin/formations', BookOpen],
  ['Secteurs', '/admin/sectors', Layers],
  ['Actualités', '/admin/news', Newspaper],
  ['Messages', '/admin/contacts', Mail],
  ['Inscriptions', '/admin/registrations', ClipboardList]
];

export function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('cfqma_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <ScrollToTop />
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-ink p-4 text-white lg:block">
        <h1 className="px-3 text-xl font-bold">CFQMA Admin</h1>
        <nav className="mt-8 space-y-1">
          {links.map(([label, to, Icon]) => (
            <NavLink
              end={to === '/admin'}
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-craft' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white">
          <LogOut size={18} />
          Deconnexion
        </button>
      </aside>
      <div className="lg:pl-64">
        <header className="border-b bg-white px-4 py-4 shadow-sm lg:px-8">
          <p className="font-semibold text-ink">Administration</p>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
