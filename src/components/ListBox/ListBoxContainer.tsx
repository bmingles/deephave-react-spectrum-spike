import React from 'react'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'
import { ListBox } from './ListBox'
import { ItemModel, KeyedItem } from '@/models/item'
import { Item } from 'react-stately'

const VIEWPORT_SIZE = 20

export const ListBoxContainer: React.FC = () => {
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

  return (
    <ListBox
      label="List Box"
      items={viewport.items}
      onScroll={onScroll}
      selectionMode="single">
      {(item: KeyedItem<ItemModel>) => <Item>{item.key}</Item>}
    </ListBox>
  )
}
