import { useEffect, useState } from 'react';
import { ErrorState, LoadingState } from '../../components/StateBlock';
import { adminService } from '../../services/adminService';
import { AdminTable } from './AdminTable';

export function AdminInboxPage({ title, resource, columns, statusOptions }) {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const load = async () => {
    setStatus('loading');
    try {
      const response = await adminService.list(resource);
      setRows(response.data ?? response);
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

  const patchStatus = async (row, statusValue) => {
    try {
      await adminService.update(resource, row._id, { status: statusValue });
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
              <select className="rounded-md border px-2 py-1 text-sm" value={row.status || statusOptions[0]} onChange={(event) => patchStatus(row, event.target.value)}>
                {statusOptions.map((statusLabel) => (
                  <option key={statusLabel} value={statusLabel}>
                    {statusLabel}
                  </option>
                ))}
              </select>
            )
          }
        ]}
        empty="Aucune donnee recue pour le moment."
      />
    </div>
  );
}
