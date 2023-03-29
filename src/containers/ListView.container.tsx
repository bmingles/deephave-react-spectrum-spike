import React from 'react'
import { Item, ListView as ListViewSpectrum, View } from '@adobe/react-spectrum'
import { useOnScrollOffsetChangeCallback } from '@/hooks/useOnScrollOffsetChangeCallback.hook'
import { useSpectrumOnScrollRef } from '@/hooks/reactSpectrum/useSpectrumOnScrollRef.hook'
import { useRemoteTable } from '@/hooks/dh/useRemoteTable.hook'
import { useViewportData } from '@/hooks/dh/useViewportData.hook'
import { TABLE } from '@/utils/initTable'
import { Meta } from '@/utils/routes'

const ITEM_SIZE = 40
const VIEWPORT_SIZE = 200
const SCROLL_DEBOUNCE_MS = 150

export const meta: Meta = {
  title: 'List View',
  slug: 'list-view',
  category: 'spectrum',
}

export interface ListViewContainerProps {}

/**
 * Virtual scrolling + viewport windowing.
 */
const ListViewContainer: React.FC<ListViewContainerProps> = () => {
  const table = useRemoteTable(TABLE.STATIC_TABLE_100_000)
  const { viewport, size, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = useOnScrollOffsetChangeCallback(
    ITEM_SIZE,
    setViewport,
    SCROLL_DEBOUNCE_MS,
  )

  const ref = useSpectrumOnScrollRef(onScroll)

  return (
    <View>
      {`${size.toLocaleString()} items`}
      <ListViewSpectrum
        ref={ref}
        aria-label="ListView"
        height="250px"
        items={viewport.items}
        maxWidth="size-6000"
        selectionMode="multiple">
        {(item) => (
          <Item key={item.key}>
            {`${item.key} - ${item.item ? JSON.stringify(item.item) : '...'}`}
          </Item>
        )}
      </ListViewSpectrum>
    </View>
  )
}
ListViewContainer.displayName = 'ListViewContainer'

export default ListViewContainer
