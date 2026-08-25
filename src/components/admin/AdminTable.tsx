import type { ReactNode } from 'react'
import { EmptyState } from '../common/EmptyState'
import { Skeleton } from '../common/Loader'

export interface AdminTableColumn<T> {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
  width?: string
  render: (item: T, index: number) => ReactNode
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  emptyAction?: ReactNode
  keyExtractor?: (item: T, index: number) => string
  className?: string
}

export function AdminTable<T extends { id?: string }>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found.',
  emptyDescription,
  emptyAction,
  keyExtractor,
  className = '',
}: AdminTableProps<T>) {
  return (
    <div className={`az-admin-table-container ${className}`}>
      <div className="az-admin-table-wrap">
        <table className="az-admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    textAlign: column.align ?? 'left',
                    width: column.width,
                  }}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }, (_, rIdx) => (
                <tr key={`skeleton-${rIdx}`} className="az-admin-table__row--skeleton">
                  {columns.map((col) => (
                    <td key={col.key}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, index) => {
                const key = keyExtractor ? keyExtractor(item, index) : item.id || `row-${index}`
                return (
                  <tr key={key} className="az-admin-table__row">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        style={{ textAlign: column.align ?? 'left' }}
                      >
                        {column.render(item, index)}
                      </td>
                    ))}
                  </tr>
                )
              })
            ) : null}
          </tbody>
        </table>
      </div>

      {!loading && data.length === 0 && (
        <div className="az-admin-table__empty">
          <EmptyState title={emptyMessage} description={emptyDescription} action={emptyAction} />
        </div>
      )}
    </div>
  )
}
