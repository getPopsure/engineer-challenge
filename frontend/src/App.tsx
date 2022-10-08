import FilterChipsList from "./components/Filter/FilterChip/FilterChipsList";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Table from "./components/Table/Table/Table";
import Pagination from "./components/Pagination/Pagination";

import "./styles/index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />
      <FilterChipsList />
      <Table />
      <Pagination />
    </div>
  </div>
);


export default App;
