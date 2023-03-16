import React from 'react'
import { ListView, Item } from '@adobe/react-spectrum'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useRows } from '@/utils/useRows.hook'
import { toItemList } from '@/utils/item'
import { ItemModel } from '@/models/item'

export interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [firstRow] = React.useState(0)
  const [lastRow] = React.useState(9)

  const table = useRemoteTable('remote_table')
  const rows = useRows(table, firstRow, lastRow)

  const items = React.useMemo(
    () => (table ? toItemList(table, rows) : []),
    [table, rows],
  )
  console.log(rows, items)

  return (
    <ListView<ItemModel>
      aria-label="ListView"
      selectionMode="multiple"
      maxWidth="size-6000"
      height="size-3000"
      items={items}
      onLoadMore={function (...args: any[]): any {
        console.log('load more')
      }}>
      {(item) => (
        <Item key={item._offsetInSnapshot + firstRow}>
          {item._offsetInSnapshot}
        </Item>
      )}
    </ListView>
  )
}
List.displayName = 'List'

export default List
