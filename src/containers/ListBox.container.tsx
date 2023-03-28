import React from 'react'
import { Item, ListBox } from '@adobe/react-spectrum'
import { useOnScrollOffsetChangeCallback } from '@/hooks/useOnScrollOffsetChangeCallback.hook'
import { useSpectrumOnScrollRef } from '@/hooks/reactSpectrum/useSpectrumOnScrollRef.hook'
import { useRemoteTable } from '@/hooks/dh/useRemoteTable.hook'
import { useViewportData } from '@/hooks/dh/useViewportData.hook'
import { TABLE } from '@/utils/initTable'

export const meta = { title: 'List Box', slug: 'list-box' }

const ITEM_SIZE = 32
const VIEWPORT_SIZE = 200
const SCROLL_DEBOUNCE_MS = 150

/**
 * Virtual scrolling + viewport windowing.
 */
const ListBoxContainer: React.FC = () => {
  const table = useRemoteTable(TABLE.STATIC_TABLE_100_000)
  const { size, viewport, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = useOnScrollOffsetChangeCallback(
    ITEM_SIZE,
    setViewport,
    SCROLL_DEBOUNCE_MS,
  )
  const ref = useSpectrumOnScrollRef(onScroll)

  return (
    <>
      {size.toLocaleString()}
      <ListBox
        ref={ref}
        aria-label="ListBox"
        height="250px"
        items={viewport.items}
        maxWidth="size-6000"
        selectionMode="multiple">
        {(item) => <Item key={item.key}>{item.item ? item.key : '...'}</Item>}
      </ListBox>
    </>
  )
}

export default ListBoxContainer
