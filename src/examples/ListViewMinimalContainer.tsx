import React from 'react'
import {
  Item,
  ListView as ListViewSpectrum,
  useListData,
} from '@adobe/react-spectrum'

export interface ListViewMinimalContainerProps {}

const ListViewMinimalContainer: React.FC<
  ListViewMinimalContainerProps
> = () => {
  const list = useListData<{ key: string }>({
    initialItems: [],
  })

  console.log(list.items.length)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      list.append({
        key: String(list.items.length),
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [list])

  return (
    <ListViewSpectrum
      aria-label="Dynamic ListView items example"
      height="250px"
      items={list.items}
      maxWidth="size-6000"
      selectionMode="multiple">
      {(item) => <Item key={item.key}>{String(item.key)}</Item>}
    </ListViewSpectrum>
  )
}

export default ListViewMinimalContainer
