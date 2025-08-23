// src/main.jsx
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
import Loader from "./components/Loader/Loader";

const base = import.meta.env.BASE_URL || "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <div role="status" aria-live="polite" style={{ padding: 24 }}>
            <Loader />
          </div>
        }
      >
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
