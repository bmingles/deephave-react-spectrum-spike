import React from 'react'
import { ListView, Item, ListData } from '@adobe/react-spectrum'
import { ItemModel, KeyedItem } from '@/models/item'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'

const VIEWPORT_SIZE = 20
const ITEM_HEIGHT = 40

export const ListContainer: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const firstRowIRef = React.useRef(0)

  const table = useRemoteTable('static_table')
  const { viewport, size, setViewport } = useViewportData(
    table,
    'Int',
    VIEWPORT_SIZE,
  )

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const divEl = ref.current!

    function onScroll() {
      const firstRow = Math.floor(divEl.scrollTop / ITEM_HEIGHT)
      if (firstRowIRef.current !== firstRow) {
        firstRowIRef.current = firstRow
        console.log('Scroll', firstRow)
        setViewport(firstRow)
      }
    }

    divEl.addEventListener('scroll', onScroll)

    return () => {
      divEl.removeEventListener('scroll', onScroll)
    }
  }, [setViewport])

  return (
    <>
      <ListForwardedRef ref={ref} viewport={viewport} />
      {size}
    </>
  )
}

export interface ListProps {
  viewport: ListData<KeyedItem<ItemModel>>
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
    <ListView<KeyedItem<ItemModel>>
      ref={innerRef}
      aria-label="ListView"
      selectionMode="multiple"
      maxWidth="size-6000"
      height="size-3000"
      items={viewport.items}
      onLoadMore={onLoadMore}>
      {(item) => <Item>{item.key}</Item>}
    </ListView>
  )
}
List.displayName = 'List'

const ListForwardedRef = React.forwardRef(List)
