import React from 'react'
import { ListView, Item, useListData } from '@adobe/react-spectrum'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useRows } from '@/utils/useRows.hook'
import { toItemList } from '@/utils/item'
import { ItemModel } from '@/models/item'

function getKey(item: ItemModel) {
  return item.key as string
}

export interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [firstRow] = React.useState(0)
  const [lastRow] = React.useState(99)

  const table = useRemoteTable('remote_table')
  const rows = useRows(table, firstRow, lastRow)

  const items = React.useMemo(
    () =>
      table
        ? toItemList(table, rows).map((item) => ({
            ...item,
            key: item._offsetInSnapshot + firstRow,
          }))
        : [],
    [table, rows, firstRow],
  )

  const list = useListData<ItemModel>({
    initialItems: [],
    getKey,
  })

  console.log(items, list.items)

  React.useEffect(() => {
    console.log('Updating')
    items.forEach((item) => {
      if (list.getItem(item.key)) {
        // list.update(item.key, item)
      } else {
        list.append(item)
      }
    })
  }, [items, list])

  return (
    <ListView<ItemModel>
      aria-label="ListView"
      selectionMode="multiple"
      maxWidth="size-6000"
      height="size-3000"
      items={list.items}
      // onLoadMore={(): any => {
      //   console.log('load more')
      // }}
    >
      {(item) => <Item>{String(item.key)}</Item>}
    </ListView>
  )
}
List.displayName = 'List'

export default List
