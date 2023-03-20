import React from 'react'
import { ListOnScrollProps } from 'react-window'

export function createUseOnScrollCallback(itemHeight: number) {
  /**
   * onScroll callback for react-window FixedSizeList. Keeps a ref to the
   * previous firstItemIndex value to avoid unnecessary calls to `onScroll`
   * if item index hasn't changed.
   */
  return function useOnScrollCallback(
    onScroll: (firstItemIndex: number) => void,
  ) {
    const firstItemIndexRef = React.useRef(0)

    return React.useCallback(
      (event: ListOnScrollProps) => {
        const firstItemIndex = Math.floor(event.scrollOffset / itemHeight)

        if (firstItemIndexRef.current !== firstItemIndex) {
          firstItemIndexRef.current = firstItemIndex
          onScroll(firstItemIndex)
        }
      },
      [onScroll],
    )
  }
}
