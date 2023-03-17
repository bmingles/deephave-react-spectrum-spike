import React from 'react'
import { Button } from '@adobe/react-spectrum'
import List from './List'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'

const VIEWPORT_SIZE = 50
const ITEM_HEIGHT = 40

function App() {
  const ref = React.useRef<HTMLDivElement | null>(null)

  const table = useRemoteTable('static_table')
  const { viewport, size, setViewport } = useViewportData(
    table,
    'Int',
    VIEWPORT_SIZE,
  )

  React.useEffect(() => {
    const divEl = ref.current!

    function onScroll() {
      const firstRow = Math.floor(divEl.scrollTop / ITEM_HEIGHT)
      console.log('Scroll', firstRow)
      setViewport(firstRow, firstRow + 10)
    }

    divEl.addEventListener('scroll', onScroll)

    return () => {
      divEl.removeEventListener('scroll', onScroll)
    }
  }, [setViewport])

  return (
    <>
      <List ref={ref} viewport={viewport} />
      {/* <Button isDisabled={firstRow === 0} variant="accent" onPress={onPrevPage}>
        &lt;&lt;
      </Button>
      <Button variant="accent" onPress={onNextPage}>
        &gt;&gt;
      </Button> */}
      {size}
    </>
  )
}

export default App
