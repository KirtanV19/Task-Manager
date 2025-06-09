import Routing from './routes/index'
import '@radix-ui/themes/styles.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { Theme } from "@radix-ui/themes";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from 'react-router';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <Routing />
        </Theme>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default App;
