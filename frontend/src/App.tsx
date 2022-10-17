import "./index.css";
import TableWrapper from "./TableWrapper";
import { APIContextProvider } from "./context/apiContext";


const App = () => (
  <APIContextProvider>
    <TableWrapper />
  </APIContextProvider>
);


export default App;
