import { useEffect, useState } from 'react';
import { ErrorState, LoadingState } from '../../components/StateBlock';
import { adminService } from '../../services/adminService';
import { AdminTable } from './AdminTable';

export function AdminInboxPage({ title, resource, columns, statusOptions, allowPublicMessage = false }) {
  const [rows, setRows] = useState([]);
  const [publicMessages, setPublicMessages] = useState({});
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    try {
      const response = await adminService.list(resource);
      const nextRows = response.data ?? response;
      setRows(nextRows);
      if (allowPublicMessage) {
        setPublicMessages(Object.fromEntries(nextRows.map((row) => [row._id, row.publicMessage || ''])));
      }
      setStatus('ready');
    } catch {
      setRows([]);
      setStatus('ready');
      setError('Backend indisponible ou session admin expiree.');
    }
  };

  useEffect(() => {
    load();
  }, [resource]);

  const patchStatus = async (row, statusValue, publicMessageValue = publicMessages[row._id] ?? row.publicMessage ?? '') => {
    try {
      const payload = allowPublicMessage ? { status: statusValue, publicMessage: publicMessageValue } : { status: statusValue };
      await adminService.update(resource, row._id, payload);
      await load();
    } catch {
      setError('Impossible de mettre a jour le statut.');
    }
  };

  if (status === 'loading') return <LoadingState />;

  return (
    <div className="grid gap-6">
      {error && <ErrorState label={error} />}
      <AdminTable
        title={title}
        rows={rows}
        columns={[
          ...columns,
          {
            key: 'actions',
            label: 'Statut',
            render: (row) => (
              <div className="grid min-w-[220px] gap-2">
                <select className="rounded-md border px-2 py-1 text-sm" value={row.status || statusOptions[0]} onChange={(event) => patchStatus(row, event.target.value)}>
                  {statusOptions.map((statusLabel) => (
                    <option key={statusLabel} value={statusLabel}>
                      {statusLabel}
                    </option>
                  ))}
                </select>
                {allowPublicMessage && (
                  <>
                    <textarea
                      className="min-h-20 rounded-md border px-2 py-1 text-sm"
                      maxLength={500}
                      value={publicMessages[row._id] ?? ''}
                      onChange={(event) => setPublicMessages((current) => ({ ...current, [row._id]: event.target.value }))}
                      placeholder="Message public visible dans le suivi"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-ink/85"
                      onClick={() => patchStatus(row, row.status || statusOptions[0])}
                    >
                      Enregistrer le message
                    </button>
                  </>
                )}
              </div>
            )
          }
        ]}
        empty="Aucune donnee recue pour le moment."
      />
    </div>
  );
}
