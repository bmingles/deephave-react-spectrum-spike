import React from 'react'
import {
  defaultTheme,
  Heading,
  Provider as SpectrumProvider,
} from '@adobe/react-spectrum'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../components/App'
import { initTables } from '@/utils/initTable'
import { Provider as IdeSessionProvider } from '@/hooks/dh/useIdeSession.hook'
import { useInitIdeSession } from '@/hooks/dh/useInitIdeSession.hook'
import { routes } from '@/utils/routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...routes.map(({ Component, meta: { title, slug } }) => ({
        path: `/${slug}`,
        element: (
          <>
            <Heading level={2}>{title}</Heading>
            <Component />
          </>
        ),
      })),
    ],
  },
])

export interface AppContainerProps {}

const AppContainer: React.FC<AppContainerProps> = () => {
  const ideSession = useInitIdeSession(initTables)

  return ideSession ? (
    <SpectrumProvider theme={defaultTheme} colorScheme="dark">
      <IdeSessionProvider value={ideSession}>
        <RouterProvider router={router} />
      </IdeSessionProvider>
    </SpectrumProvider>
  ) : null
}
AppContainer.displayName = 'AppContainer'

export default AppContainer
