import Navbar from "./components/Navbar";
import Main from "./components/Main/Main";

import "./styles/index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Main />
    </div>
  </div>
);


export default App;
