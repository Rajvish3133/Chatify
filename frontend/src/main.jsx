import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const BACKEND_URL="https://chatify-awuy.onrender.com"

const persistor = persistStore(store);

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading ={null} persistor={persistor}>
      <App />
      <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
