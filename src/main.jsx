import { createRoot } from "react-dom/client";
import '@radix-ui/themes/styles.css';
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Theme } from "@radix-ui/themes";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Theme>
                <App />
            </Theme>
        </PersistGate>
    </Provider>
);
