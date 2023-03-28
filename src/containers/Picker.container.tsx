import React from 'react'
import { Item, Picker } from '@adobe/react-spectrum'
import { useOnScrollOffsetChangeCallback } from '@/hooks/useOnScrollOffsetChangeCallback.hook'
import { useRemoteTable } from '@/hooks/dh/useRemoteTable.hook'
import { useViewportData } from '@/hooks/dh/useViewportData.hook'
import { useMappedRef } from '@/hooks/useMappedRef.hook'
import { ReactSpectrumComponent } from '@/utils/spectrum'
import { TABLE } from '@/utils/initTable'

export const meta = { title: 'Picker', slug: 'picker' }

const ITEM_SIZE = 32
const VIEWPORT_SIZE = 100
const SCROLL_DEBOUNCE_MS = 150

function extractPickerButton(containerEl: ReactSpectrumComponent) {
  return containerEl?.UNSAFE_getDOMNode().querySelector('button')
}

/**
 * Virtual scrolling + viewport windowing.
 */
const PickerContainer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const table = useRemoteTable(TABLE.STATIC_TABLE_100_000)
  const { size, viewport, setViewport } = useViewportData(table, VIEWPORT_SIZE)

  const onScroll = useOnScrollOffsetChangeCallback(
    ITEM_SIZE,
    setViewport,
    SCROLL_DEBOUNCE_MS,
  )

  // const targetRef = useOnScrollRef(onScroll)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const ref = useMappedRef(toggleRef, extractPickerButton)

  const onOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setIsOpen(isOpen)

      if (isOpen) {
        setTimeout(() => {
          const popupId = toggleRef.current?.getAttribute('aria-controls')
          const scrollableArea =
            popupId == null ? null : document.getElementById(popupId)

          // TODO: figure out if we need to de-register the event handler. The
          // DOM element gets removed from the DOM on close, so maybe we don't
          // have to?
          scrollableArea?.addEventListener('scroll', onScroll)
        }, 0)
      }
    },
    [onScroll],
  )

  return (
    <>
      {size.toLocaleString()}
      <Picker
        ref={ref}
        aria-label="Picker"
        isOpen={isOpen}
        items={viewport.items}
        onOpenChange={onOpenChange}>
        {(item) => <Item key={item.key}>{item.item ? item.key : '...'}</Item>}
      </Picker>
    </>
  )
}

export default PickerContainer
