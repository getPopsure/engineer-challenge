import "./index.css";
import { TableWrapper } from "./components/Table/TableWrapper";
import { AppContextProvider } from "./context/apiContext";

const App = () => (
  <AppContextProvider>
    <TableWrapper />
  </AppContextProvider>
);


export default App;
