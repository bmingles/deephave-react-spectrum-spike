import { extractDOMNode } from '@/utils/spectrum'
import { useMappedRef } from '../useMappedRef.hook'
import { useOnScrollRef } from '../useOnScrollRef.hook'

/**
 * Returns a callback ref that can be set on a `react-spectrum` component
 * to respond to scroll events.
 * @param onScroll
 */
export function useSpectrumOnScrollRef(onScroll: (event: Event) => void) {
  const targetRef = useOnScrollRef(onScroll)
  return useMappedRef(targetRef, extractDOMNode)
}
