import React from 'react'
import { Button } from '@adobe/react-spectrum'
import List from './List'
import { useRemoteTable } from '@/utils/useRemoteTable.hook'
import { useViewportData } from '@/utils/useViewportData.hook'

const VIEWPORT_SIZE = 40

function App() {
  const table = useRemoteTable('remote_table')
  const { viewport, firstRow, lastRow, size, onPrevPage, onNextPage } =
    useViewportData(table, VIEWPORT_SIZE)

  return (
    <>
      <List viewport={viewport} />
      <Button isDisabled={firstRow === 0} variant="accent" onPress={onPrevPage}>
        &lt;&lt;
      </Button>
      <Button variant="accent" onPress={onNextPage}>
        &gt;&gt;
      </Button>
      {firstRow + 1} - {lastRow + 1} of {size}
    </>
  )
}

export default App
