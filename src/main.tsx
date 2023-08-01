import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './scss/index.scss'
import { BrowserRouter } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


//Strict disabled
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)