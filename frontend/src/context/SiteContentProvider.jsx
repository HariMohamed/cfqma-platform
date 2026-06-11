import { createContext, useEffect, useMemo, useState } from 'react';
import { publicService } from '../services/publicService';

const emptySettings = {
  phoneNumbers: [],
  email: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
  openingHours: '',
  mapEmbedUrl: '',
  defaultLanguage: 'fr'
};

export const SiteContentContext = createContext({
  settings: emptySettings,
  partners: [],
  status: 'loading',
  error: '',
  refresh: () => {}
});

export function SiteContentProvider({ children }) {
  const [settings, setSettings] = useState(emptySettings);
  const [partners, setPartners] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    setError('');
    try {
      const [settingsData, partnersData] = await Promise.all([publicService.getSettings(), publicService.getPartners()]);
      setSettings({ ...emptySettings, ...settingsData });
      setPartners(partnersData);
      setStatus('ready');
    } catch {
      setSettings(emptySettings);
      setPartners([]);
      setStatus('error');
      setError('Impossible de charger les paramètres du site depuis le backend.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const value = useMemo(() => ({ settings, partners, status, error, refresh: load }), [settings, partners, status, error]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}
