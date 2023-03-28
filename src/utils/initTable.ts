import create_remote_table_script from '@/assets/remote_table.py?raw'
import create_static_table_script from '@/assets/static_table.py?raw'
import { IdeSession } from '@deephaven/jsapi-types'

export const TABLE = {
  STATIC_TABLE_1_000: 'static_table_1_000',
  STATIC_TABLE_100_000: 'static_table_100_000',
} as const

/** Run scripts to create some tables */
export async function initTables(ideSession: IdeSession) {
  await new Promise<void>((resolve) => {
    const unsubscribe = ideSession.subscribeToFieldUpdates(async (changes) => {
      unsubscribe()

      // Close any existing tables
      const { created } = changes
      if (created.length) {
        const cleanup = created.filter((c) => !!c.title)

        console.log('Closing tables...', cleanup)

        await Promise.all(
          cleanup.map(({ title }) => ideSession.runCode(`${title} = None`)),
        )
      }

      // Run table creation scripts
      console.log('Creating tables')
      await ideSession.runCode(create_remote_table_script)
      await ideSession.runCode(create_static_table_script)

      resolve()
    })
  })
}
