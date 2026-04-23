import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <AppRoutes>
        
      </AppRoutes>

    </BrowserRouter>
    
  )
}

export default App
