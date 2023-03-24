import React from 'react'

export function useScrollEffect<T extends HTMLElement>(
  ref: React.RefObject<T>,
  itemHeight: number,
  onScroll: (firstItemIndex: number) => void,
) {
  const firstItemIndexRef = React.useRef(0)

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const divEl = ref.current!

    function onScrollInternal() {
      const firstRow = Math.floor(divEl.scrollTop / itemHeight)

      if (firstItemIndexRef.current !== firstRow) {
        firstItemIndexRef.current = firstRow
        console.log('Scroll', firstRow, divEl.scrollTop)
        onScroll(firstRow)
      }
    }

    divEl.addEventListener('scroll', onScrollInternal)

    return () => {
      divEl.removeEventListener('scroll', onScrollInternal)
    }
  }, [itemHeight, onScroll, ref])
}
