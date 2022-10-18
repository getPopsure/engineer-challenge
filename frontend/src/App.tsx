import { Provider } from "react-redux";
import { store } from "./store/store";

// Components
import { BaseLayout } from "./components/layout/BaseLayout";

// Routes
import { PoliciesSectionContainer } from "./pages/Policies/PoliciesSectionContainer";

// Styles
import "./index.css";
import "@popsure/dirty-swan/dist/index.css";

const App = () => (
  <Provider store={store}>
    <BaseLayout>
      <PoliciesSectionContainer />
    </BaseLayout>
  </Provider>
);

export default App;
