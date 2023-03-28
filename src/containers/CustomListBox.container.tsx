import React from 'react'
import { useRemoteTable } from '@/hooks/dh/useRemoteTable.hook'
import { useViewportData } from '@/hooks/dh/useViewportData.hook'
import { CustomListBox } from '../components/CustomListBox/CustomListBox'
import { ItemModel, KeyedItem } from '@/models/item'
import { Item } from 'react-stately'
import { CustomListBoxWindowed } from '../components/CustomListBox/CustomListBoxWindowed'
import { TABLE } from '@/utils/initTable'
import { Meta } from '@/utils/routes'

export const meta: Meta = {
  title: 'List Box (react-window)',
  slug: 'list-box-custom',
  category: 'custom',
}

const VIEWPORT_SIZE = 100

export interface CustomListBoxContainerProps {
  isWindowed?: boolean
}

/**
 * Container component for a `CustomListBox` or `CustomListBoxWindowed`
 */
const CustomListBoxContainer: React.FC<CustomListBoxContainerProps> = ({
  isWindowed = true,
}) => {
  const table = useRemoteTable(TABLE.STATIC_TABLE_100_000)
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
        label={isWindowed ? 'ListBox (react-window)' : 'ListBox (custom)'}
        items={viewport.items}
        totalItems={table?.size ?? 0}
        onScroll={onScroll}
        selectionMode="multiple">
        {(item: KeyedItem<ItemModel>) => <Item>{item.key}</Item>}
      </Component>
    </>
  )
}

export default CustomListBoxContainer
