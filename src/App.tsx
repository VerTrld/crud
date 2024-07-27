import "@mantine/core/styles.css";
import { Flex, MantineProvider } from "@mantine/core";
import TodoList from "./todo-list";
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
