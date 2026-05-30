import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Footer from './layouts/Footer'
import MainLayout from './layouts/MainLayout'
import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App;