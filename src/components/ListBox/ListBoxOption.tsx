import { ItemModel, KeyedItem } from '@/models/item'
import React from 'react'
import { mergeProps, useFocusRing, useOption } from 'react-aria'
import { ListState } from 'react-stately'
import { Node } from '@react-types/shared'

export const ITEM_HEIGHT = 40

export interface ListBoxOptionProps {
  className?: string
  item: Node<KeyedItem<ItemModel>>
  state: ListState<KeyedItem<ItemModel>>
  style?: React.CSSProperties
}

export const ListBoxOption: React.FC<ListBoxOptionProps> = ({
  className,
  item,
  state,
  style,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { isDisabled, isSelected, optionProps } = useOption(
    { key: item.key },
    state,
    ref,
  )
  const { isFocusVisible, focusProps } = useFocusRing()

  return (
    <div
      className={className}
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        ...style,
        height: ITEM_HEIGHT,
        background: isSelected ? 'blueviolet' : 'transparent',
        color: isDisabled ? '#aaa' : isSelected ? 'white' : undefined,
        outline: isFocusVisible ? '2px solid orange' : 'none',
      }}>
      {item.rendered}
    </div>
  )
}
