import React from 'react'
import { useListData } from '@adobe/react-spectrum'
import dh from '@/dh'
import { RemoverFn, Table } from '@deephaven/jsapi-types'
import { createGetKey, toItem } from './item'

export function useViewportData(
  table: Table | null,
  keyColumnName: string,
  viewportSize: number,
) {
  const getKey = React.useMemo(
    () => createGetKey(keyColumnName),
    [keyColumnName],
  )

  const viewport = useListData({
    getKey,
    initialItems: [],
  })

  const setViewport = React.useCallback(
    (firstRow: number, lastRow: number) => {
      table?.setViewport(firstRow, lastRow)
    },
    [table],
  )

  const removerFnRef = React.useRef<RemoverFn[]>([])

  React.useEffect(() => {
    if (!table) {
      return
    }

    removerFnRef.current = [
      table.addEventListener(dh.Table.EVENT_ROWADDED, (event) => {
        const item = toItem(table)(event.detail.row)
        const key = getKey(item)
        const itemWithKey = { ...item, key }

        if (viewport.getItem(key)) {
          // console.log(key, 'exists')
          // viewport.update(key, itemWithKey)
        } else {
          console.log(event.type, key, itemWithKey)
          viewport.append(itemWithKey)
        }
      }),
      table.addEventListener(dh.Table.EVENT_ROWREMOVED, (event) => {
        console.log(event.type, event.detail.row)
      }),
      table.addEventListener(dh.Table.EVENT_ROWUPDATED, (event) => {
        console.log(event.type, event.detail.row)
      }),
    ]

    return () => {
      removerFnRef.current.forEach((fn) => {
        fn()
      })
    }
  }, [getKey, viewport, table])

  React.useEffect(() => {
    table?.setViewport(0, viewportSize - 1)
  }, [table, viewportSize])

  return {
    viewport,
    size: table?.size ?? 0,
    setViewport,
  }
}
