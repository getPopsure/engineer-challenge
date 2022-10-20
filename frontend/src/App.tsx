import Navbar from './Navbar';
import Header from './Header';
import Table from './Table';

import './index.css';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const fetchPolicies = async () => {
      const policies = await fetch('http://localhost:4000/policies')
        .then((r) => r.json())
        .catch((e) => console.log(e));
      console.log(policies);
    };
    fetchPolicies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full p-8">
        <Header />
        <Table />
      </div>
    </div>
  );
};

export default App;
