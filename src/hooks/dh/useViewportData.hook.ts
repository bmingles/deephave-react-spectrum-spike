import React from 'react'
import { useListData } from 'react-stately'
import dh from '@/dh'
import { RemoverFn, Table } from '@deephaven/jsapi-types'
import { createRowToKeyedItem } from '@/utils/item'
import { ItemModel, KeyedItem } from '@/models/item'

/**
 * For windowing to work, the underlying list needs to have the full number
 * of items. This is needed internally by react-spectrum so it can calculate
 * the content area size. This generator can create a range of minimal
 * `KeyedItem` objects.
 * @param size
 */
function* createInitialItems(
  size: number,
): Generator<KeyedItem<ItemModel>, void, unknown> {
  for (let i = 0; i < size; ++i) {
    yield { key: String(i) }
  }
}

/**
 * Safe way to check table size.
 * @param table
 */
function getSizeSafe(table?: Table | null): number {
  return table && !table.isClosed ? table.size : 0
}

export function useViewportData(table: Table | null, viewportSize: number) {
  const viewport = useListData<KeyedItem<ItemModel>>({})

  // We only want this to fire 1x once the table exists.
  // TODO: this needs some more thought if there are cases where the `table`
  // instance could change. The challenge here is that `useListData` has no
  // way to respond to such change, so we'd probably need to manually delete
  // items in the viewport and then re-initialize.
  React.useEffect(() => {
    if (table) {
      viewport.insert(0, ...createInitialItems(getSizeSafe(table)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  const [viewportFirstRow, setViewportFirstRow] = React.useState(0)

  const setViewport = React.useCallback(
    (firstRow: number) => {
      // adjust our viewport to have leading items
      firstRow = Math.max(0, firstRow - Math.floor(viewportSize / 2))

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
    if (table && !table.isClosed) {
      table.setViewport(0, viewportSize - 1)
    }
  }, [table, viewportSize])

  return {
    viewport,
    size: getSizeSafe(table),
    setViewport,
  }
}
