import { ItemModel, KeyedItem } from '@/models/item'
import React from 'react'
import { AriaListBoxProps, useListBox } from 'react-aria'
import { useListState } from 'react-stately'
import { ITEM_HEIGHT, CustomListBoxOption } from './CustomListBoxOption'
import styles from './CustomListBox.module.css'
import { useOnScrollOffsetChangeCallback } from '@/hooks/useOnScrollOffsetChangeCallback.hook'
import { useOnScrollRef } from '@/hooks/useOnScrollRef.hook'

export interface CustomListBoxProps {
  totalItems: number
  onScroll: (offset: number) => void
}

export const CustomListBox: React.FC<
  AriaListBoxProps<KeyedItem<ItemModel>> & CustomListBoxProps
> = ({ onScroll, totalItems, ...props }) => {
  const onOffsetChange = useOnScrollOffsetChangeCallback(
    ITEM_HEIGHT,
    onScroll,
    150,
  )
  const ref = useOnScrollRef<HTMLDivElement>(onOffsetChange)
  const state = useListState(props)
  const { labelProps, listBoxProps } = useListBox(props, state, ref)

  console.log(totalItems)

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <div className={styles.list} {...listBoxProps} ref={ref}>
        {[...state.collection].map((item) => (
          <CustomListBoxOption key={item.key} item={item} state={state} />
        ))}
      </div>
    </>
  )
}
CustomListBox.displayName = 'CustomListBox'
