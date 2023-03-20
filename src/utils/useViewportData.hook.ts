import React from 'react'
import { useListData } from '@adobe/react-spectrum'
import dh from '@/dh'
import { RemoverFn, Table } from '@deephaven/jsapi-types'
import { toItem } from './item'
import { ItemModel, KeyedItem } from '@/models/item'

export function useViewportData(table: Table | null, viewportSize: number) {
  const viewport = useListData<KeyedItem<ItemModel>>({
    initialItems: [],
  })

  const [viewportFirstRow, setViewportFirstRow] = React.useState(0)

  const setViewport = React.useCallback(
    (firstRow: number) => {
      const lastRow = firstRow + viewportSize - 1
      table?.setViewport(firstRow, lastRow)
      setViewportFirstRow(firstRow)
    },
    [table, viewportSize],
  )

  const removerFnRef = React.useRef<RemoverFn[]>([])

  React.useEffect(() => {
    if (!table) {
      return
    }

    removerFnRef.current = [
      // table.addEventListener(dh.Table.EVENT_ROWADDED, (event) => {
      // const index = viewportFirstRow + event.detail.index
      // const item = toItem(table)(event.detail.row)
      // const keyedItem = { key: getKey(item), item }
      // if (viewport.getItem(keyedItem.key)) {
      //   console.log(event.type + ' (update)', keyedItem.key, keyedItem.item)
      //   viewport.update(keyedItem.key, keyedItem)
      // } else {
      //   console.log(
      //     event.type,
      //     keyedItem.key,
      //     [index, viewportFirstRow, event.detail.index],
      //     keyedItem.item,
      //   )
      //   viewport.append(keyedItem)
      // }
      // }),
      // table.addEventListener(dh.Table.EVENT_ROWREMOVED, (event) => {
      //   console.log(event.type, event.detail.row)
      // }),
      // table.addEventListener(dh.Table.EVENT_ROWUPDATED, (event) => {
      //   console.log(event.type, event.detail.row)
      // }),
      table.addEventListener(dh.Table.EVENT_UPDATED, (event) => {
        const { offset, rows } = event.detail
        console.log('UPDATED', offset, rows)

        for (const row of rows) {
          const item = toItem(table)(row)
          const keyedItem = { key: String(offset + row.offsetInSnapshot), item }

          if (viewport.getItem(keyedItem.key)) {
            console.log(event.type + ' (update)', keyedItem.key, keyedItem.item)
            viewport.update(keyedItem.key, keyedItem)
          } else {
            console.log(event.type, keyedItem.key, keyedItem.item)
            viewport.append(keyedItem)
          }
        }
      }),
    ]

    return () => {
      removerFnRef.current.forEach((fn) => {
        fn()
      })
    }
  }, [table, viewport, viewportFirstRow])

  React.useEffect(() => {
    table?.setViewport(0, viewportSize - 1)
  }, [table, viewportSize])

  return {
    viewport,
    size: table?.size ?? 0,
    setViewport,
  }
}
