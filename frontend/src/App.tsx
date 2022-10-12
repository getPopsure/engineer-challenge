import { RecoilRoot } from "recoil";
import Navbar from "./Navbar";

import { PoliciesContainer } from "./containers/policies-container";
import "./index.css";

const App = () => (
  <RecoilRoot>
    <div>
      <Navbar />
      <div className="w-full p-8">
        <PoliciesContainer />
      </div>
    </div>
  </RecoilRoot>
);

export default App;
