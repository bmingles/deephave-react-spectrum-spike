import React from 'react'
import { useRemoteTable } from '@/hooks/dh/useRemoteTable.hook'
import { useRows } from '@/hooks/dh/useRows.hook'

export const meta = { title: 'Table', slug: 'table' }

export interface TableProps {}

const TableContainer: React.FC<TableProps> = () => {
  const table = useRemoteTable('remote_table')
  const rows = useRows(table, 0, 9)

  return (
    <table>
      <thead>
        <tr>
          {table?.columns.map((col) => (
            <th key={col.name}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {table?.columns.map((col) => (
              <td key={col.name}>{String(row.get(col))}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
TableContainer.displayName = 'Table'

export default TableContainer
