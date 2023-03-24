import React from 'react'

/**
 * Returns a callback ref that will map it's argument
 * and set the given targetRef with the result.
 * @param targetRef
 * @param map
 */
export function useMappedRef<T, U>(
  targetRef: React.MutableRefObject<U>,
  map: (ref: T) => U,
) {
  return React.useCallback(
    (ref: T) => {
      targetRef.current = map(ref)
    },
    [map, targetRef],
  )
}
