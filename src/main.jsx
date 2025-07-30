import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss"
import { BrowserRouter } from "react-router-dom";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import { CarritoProvider } from "./context/CarritoContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductosProvider>
      <CarritoProvider>
        <BrowserRouter>
          <App />
           <Toaster position="top-right" />
        </BrowserRouter>
      </CarritoProvider>
    </ProductosProvider>
  </React.StrictMode>
);
