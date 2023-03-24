import React from 'react'

/**
 * Returns a callback ref that can be set on a `react-spectrum` component
 * to respond to scroll events.
 * @param itemHeight
 * @param onScroll
 */
export function useOnScrollRef(onScroll: (event: Event) => void) {
  const scrollableRef = React.useRef<HTMLDivElement | null>(null)

  // Given a `react-spectrum` component ref, extracts the underlying DOM element
  // and sets it to `scrollableRef.current`
  const callbackRef = React.useCallback(
    (ref: { UNSAFE_getDOMNode(): HTMLDivElement } | null) => {
      if (ref) {
        scrollableRef.current = ref.UNSAFE_getDOMNode()
      }
    },
    [],
  )

  React.useEffect(() => {
    if (!scrollableRef.current) {
      return
    }

    scrollableRef.current.addEventListener('scroll', onScroll)

    return () => {
      scrollableRef.current?.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return callbackRef
}
