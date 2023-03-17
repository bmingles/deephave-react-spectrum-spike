import { ItemModel, KeyedItem } from '@/models/item'
import React from 'react'
import { AriaListBoxProps, useListBox } from 'react-aria'
import { useListState } from 'react-stately'
import { ITEM_HEIGHT, ListBoxOption } from './ListBoxOption'
import styles from './ListBox.module.css'
import { useScrollEffect } from '@/utils/useScrollEffect.hook'

export interface ListBoxProps {
  onScroll: (offset: number) => void
}

export const ListBox: React.FC<
  AriaListBoxProps<KeyedItem<ItemModel>> & ListBoxProps
> = ({ onScroll, ...props }) => {
  const ref = React.useRef<HTMLUListElement>(null)
  const state = useListState(props)
  const { labelProps, listBoxProps } = useListBox(props, state, ref)

  useScrollEffect(ref, ITEM_HEIGHT, onScroll)

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <ul className={styles.ul} {...listBoxProps} ref={ref}>
        {[...state.collection].map((item) => (
          <ListBoxOption key={item.key} item={item} state={state} />
        ))}
      </ul>
    </>
  )
}
ListBox.displayName = 'ListBox'
