import { useContext } from 'react';
import { SiteContentContext } from '../context/SiteContentProvider';

export function useSiteContent() {
  return useContext(SiteContentContext);
}
