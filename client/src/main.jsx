import React from "react";
import ReactDOM from "react-dom/client";
//import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//import { store } from "./redux/store";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
//por ahora no muestra nada porq estoy manejando los estados
