import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import OperationsProvider from './contexts/OperationsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OperationsProvider>
      <App />
    </OperationsProvider>
  </React.StrictMode>,
)
