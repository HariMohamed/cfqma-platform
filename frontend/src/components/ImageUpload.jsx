import { ImagePlus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { adminService } from '../services/adminService';
import { mediaUrl } from '../utils/media';

const maxSize = 5 * 1024 * 1024;
const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

export function ImageUpload({ label, value, onChange, required = false }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');

    if (!acceptedTypes.includes(file.type)) {
      setError('Format refusé. Utilisez JPG, PNG, WEBP ou SVG.');
      event.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      setError('Image trop lourde. Taille maximale: 5MB.');
      event.target.value = '';
      return;
    }

    setStatus('uploading');
    try {
      const data = await adminService.uploadImage(file);
      onChange(data.url);
      setStatus('idle');
    } catch {
      setStatus('idle');
      setError('Upload impossible. Vérifiez le type du fichier, la taille et la session admin.');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="block text-sm font-semibold md:col-span-2">
      <span>{label}</span>
      <div className="mt-2 grid gap-4 rounded-lg border border-dashed border-ink/20 p-4">
        {value && (
          <div className="overflow-hidden rounded-md bg-slate-50 ring-1 ring-ink/10">
            <img src={mediaUrl(value)} alt="Aperçu" className="h-44 w-full object-contain" />
          </div>
        )}
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-moss">
          {status === 'uploading' ? <Loader2 size={17} className="animate-spin" /> : <ImagePlus size={17} />}
          {status === 'uploading' ? 'Upload...' : 'Importer une image'}
          <input type="file" accept={acceptedTypes.join(',')} className="sr-only" onChange={upload} disabled={status === 'uploading'} />
        </label>
        <label className="block">
          URL manuelle
          <input
            required={required}
            type="text"
            value={value ?? ''}
            onChange={(event) => onChange(event.target.value)}
            className="mt-2 w-full rounded-md border px-3 py-2 focus-ring"
            placeholder="/uploads/image.webp ou https://..."
          />
        </label>
        {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      </div>
    </div>
  );
}
