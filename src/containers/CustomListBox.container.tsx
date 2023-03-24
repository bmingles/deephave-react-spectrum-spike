import React from 'react'
import { useRemoteTable } from '@/hooks/useRemoteTable.hook'
import { useViewportData } from '@/hooks/useViewportData.hook'
import { CustomListBox } from '../components/CustomListBox/CustomListBox'
import { ItemModel, KeyedItem } from '@/models/item'
import { Item } from 'react-stately'
import { CustomListBoxWindowed } from '../components/CustomListBox/CustomListBoxWindowed'

const VIEWPORT_SIZE = 20

export interface CustomListBoxContainerProps {
  isWindowed: boolean
}

/**
 * Container component for a `CustomListBox` or `CustomListBoxWindowed`
 */
export const CustomListBoxContainer: React.FC<CustomListBoxContainerProps> = ({
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

  const Component = isWindowed ? CustomListBoxWindowed : CustomListBox

  return (
    <>
      {table?.totalSize}
      <Component
        label={isWindowed ? 'ListBox (windowed)' : 'ListBox'}
        items={viewport.items}
        totalItems={table?.size ?? 0}
        onScroll={onScroll}
        selectionMode="multiple">
        {(item: KeyedItem<ItemModel>) => <Item>{item.key}</Item>}
      </Component>
    </>
  )
}