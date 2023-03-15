import { Button } from "@adobe/react-spectrum";

function App() {
  return (
    <Button variant="accent" onPress={() => console.log("test")}>
      Click me
    </Button>
  );
}

export default App;
