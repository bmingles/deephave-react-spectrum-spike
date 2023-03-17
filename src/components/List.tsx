import React from 'react'
import { ListView, Item, ListData } from '@adobe/react-spectrum'
import { ItemModel } from '@/models/item'

// type ListViewRef = Required<Parameters<typeof ListView>[0]>['ref']

export interface ListProps {
  viewport: ListData<ItemModel>
}

const List: React.ForwardRefRenderFunction<HTMLDivElement, ListProps> = (
  { viewport },
  ref: React.ForwardedRef<HTMLDivElement | null>,
) => {
  const innerRef = React.useRef<{ UNSAFE_getDOMNode(): HTMLDivElement } | null>(
    null,
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  React.useImperativeHandle(ref, () => innerRef.current!.UNSAFE_getDOMNode())

  const onLoadMore = React.useCallback(() => {
    console.log('load more')
  }, [])

  return (
    <ListView<ItemModel>
      ref={innerRef}
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

export default React.forwardRef(List)
