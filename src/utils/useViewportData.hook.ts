import React from 'react'
import { useListData } from '@adobe/react-spectrum'
import dh from '@/dh'
import { RemoverFn, Table } from '@deephaven/jsapi-types'
import { ItemModel } from '@/models/item'
import { toItem } from './item'

export function useViewportData(table: Table | null, viewportSize: number) {
  const [firstRow, setFirstRow] = React.useState(0)
  const lastRow = firstRow + viewportSize - 1

  const getKey = React.useCallback(
    (item: ItemModel) => {
      return String(firstRow + item._offsetInSnapshot + 1)
    },
    [firstRow],
  )

  const viewport = useListData({
    getKey,
    initialItems: [],
  })

  const onChangePage = React.useCallback(
    (direction: -1 | 1) => {
      viewport.remove(...viewport.items.map((item) => String(item.key)))
      setFirstRow((firstRow) => firstRow + viewportSize * direction)
    },
    [viewportSize, viewport],
  )

  const onPrevPage = React.useCallback(() => {
    onChangePage(-1)
  }, [onChangePage])

  const onNextPage = React.useCallback(() => {
    onChangePage(1)
  }, [onChangePage])

  const removerFnRef = React.useRef<RemoverFn[]>([])

  React.useEffect(() => {
    if (!table) {
      return
    }

    removerFnRef.current = [
      table.addEventListener(dh.Table.EVENT_ROWADDED, (event) => {
        console.log(event.type, event.detail.row)
        const item = toItem(table)(event.detail.row)
        viewport.append({ ...item, key: getKey(item) })
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
    table?.setViewport(firstRow, lastRow)
  }, [firstRow, lastRow, table])

  return {
    viewport,
    firstRow,
    lastRow,
    size: table?.size ?? 0,
    onPrevPage,
    onNextPage,
  }
}
