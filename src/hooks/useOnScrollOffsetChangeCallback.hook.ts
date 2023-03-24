import React from 'react'

/**
 * Returns a callback that transforms a scroll event handler to an offset
 * change handler. Supports an optional debounce as well.
 * @param offsetSize
 * @param onChange
 * @param debounceMs
 */
export function useOnScrollOffsetChangeCallback(
  offsetSize: number,
  onChange: (offset: number) => void,
  debounceMs = 0,
) {
  const debounceTimeout = React.useRef<number>()
  const previousOffsetRef = React.useRef(0)

  return React.useCallback(
    (event: Event) => {
      // clear previous debounce timer
      window.clearTimeout(debounceTimeout.current)

      debounceTimeout.current = window.setTimeout(() => {
        const offset = Math.floor(
          (event.target as HTMLElement).scrollTop / offsetSize,
        )

        if (previousOffsetRef.current !== offset) {
          previousOffsetRef.current = offset
          onChange(offset)
        }
      }, debounceMs)
    },
    [debounceMs, offsetSize, onChange],
  )
}
