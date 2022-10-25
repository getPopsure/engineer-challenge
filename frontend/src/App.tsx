import { Navbar } from './components/Navbar';
import { Policies } from './features/Policies';

import './index.css';

const App = () => (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Policies />
    </div>
  </div>
);

export default App;
