import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// ⚡ PARCHE DE RED NATIVA PARA CAPACITOR (Versión JS) ⚡
if (typeof window !== 'undefined') {
  const nativeFetch = window.fetch;
  globalThis.fetch = nativeFetch;
  window.fetch = nativeFetch;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)