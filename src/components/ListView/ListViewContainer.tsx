import { useRemoteTable } from '@/hooks/useRemoteTable.hook'
import { useViewportData } from '@/hooks/useViewportData.hook'
import React from 'react'
import ListView from './ListView'

const VIEWPORT_SIZE = 10

export interface ListViewContainerProps {}

const ListViewContainer: React.FC<ListViewContainerProps> = () => {
  const table = useRemoteTable('static_table')
  const { viewport, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const debounce = React.useRef<number>()
  const onScroll = React.useCallback(
    (firstRow: number) => {
      window.clearTimeout(debounce.current)
      debounce.current = window.setTimeout(() => {
        setViewport(firstRow)
      }, 100)
    },
    [setViewport],
  )

  return <ListView items={viewport.items} onScroll={onScroll} />
}
ListViewContainer.displayName = 'ListViewContainer'

export default ListViewContainer
