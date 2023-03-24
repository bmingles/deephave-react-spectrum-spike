import { ItemModel, KeyedItem } from '@/models/item'
import React from 'react'
import { AriaListBoxProps, useListBox } from 'react-aria'
import { ListState, useListState } from 'react-stately'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { ITEM_HEIGHT, CustomListBoxOption } from './CustomListBoxOption'
import { createUseOnScrollCallback } from '@/hooks/reactWindow/useOnScrollCallback.hook'
import styles from './CustomListBox.module.css'
import { CustomListBoxProps } from './CustomListBox'

const ItemRenderer = ({
  index,
  style,
  data,
}: ListChildComponentProps<ListState<KeyedItem<ItemModel>>>) => {
  const item = data.collection.getItem(String(index))
  console.log(index, item)

  return item ? (
    <CustomListBoxOption
      className={styles.item}
      style={style}
      item={item}
      state={data}
    />
  ) : null
}

const useOnScrollCallback = createUseOnScrollCallback(ITEM_HEIGHT)

/**
 * Custom list box component using `react-aria` for accessibility and
 * `react-window` for virtualization.
 */
export const CustomListBoxWindowed: React.FC<
  AriaListBoxProps<KeyedItem<ItemModel>> & CustomListBoxProps
> = ({ onScroll, totalItems, ...props }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const state = useListState(props)
  const { labelProps, listBoxProps } = useListBox(props, state, ref)

  const onScrollInternal = useOnScrollCallback(onScroll)

  return (
    <>
      <div {...labelProps}>{props.label}</div>

      {/* 
       Wrapper div so that so that props get set on an actual DOM
       element. This is necessary for the `ref` passed to `useListBox` and the
       event handlers on `listBoxProps` to work properly.
       */}
      <div className={styles.list} ref={ref} {...listBoxProps}>
        <FixedSizeList
          height={300}
          width="100%"
          itemCount={totalItems}
          itemSize={ITEM_HEIGHT}
          itemData={state}
          onScroll={onScrollInternal}>
          {ItemRenderer}
        </FixedSizeList>
      </div>
    </>
  )
}
CustomListBoxWindowed.displayName = 'CustomListBoxWindowed'
