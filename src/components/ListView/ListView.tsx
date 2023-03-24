import React from 'react'
import {
  Item,
  ListBox,
  ListView as ListViewSpectrum,
} from '@adobe/react-spectrum'
import { ItemModel, KeyedItem } from '@/models/item'
import { useScrollEffect } from '@/hooks/useScrollEffect.hook'

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

  useScrollEffect(listRef, 32, onScroll)

  // return (
  //   <ListBox
  //     ref={setRef}
  //     aria-label="Pick an animal"
  //     height="250px"
  //     items={items}
  //     selectionMode="multiple"
  //     width="size-6000">
  //     {(item) => <Item key={item.key}>{String(item.key)}</Item>}
  //   </ListBox>
  // )

  {
    return (
      <ListViewSpectrum
        ref={setRef}
        aria-label="ListView"
        // height="size-3000"
        height="250px"
        items={items}
        maxWidth="size-6000"
        selectionMode="multiple"
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
}

ListView.displayName = 'ListView'

export default ListView
