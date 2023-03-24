import React from 'react'
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView,
  View,
} from '@adobe/react-spectrum'
import { useOnScrollOffsetChangeCallback } from '@/hooks/useOnScrollOffsetChangeCallback.hook'
import { ReactSpectrumComponent } from '@/hooks/reactSpectrum/useSpectrumOnScrollRef.hook'
import { useRemoteTable } from '@/hooks/dh/useRemoteTable.hook'
import { useViewportData } from '@/hooks/dh/useViewportData.hook'
import { useOnScrollRef } from '@/hooks/useOnScrollRef.hook'
import { useMappedRef } from '@/hooks/useMappedRef.hook'

const ITEM_SIZE = 41
const VIEWPORT_SIZE = 200
const SCROLL_DEBOUNCE_MS = 150

export interface TableViewContainerProps {}

/**
 * Virtual scrolling + viewport windowing.
 */
const TableViewContainer: React.FC<TableViewContainerProps> = () => {
  const table = useRemoteTable('static_table')
  const { viewport, size, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = useOnScrollOffsetChangeCallback(
    ITEM_SIZE,
    setViewport,
    SCROLL_DEBOUNCE_MS,
  )

  // const ref = useSpectrumOnScrollRef(onScroll)

  const targetRef = useOnScrollRef(onScroll)
  const ref = useMappedRef(
    targetRef,
    (ref: ReactSpectrumComponent | null) =>
      ref?.UNSAFE_getDOMNode().lastElementChild,
  )

  return (
    <View>
      {size.toLocaleString()}
      <TableView
        ref={ref}
        aria-label="ListView"
        height="250px"
        maxWidth="size-6000"
        selectionMode="multiple"
        onSortChange={(arg) => console.log(arg)}>
        <TableHeader>
          <Column key="String" allowsResizing allowsSorting>
            String
          </Column>
          <Column key="Int">String</Column>
          <Column key="Boolean">String</Column>
        </TableHeader>
        <TableBody items={viewport.items}>
          {(item) => (
            <Row key={item.key}>
              {(columnKey) => (
                <Cell>{String(item.item?.[columnKey] ?? '...')}</Cell>
              )}
            </Row>
          )}
        </TableBody>
      </TableView>
    </View>
  )
}
TableViewContainer.displayName = 'ListViewContainer'

export default TableViewContainer
