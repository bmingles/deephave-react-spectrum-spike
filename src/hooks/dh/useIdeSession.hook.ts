import { IdeSession } from '@deephaven/jsapi-types'
import React from 'react'

const Context = React.createContext<IdeSession | null>(null)

export const Provider = Context.Provider

/**
 * Context hook for an IdeSession.
 * See `useInitIdeSession` for creating the session.
 */
export function useIdeSession(): IdeSession {
  const ideSession = React.useContext(Context)
  if (!ideSession) {
    throw new Error('IdeSession context must be provided.')
  }

  return ideSession
}
