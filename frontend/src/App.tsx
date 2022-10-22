import Header from "./components/Header";
import Navbar from "./components/Navbar";
import PoliciesListPage from "./pages/PoliciesListPage";

import "./index.css";

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />
      <PoliciesListPage />
    </div>
  </div>
);

export default App;
