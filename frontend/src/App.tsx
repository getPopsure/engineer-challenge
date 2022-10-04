import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Table from "./components/Table";
import FilterSelection from "./components/Filter/FilterSelection";
import FilterList from "./components/Filter/FilterList";

import "./styles/index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <div className="relative">
        <Header />
        <div className="absolute right-0 top-full">
          <FilterSelection />
        </div>
      </div>
      <FilterList />
      <Table />
    </div>
  </div>
);


export default App;
