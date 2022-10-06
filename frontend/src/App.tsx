import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Table from "./components/Table/Table";
import FilterList from "./components/Filter/FilterList";

import "./styles/index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />
      <FilterList />
      <Table />
    </div>
  </div>
);


export default App;
