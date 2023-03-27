import { Flex, View } from '@adobe/react-spectrum'
import { Outlet } from 'react-router-dom'
import SideNav from './SideNav'

function App() {
  return (
    <View minHeight="100vh">
      <Flex direction="row">
        <SideNav />
        <Flex direction="column" alignItems="stretch" flexGrow={1}>
          <View padding={10}>
            <Outlet />
          </View>
        </Flex>
      </Flex>
    </View>
  )
}

export default App
