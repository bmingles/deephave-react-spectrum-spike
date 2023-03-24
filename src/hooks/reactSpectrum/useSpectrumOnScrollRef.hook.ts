import { useMappedRef } from '../useMappedRef.hook'
import { useOnScrollRef } from '../useOnScrollRef.hook'

export interface ReactSpectrumComponent {
  UNSAFE_getDOMNode(): HTMLDivElement
}

/**
 * Returns a callback ref that can be set on a `react-spectrum` component
 * to respond to scroll events.
 * @param onScroll
 */
export function useSpectrumOnScrollRef(onScroll: (event: Event) => void) {
  const targetRef = useOnScrollRef(onScroll)
  return useMappedRef(targetRef, (ref: ReactSpectrumComponent | null) =>
    ref?.UNSAFE_getDOMNode(),
  )
}
