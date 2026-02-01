import "./App.css";
import { Button } from "@store/ui";

function App() {
  return (
    <>
      <h1>Buttons</h1>
      <div className="flex gap-2">
        <Button variant="default" size="lg">
          Click Me
        </Button>
        <Button variant="outline" size="lg">
          Click Me
        </Button>
        <Button variant="secondary" size="lg">
          Click Me
        </Button>
        <Button variant="destructive" size="lg">
          Click Me
        </Button>
        <Button variant="ghost" size="lg">
          Click Me
        </Button>
        <Button variant="link" size="lg">
          Click Me
        </Button>
      </div>
    </>
  );
}

export default App;
