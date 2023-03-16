import React from 'react'
import { Table } from '@deephaven/jsapi-types'
import { useIdeSession } from './useIdeSession.hook'

export function useRemoteTable(tableName: string) {
  const [table, setTable] = React.useState<Table | null>(null)
  const ideSession = useIdeSession()

  React.useEffect(() => {
    void ideSession.getTable(tableName).then(setTable)
    return () => {
      table?.close()
    }
  }, [tableName])

  return table
}
