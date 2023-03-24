import dh from '@/dh'
import { IdeSession } from '@deephaven/jsapi-types'

/**
 * Initialize an IDE session.
 * @param init optional init function to run on the session
 */
export async function initIdeSession(
  init?: (ide: IdeSession) => Promise<void>,
): Promise<{
  ide: IdeSession
  dispose: () => void
}> {
  const client = new dh.CoreClient(
    window.location.protocol + '//' + window.location.host,
  )

  await client.login({ type: dh.CoreClient.LOGIN_TYPE_ANONYMOUS })
  const cn = await client.getAsIdeConnection()
  const ideSession = await cn.startSession('python')

  // Run any additional initialization
  await init?.(ideSession)

  const dispose = () => {
    ideSession.close()
    cn.close()
  }

  return { ide: ideSession, dispose }
}
