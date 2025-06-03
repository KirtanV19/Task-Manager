import { createRoot } from "react-dom/client";
import '@radix-ui/themes/styles.css';
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Theme } from "@radix-ui/themes";
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Theme>
            <App />
        </Theme>
    </Provider>
);
