import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Table from "./components/Table";

import "./styles/index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />
      <Table />
    </div>
  </div>
);


export default App;
