import type { ReactNode } from 'react'
import { EmptyState } from '../common/EmptyState'
import { Skeleton } from '../common/Loader'
export interface TableColumn<T> { key: string; header: string; render: (item: T) => ReactNode }
export function DataTable<T extends { id: string }>({ columns, data, loading = false, emptyMessage = 'No records found.' }: { columns: TableColumn<T>[]; data: T[]; loading?: boolean; emptyMessage?: string }) { return <div className="az-table-wrap"><table className="az-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.header}</th>)}</tr></thead><tbody>{loading ? Array.from({ length: 3 }, (_, index) => <tr key={index}>{columns.map((column) => <td key={column.key}><Skeleton /></td>)}</tr>) : data.map((item) => <tr key={item.id}>{columns.map((column) => <td key={column.key}>{column.render(item)}</td>)}</tr>)}</tbody></table>{!loading && data.length === 0 && <EmptyState title={emptyMessage} />}</div> }
