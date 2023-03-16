import dh from '@/dh'
import create_remote_table_script from '@/assets/remote_table.py?raw'
import { IdeSession } from '@deephaven/jsapi-types'

export async function initIDESession(): Promise<{
  ide: IdeSession
  dispose: () => void
}> {
  const client = new dh.CoreClient(
    window.location.protocol + '//' + window.location.host,
  )

  await client.login({ type: dh.CoreClient.LOGIN_TYPE_ANONYMOUS })
  const cn = await client.getAsIdeConnection()
  const ideSession = await cn.startSession('python')

  // Cleanup and re-create tables
  await initTables(ideSession)

  const dispose = () => {
    ideSession.close()
    cn.close()
  }

  return { ide: ideSession, dispose }
}

export async function initTables(ideSession: IdeSession) {
  await new Promise<void>((resolve) => {
    const unsubscribe = ideSession.subscribeToFieldUpdates(async (changes) => {
      unsubscribe()

      const { created } = changes
      if (created.length) {
        const cleanup = created.filter((c) => !!c.title)

        console.log('Closing tables...', cleanup)

        await Promise.all(
          cleanup.map(({ title }) => ideSession.runCode(`${title} = None`)),
        )
      }

      console.log('Creating tables')
      await ideSession.runCode(create_remote_table_script)

      resolve()
    })
  })
}
