import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'
import React from 'react'
import ListView from './ListView'

const VIEWPORT_SIZE = 20

export interface ListViewContainerProps {}

const ListViewContainer: React.FC<ListViewContainerProps> = () => {
  const keyProp = 'Int'
  const table = useRemoteTable('static_table')
  const { viewport, setViewport } = useViewportData(
    table,
    keyProp,
    VIEWPORT_SIZE,
  )

  const onScroll = React.useCallback(
    (firstRow: number) => {
      setViewport(firstRow, firstRow + VIEWPORT_SIZE - 1)
    },
    [setViewport],
  )

  return <ListView items={viewport.items.slice(0)} onScroll={onScroll} />
}
ListViewContainer.displayName = 'ListViewContainer'

export default ListViewContainer
