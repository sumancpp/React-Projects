import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Usercontext from './Context/Usercontext.jsx'

createRoot(document.getElementById('root')).render(
  <Usercontext>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Usercontext>
)
