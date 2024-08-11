import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/cartContext'; // Import the CartProvider


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <App />
      </CartProvider>,
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);