export function AdminTable({ title, columns, rows, empty = 'Aucune donnee.', actions }) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {actions}
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b text-ink/50">
              {columns.map((column) => (
                <th key={column.key} className="py-3 pr-4 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="py-6 text-ink/50" colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row._id || row.slug || row.email || row.title} className="border-b last:border-0">
                  {columns.map((column) => (
                    <td key={column.key} className="py-3 pr-4 align-top">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
