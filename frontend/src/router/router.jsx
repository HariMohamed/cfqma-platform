import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingState } from '../components/StateBlock';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { ProtectedRoute } from './ProtectedRoute';

const Home = lazyPage(() => import('../pages/Home'), 'Home');
const About = lazyPage(() => import('../pages/About'), 'About');
const Formations = lazyPage(() => import('../pages/Formations'), 'Formations');
const FormationDetail = lazyPage(() => import('../pages/FormationDetail'), 'FormationDetail');
const Sectors = lazyPage(() => import('../pages/Sectors'), 'Sectors');
const SectorDetail = lazyPage(() => import('../pages/SectorDetail'), 'SectorDetail');
const News = lazyPage(() => import('../pages/News'), 'News');
const NewsDetail = lazyPage(() => import('../pages/NewsDetail'), 'NewsDetail');
const Contact = lazyPage(() => import('../pages/Contact'), 'Contact');
const Gallery = lazyPage(() => import('../pages/Gallery'), 'Gallery');
const PreRegistration = lazyPage(() => import('../pages/PreRegistration'), 'PreRegistration');
const Admission = lazyPage(() => import('../pages/Admission'), 'Admission');
const Accompagnement = lazyPage(() => import('../pages/Accompagnement'), 'Accompagnement');
const FAQ = lazyPage(() => import('../pages/FAQ'), 'FAQ');
const ApplicationTracking = lazyPage(() => import('../pages/ApplicationTracking'), 'ApplicationTracking');
const AdminLogin = lazyPage(() => import('../pages/AdminLogin'), 'AdminLogin');
const AdminDashboard = lazyPage(() => import('../pages/AdminDashboard'), 'AdminDashboard');
const AdminFormations = lazyPage(() => import('../pages/AdminFormations'), 'AdminFormations');
const AdminSectors = lazyPage(() => import('../pages/AdminSectors'), 'AdminSectors');
const AdminNews = lazyPage(() => import('../pages/AdminNews'), 'AdminNews');
const AdminGallery = lazyPage(() => import('../pages/AdminGallery'), 'AdminGallery');
const AdminPartners = lazyPage(() => import('../pages/AdminPartners'), 'AdminPartners');
const AdminSettings = lazyPage(() => import('../pages/AdminSettings'), 'AdminSettings');
const AdminPageContent = lazyPage(() => import('../pages/AdminPageContent'), 'AdminPageContent');
const AdminContacts = lazyPage(() => import('../pages/AdminContacts'), 'AdminContacts');
const AdminRegistrations = lazyPage(() => import('../pages/AdminRegistrations'), 'AdminRegistrations');
const NotFound = lazyPage(() => import('../pages/NotFound'), 'NotFound');

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: routeElement(Home) },
      { path: '/about', element: routeElement(About) },
      { path: '/formations', element: routeElement(Formations) },
      { path: '/formations/:slug', element: routeElement(FormationDetail) },
      { path: '/sectors', element: routeElement(Sectors) },
      { path: '/sectors/:slug', element: routeElement(SectorDetail) },
      { path: '/news', element: routeElement(News) },
      { path: '/news/:slug', element: routeElement(NewsDetail) },
      { path: '/gallery', element: routeElement(Gallery) },
      { path: '/contact', element: routeElement(Contact) },
      { path: '/pre-registration', element: routeElement(PreRegistration) },
      { path: '/admission', element: routeElement(Admission) },
      { path: '/accompagnement', element: routeElement(Accompagnement) },
      { path: '/faq', element: routeElement(FAQ) },
      { path: '/application-tracking', element: routeElement(ApplicationTracking) },
      { path: '*', element: routeElement(NotFound) }
    ]
  },
  { path: '/admin/login', element: routeElement(AdminLogin) },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: routeElement(AdminDashboard) },
          { path: 'formations', element: routeElement(AdminFormations) },
          { path: 'sectors', element: routeElement(AdminSectors) },
          { path: 'news', element: routeElement(AdminNews) },
          { path: 'gallery', element: routeElement(AdminGallery) },
          { path: 'partners', element: routeElement(AdminPartners) },
          { path: 'settings', element: routeElement(AdminSettings) },
          { path: 'page-content', element: routeElement(AdminPageContent) },
          { path: 'contacts', element: routeElement(AdminContacts) },
          { path: 'registrations', element: routeElement(AdminRegistrations) }
        ]
      }
    ]
  }
]);

function lazyPage(loader, exportName) {
  return lazy(() => loader().then((module) => ({ default: module[exportName] })));
}

function routeElement(Component) {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Component />
    </Suspense>
  );
}

function RouteLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <LoadingState label="Chargement de la page..." />
    </div>
  );
}
