import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./APIContext/LoginContext";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrimeReact from "primereact/api";

PrimeReact.ripple = true;
PrimeReact.zIndex = {
  modal: 1100,    // dialogs, sidebars
  overlay: 1000,  // dropdowns, overlays
  menu: 1000,     // menus
  tooltip: 1100   // tooltips
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
      </LoginProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
