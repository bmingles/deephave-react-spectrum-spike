import React from 'react'

/**
 * Return a ref that can be used to subscribe to scroll events.
 * @param onScroll
 */
export function useOnScrollRef<T extends HTMLElement>(
  onScroll: (event: Event) => void,
) {
  const scrollableRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    if (!scrollableRef.current) {
      return
    }

    const el = scrollableRef.current
    el.addEventListener('scroll', onScroll)

    return () => {
      el.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return scrollableRef
}
