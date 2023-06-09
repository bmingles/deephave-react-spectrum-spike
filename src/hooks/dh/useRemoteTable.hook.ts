import React from 'react'
import { Table } from '@deephaven/jsapi-types'
import { useIdeSession } from './useIdeSession.hook'

/**
 * Synchronously get a dh Table instance with the given name.
 * Returns null if it has not been loaded yet.
 * @param tableName
 */
export function useRemoteTable(tableName: string): Table | null {
  const [table, setTable] = React.useState<Table | null>(null)
  const ideSession = useIdeSession()

  React.useEffect(() => {
    let table: Table

    async function getTable() {
      table = await ideSession.getTable(tableName)
      setTable(table)
    }

    void getTable()

    return () => {
      table?.close()
    }
  }, [ideSession, tableName])

  return table
}
