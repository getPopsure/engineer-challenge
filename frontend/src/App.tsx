import Navbar from "./Navbar";
import Header from "./Header";
import Table from "./Table";

import "./index.css";

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
