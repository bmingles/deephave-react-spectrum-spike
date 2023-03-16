import React from 'react'
import { ListView, Item, ListData } from '@adobe/react-spectrum'
import { ItemModel } from '@/models/item'

export interface ListProps {
  viewport: ListData<ItemModel>
}

const List: React.FC<ListProps> = ({ viewport }) => {
  const onLoadMore = React.useCallback(() => {
    console.log('load more')
  }, [])

  return (
    <ListView<ItemModel>
      aria-label="ListView"
      selectionMode="multiple"
      maxWidth="size-6000"
      height="size-3000"
      items={viewport.items}
      onLoadMore={onLoadMore}>
      {(item) => <Item>{String(item.key)}</Item>}
    </ListView>
  )
}
List.displayName = 'List'

export default List
