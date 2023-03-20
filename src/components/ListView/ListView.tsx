import React from 'react'
import {
  Item,
  ListView as ListViewSpectrum,
  useAsyncList,
} from '@adobe/react-spectrum'
import { ItemModel, KeyedItem } from '@/models/item'
import { useScrollEffect } from '@/utils/useScrollEffect.hook'
import { ITEM_HEIGHT } from '../ListBox/ListBoxOption'

export interface ListViewProps {
  items: KeyedItem<ItemModel>[]
  onScroll: (offset: number) => void
}

const ListView: React.FC<ListViewProps> = ({ items, onScroll }) => {
  const listRef = React.useRef<HTMLDivElement | null>(null)

  const setRef = React.useCallback(
    (ref: { UNSAFE_getDOMNode(): HTMLDivElement } | null) => {
      if (ref) {
        listRef.current = ref.UNSAFE_getDOMNode()
      }
    },
    [],
  )

  useScrollEffect(listRef, ITEM_HEIGHT, onScroll)

  // const aList = useAsyncList<KeyedItem<ItemModel>>({
  //   async load({ signal, cursor = '0' }) {
  //     console.log('cursor', cursor)

  //     await Promise.resolve()

  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({
  //           items: new Array(20)
  //             .fill('')
  //             .map((_, i) => ({ key: String(i + Number(cursor)), item: {} })),
  //           cursor: String(Number(cursor) + 20),
  //         })
  //       }, 500)
  //     })
  //   },
  // })

  // console.log(aList)

  return (
    <ListViewSpectrum
      ref={setRef}
      aria-label="ListView"
      selectionMode="single"
      maxWidth="size-6000"
      height="size-3000"
      items={items}
      onLoadMore={() => {
        console.log('onLoadMore')
      }}
      // items={aList.items}
      // loadingState={aList.loadingState}
      // onLoadMore={aList.loadMore}
    >
      {(item) => <Item key={item.key}>{String(item.key)}</Item>}
    </ListViewSpectrum>
  )
}

ListView.displayName = 'ListView'

export default ListView
