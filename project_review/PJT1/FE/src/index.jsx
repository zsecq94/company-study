import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Mobile from "./Mobile";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BrowserView>
        <div className="animation">
          <App />
        </div>
      </BrowserView>
      <MobileView>
        <div className="animation">
          <Mobile />
        </div>
      </MobileView>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
