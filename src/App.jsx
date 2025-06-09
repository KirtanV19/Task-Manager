import { Routing } from './routes/index'
import '@radix-ui/themes/styles.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { Theme } from "@radix-ui/themes";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Theme>
        <Routing />
      </Theme>
    </PersistGate>
  </Provider>
);

export default App;
