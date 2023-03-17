import { ItemModel, KeyedItem } from '@/models/item'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'
import React from 'react'
import { AriaListBoxProps, useListBox, useOption } from 'react-aria'
import { Item, ListState, useListState } from 'react-stately'
import { Node } from '@react-types/shared'

import styles from './ListBox.module.css'

const ITEM_HEIGHT = 40
const VIEWPORT_SIZE = 20

const ListBoxContainer: React.FC = () => {
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
    <ListBox label="List Box" items={viewport.items} onScroll={onScroll}>
      {(item: KeyedItem<ItemModel>) => <Item>{item.key}</Item>}
    </ListBox>
  )
}

export interface ListBoxOptionProps {
  item: Node<KeyedItem<ItemModel>>
  state: ListState<KeyedItem<ItemModel>>
}

export const ListBoxOption: React.FC<ListBoxOptionProps> = ({
  item,
  state,
}) => {
  const ref = React.useRef<HTMLLIElement>(null)
  const { optionProps } = useOption({ key: item.key }, state, ref)
  return (
    <li style={{ height: ITEM_HEIGHT }} {...optionProps}>
      {item.rendered}
    </li>
  )
}

export interface ListBoxProps {
  onScroll: (offset: number) => void
}

const ListBox: React.FC<
  AriaListBoxProps<KeyedItem<ItemModel>> & ListBoxProps
> = ({ onScroll, ...props }) => {
  const ref = React.useRef<HTMLUListElement>(null)
  const firstRowIRef = React.useRef(0)
  const state = useListState(props)
  const { labelProps, listBoxProps } = useListBox(props, state, ref)

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const divEl = ref.current!

    function onScrollInternal() {
      const firstRow = Math.floor(divEl.scrollTop / ITEM_HEIGHT)

      if (firstRowIRef.current !== firstRow) {
        firstRowIRef.current = firstRow
        console.log('Scroll', firstRow)
        onScroll(firstRow)
      }
    }

    divEl.addEventListener('scroll', onScrollInternal)

    return () => {
      divEl.removeEventListener('scroll', onScrollInternal)
    }
  }, [onScroll])

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

export default ListBoxContainer
