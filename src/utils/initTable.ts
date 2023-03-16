import dh from '@/dh'
import create_remote_table_script from '@/assets/remote_table.py?raw'

export async function initIDESession() {
  const client = new dh.CoreClient(
    window.location.protocol + '//' + window.location.host,
  )

  await client.login({ type: dh.CoreClient.LOGIN_TYPE_ANONYMOUS })
  const cn = await client.getAsIdeConnection()
  const ideSession = await cn.startSession('python')

  // Create a table
  await ideSession.runCode(create_remote_table_script)

  return ideSession
}
