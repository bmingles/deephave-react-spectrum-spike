import React from 'react'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'
import { ListBox } from './ListBox'
import { ItemModel, KeyedItem } from '@/models/item'
import { Item } from 'react-stately'
import { ListBoxWindowed } from './ListBoxWindowed'

const VIEWPORT_SIZE = 20

export interface ListBoxContainerProps {
  isWindowed: boolean
}

export const ListBoxContainer: React.FC<ListBoxContainerProps> = ({
  isWindowed,
}) => {
  const table = useRemoteTable('static_table')
  const { viewport, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = React.useCallback(
    (firstRow: number) => {
      setViewport(firstRow)
    },
    [setViewport],
  )

  const Component = isWindowed ? ListBoxWindowed : ListBox

  return (
    <>
      {table?.totalSize}
      <Component
        label={isWindowed ? 'ListBox (windowed)' : 'ListBox'}
        items={viewport.items}
        totalItems={table?.size ?? 0}
        onScroll={onScroll}
        selectionMode="single">
        {(item: KeyedItem<ItemModel>) => <Item>{item.key}</Item>}
      </Component>
    </>
  )
}
