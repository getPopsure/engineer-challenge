import * as useClosable from "./hooks/useClosable";
import PoliciesListPage from "./pages/PoliciesListPage";

import { useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./index.css";

const App = () => {
  useEffect(() => {
    return () => {
      useClosable.unregisterAllClosable();
    };
  }, []);
  return (
    <div onClick={useClosable.closeAllClosable}>
      <Navbar />
      <div className="w-full p-8">
        <Header />
        <PoliciesListPage />
      </div>
    </div>
  );
};

export default App;
