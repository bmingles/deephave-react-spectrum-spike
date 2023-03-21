import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'
import React from 'react'
import ListView from './ListView'

const VIEWPORT_SIZE = 20

export interface ListViewContainerProps {}

const ListViewContainer: React.FC<ListViewContainerProps> = () => {
  const table = useRemoteTable('static_table')
  const { viewport, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = React.useCallback(
    (firstRow: number) => {
      setViewport(firstRow)
    },
    [setViewport],
  )

  return <ListView items={viewport.items} onScroll={onScroll} />
}
ListViewContainer.displayName = 'ListViewContainer'

export default ListViewContainer
