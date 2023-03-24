import React from 'react'
import {
  defaultTheme,
  Provider as SpectrumProvider,
} from '@adobe/react-spectrum'
import App from './App'
import { initTables } from '@/utils/initTable'
import { Provider as IdeSessionProvider } from '@/hooks/useIdeSession.hook'
import { useInitIdeSession } from '@/hooks/useInitIdeSession.hook'

export interface AppContainerProps {}

const AppContainer: React.FC<AppContainerProps> = () => {
  const ideSession = useInitIdeSession(initTables)

  return ideSession ? (
    <SpectrumProvider theme={defaultTheme} colorScheme="dark">
      <IdeSessionProvider value={ideSession}>
        <App />
      </IdeSessionProvider>
    </SpectrumProvider>
  ) : null
}
AppContainer.displayName = 'AppContainer'

export default AppContainer
