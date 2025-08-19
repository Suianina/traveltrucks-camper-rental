import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./styles/global.css";
import store, { persistor } from "./redux/store";

const base = import.meta.env.BASE_URL || "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter basename={base}>
            <App />
            <Toaster position="top-right" />
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
