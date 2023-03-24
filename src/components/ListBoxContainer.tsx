import React from 'react'
import { Item, ListBox } from '@adobe/react-spectrum'
import { useOnScrollOffsetChangeCallback } from '@/hooks/useOnScrollOffsetChangeCallback.hook'
import { useOnScrollRef } from '@/hooks/useOnScrollRef.hook'
import { useRemoteTable } from '@/hooks/useRemoteTable.hook'
import { useViewportData } from '@/hooks/useViewportData.hook'

const ITEM_SIZE = 32
const VIEWPORT_SIZE = 10
const SCROLL_DEBOUNCE_MS = 150

/**
 * Virtual scrolling + viewport windowing.
 */
const ListBoxContainer: React.FC = () => {
  const table = useRemoteTable('static_table')
  const { viewport, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = useOnScrollOffsetChangeCallback(
    ITEM_SIZE,
    setViewport,
    SCROLL_DEBOUNCE_MS,
  )
  const ref = useOnScrollRef(onScroll)

  return (
    <ListBox
      ref={ref}
      aria-label="ListBox"
      height="250px"
      items={viewport.items}
      maxWidth="size-6000"
      selectionMode="multiple">
      {(item) => <Item key={item.key}>{String(item.key)}</Item>}
    </ListBox>
  )
}

export default ListBoxContainer
