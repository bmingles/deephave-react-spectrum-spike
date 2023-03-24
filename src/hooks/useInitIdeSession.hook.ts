import { IdeSession } from '@deephaven/jsapi-types'
import React from 'react'
import { initIdeSession } from '@/utils/initIDESession'

/**
 * Initialize an IDE session and dispose it on component unmount.
 * @param init
 */
export function useInitIdeSession(
  init?: (ide: IdeSession) => Promise<void>,
): IdeSession | null {
  const [ideSession, setIdeSession] = React.useState<IdeSession | null>(null)

  React.useEffect(() => {
    let dispose: (() => void) | null = null

    initIdeSession(init).then((result) => {
      dispose = result.dispose
      setIdeSession(result.ide)
    })

    return () => {
      dispose?.()
    }
  }, [init])

  return ideSession
}
