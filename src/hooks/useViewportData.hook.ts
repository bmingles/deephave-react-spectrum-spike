import React from 'react'
import { useListData } from '@adobe/react-spectrum'
import dh from '@/dh'
import { RemoverFn, Table } from '@deephaven/jsapi-types'
import { createRowToKeyedItem } from '@/utils/item'
import { ItemModel, KeyedItem } from '@/models/item'

function* createInitialItems(
  size: number,
): Generator<KeyedItem<ItemModel>, void, unknown> {
  for (let i = 0; i < size; ++i) {
    yield { key: String(i), item: {} }
  }
}

export function useViewportData(table: Table | null, viewportSize: number) {
  // const initialItems = React.useMemo(
  //   () => [...createInitialItems(table?.size ?? 0)],
  //   [table?.size],
  // )
  const initialItems = React.useMemo(() => [...createInitialItems(100000)], [])
  console.log('initialItems', initialItems.length)

  const viewport = useListData<KeyedItem<ItemModel>>({
    initialItems,
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
      table.addEventListener(dh.Table.EVENT_UPDATED, (event) => {
        const { offset, rows } = event.detail
        console.groupCollapsed(
          'UPDATED:',
          offset,
          '-',
          offset + rows.length - 1,
        )
        console.log('rows', offset, rows)

        const rowToKeyedItem = createRowToKeyedItem(table, offset)

        for (const row of rows) {
          // const item = rowToItem(row)
          const keyedItem = rowToKeyedItem(row) // { key: String(offset + row.offsetInSnapshot), item }

          if (viewport.getItem(keyedItem.key)) {
            console.log(event.type + ' (update)', keyedItem.key, keyedItem.item)
            viewport.update(keyedItem.key, keyedItem)
          } else {
            console.log(event.type, keyedItem.key, keyedItem.item)
            viewport.append(keyedItem)
          }
        }

        console.groupEnd()
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
