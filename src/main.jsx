import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { CartProvider } from './context/CartContext'
import './i18n'
import { CartSumContextProvider } from './context/CartSumContextProvider.jsx'
import { AuthContextProvider } from './context/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <CartProvider>
        <CartSumContextProvider>
          <AuthContextProvider>
        <App />
        </AuthContextProvider>
        </CartSumContextProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
