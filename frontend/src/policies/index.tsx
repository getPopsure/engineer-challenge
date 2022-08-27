import { useContext, useState } from "react";

import Navbar from "../common/Navbar";
import Header from "../common/Header";

import Search from "./search";
import FullPageLoader from "../common/full-page-loader";
import Table from "../common/table";

import { Policy } from "./models";
import { ContentContext } from "../common/context";
import { ErrorAlert } from "../common/alerts";

function App() {
  const getLocalisedContent = useContext(ContentContext);

  const [policies, setPolicies] = useState<Policy[]>();
  const [isXHROn, setXHRSwitch] = useState(false);
  const [error, setError] = useState();

  return (
    <div>
      <Navbar />
      <div className="w-full p-8">
        <Header />
        {error && <ErrorAlert msg={error} />}
        {isXHROn && <FullPageLoader />}
        <Search setError={setError} setPolicies={setPolicies} setLoader={setXHRSwitch}  />
        <Table titles={getLocalisedContent('table.headers')} rows={policies} showLoader={isXHROn} />
      </div>
    </div>
  )
}


export default App;

