import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import RestApi from "./restApi";

function App() {
  return (
    <MantineProvider>
      {/* <TodoList /> */}
      <RestApi />
    </MantineProvider>
  );
}

export default App;
