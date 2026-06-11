import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Formations } from '../pages/Formations';
import { FormationDetail } from '../pages/FormationDetail';
import { Sectors } from '../pages/Sectors';
import { SectorDetail } from '../pages/SectorDetail';
import { News } from '../pages/News';
import { NewsDetail } from '../pages/NewsDetail';
import { Contact } from '../pages/Contact';
import { Gallery } from '../pages/Gallery';
import { PreRegistration } from '../pages/PreRegistration';
import { Admission } from '../pages/Admission';
import { Accompagnement } from '../pages/Accompagnement';
import { FAQ } from '../pages/FAQ';
import { ApplicationTracking } from '../pages/ApplicationTracking';
import { AdminLogin } from '../pages/AdminLogin';
import { AdminDashboard } from '../pages/AdminDashboard';
import { AdminFormations } from '../pages/AdminFormations';
import { AdminSectors } from '../pages/AdminSectors';
import { AdminNews } from '../pages/AdminNews';
import { AdminGallery } from '../pages/AdminGallery';
import { AdminContacts } from '../pages/AdminContacts';
import { AdminRegistrations } from '../pages/AdminRegistrations';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/formations', element: <Formations /> },
      { path: '/formations/:slug', element: <FormationDetail /> },
      { path: '/sectors', element: <Sectors /> },
      { path: '/sectors/:slug', element: <SectorDetail /> },
      { path: '/news', element: <News /> },
      { path: '/news/:slug', element: <NewsDetail /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/contact', element: <Contact /> },
      { path: '/pre-registration', element: <PreRegistration /> },
      { path: '/admission', element: <Admission /> },
      { path: '/accompagnement', element: <Accompagnement /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/application-tracking', element: <ApplicationTracking /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'formations', element: <AdminFormations /> },
          { path: 'sectors', element: <AdminSectors /> },
          { path: 'news', element: <AdminNews /> },
          { path: 'gallery', element: <AdminGallery /> },
          { path: 'contacts', element: <AdminContacts /> },
          { path: 'registrations', element: <AdminRegistrations /> }
        ]
      }
    ]
  }
]);
