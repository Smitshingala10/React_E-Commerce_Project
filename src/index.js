import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter }  from "react-router-dom";
import App from "./App";
import './index.css';
import './css/templatemo.css';
import './css/templatemo.min.css';


ReactDOM.render(
  <>
  <BrowserRouter>
    <App />
  </BrowserRouter>  
  </>,
  document.getElementById('root')
)