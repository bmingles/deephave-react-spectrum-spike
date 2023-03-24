import ListBoxContainer from './ListBoxContainer'
import ListViewContainer from './ListViewContainer'
// import ListViewMinimalContainer from './ListView/ListViewMinimalContainer'

import { Flex, Heading, View } from '@adobe/react-spectrum'

function App() {
  return (
    <View minHeight="100vh">
      <Flex direction="column" alignItems="stretch">
        <View padding={10}>
          <Heading level={2}>List Box</Heading>
          <ListBoxContainer />
        </View>

        <View padding={10}>
          <Heading level={2}>List View</Heading>
          <ListViewContainer />
        </View>
        {/* <ListViewMinimalContainer /> */}

        {/* <h2>More</h2>
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer />
      <ListViewContainer /> */}
      </Flex>
    </View>
  )
}

export default App
