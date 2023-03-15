import { Button } from "@adobe/react-spectrum";
import dh from "../dh";

function App() {
  console.log(dh);
  return (
    <Button variant="accent" onPress={() => console.log("test")}>
      Click me
    </Button>
  );
}

export default App;
