import { Button } from '@adobe/react-spectrum'
import List from './List'

function App() {
  return (
    <>
      <List />

      <Button variant="accent" onPress={() => console.log('test')}>
        Click me
      </Button>
    </>
  )
}

export default App
