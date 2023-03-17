import { ItemModel, KeyedItem } from '@/models/item'
import React from 'react'
import { mergeProps, useFocusRing, useOption } from 'react-aria'
import { ListState } from 'react-stately'
import { Node } from '@react-types/shared'

export const ITEM_HEIGHT = 40

export interface ListBoxOptionProps {
  item: Node<KeyedItem<ItemModel>>
  state: ListState<KeyedItem<ItemModel>>
}

export const ListBoxOption: React.FC<ListBoxOptionProps> = ({
  item,
  state,
}) => {
  const ref = React.useRef<HTMLLIElement>(null)
  const { isDisabled, isSelected, optionProps } = useOption(
    { key: item.key },
    state,
    ref,
  )
  const { isFocusVisible, focusProps } = useFocusRing()

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        height: ITEM_HEIGHT,
        background: isSelected ? 'blueviolet' : 'transparent',
        color: isDisabled ? '#aaa' : isSelected ? 'white' : undefined,
        outline: isFocusVisible ? '2px solid orange' : 'none',
      }}>
      {item.rendered}
    </li>
  )
}
