import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {App} from "./Components/App";

//context
import { CartProvider } from './context/CartContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);


