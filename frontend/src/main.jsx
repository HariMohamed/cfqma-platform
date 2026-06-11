import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentProvider.jsx';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import { router } from './router/router.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <SiteContentProvider>
          <RouterProvider router={router} />
        </SiteContentProvider>
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>
);
