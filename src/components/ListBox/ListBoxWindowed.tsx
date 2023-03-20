import { ItemModel, KeyedItem } from '@/models/item'
import React from 'react'
import { AriaListBoxProps, useListBox } from 'react-aria'
import { useListState } from 'react-stately'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { ITEM_HEIGHT, ListBoxOption } from './ListBoxOption'
import { createUseOnScrollCallback } from '@/utils/useOnScrollCallback.hook'
import styles from './ListBox.module.css'

const useOnScrollCallback = createUseOnScrollCallback(ITEM_HEIGHT)

export interface ListBoxWindowedProps {
  onScroll: (offset: number) => void
}

export const ListBoxWindowed: React.FC<
  AriaListBoxProps<KeyedItem<ItemModel>> & ListBoxWindowedProps
> = ({ onScroll, ...props }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const state = useListState(props)
  const { labelProps, listBoxProps } = useListBox(props, state, ref)

  /** Memoized component so we have closure over `state` */
  const Item = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ index, style }: ListChildComponentProps) => {
        const item = state.collection.at(index)

        return item ? (
          <ListBoxOption
            className={styles.item}
            key={item.key}
            style={style}
            item={item}
            state={state}
          />
        ) : null
      },
    [state],
  )

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
          itemCount={100}
          itemSize={ITEM_HEIGHT}
          onScroll={onScrollInternal}>
          {Item}
        </FixedSizeList>
      </div>
    </>
  )
}
ListBoxWindowed.displayName = 'ListBox'
