import React from 'react'
import { useListData } from '@adobe/react-spectrum'
import dh from '@/dh'
import { RemoverFn, Table } from '@deephaven/jsapi-types'
import { createGetKey, toItem } from './item'
import { ItemModel, KeyedItem } from '@/models/item'

export function useViewportData(
  table: Table | null,
  keyColumnName: string,
  viewportSize: number,
) {
  const getKey = React.useMemo(
    () => createGetKey(keyColumnName),
    [keyColumnName],
  )

  const viewport = useListData<KeyedItem<ItemModel>>({
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
        const keyedItem = { key: getKey(item), item }

        if (viewport.getItem(keyedItem.key)) {
          console.log(event.type + ' (update)', keyedItem.key, keyedItem.item)
          viewport.update(keyedItem.key, keyedItem)
        } else {
          console.log(event.type, keyedItem.key, keyedItem.item)
          viewport.append(keyedItem)
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
