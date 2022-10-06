import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Table from "./components/Table/Table";
import FilterChipsList from "./components/Filter/FilterChipsList";

import "./styles/index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />
      <FilterChipsList />
      <Table />
    </div>
  </div>
);


export default App;
