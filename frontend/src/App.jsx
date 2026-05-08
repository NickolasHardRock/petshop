import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Footer from './layouts/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <AppRoutes />
      <Footer/>
    </BrowserRouter>
    
  )
}

export default App
