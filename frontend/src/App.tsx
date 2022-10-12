import { RecoilRoot } from "recoil";
// import Header from "./Header";
import Navbar from "./Navbar";
// import Table from "./Table";

import "./index.css";
import { PoliciesContainer } from "./containers/policies-container";

const App = () => (
  <RecoilRoot>
    <div>
      <Navbar />
      <div className="w-full p-8">
        {/* <Header /> */}
        {/* <Table /> */}
        <PoliciesContainer />
      </div>
    </div>
  </RecoilRoot>
);

export default App;
