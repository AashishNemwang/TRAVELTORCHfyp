import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Contextapi from './components/Contextapi.jsx'

createRoot(document.getElementById('root')).render(
  <Contextapi>
    <App />
  </Contextapi>

)
