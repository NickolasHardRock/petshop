import { useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import AppRoutes from './routes'
import Footer from './layouts/Footer'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Sidebar from './components/Sidebar/Sidebar'
import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

function AppContent() {

  const location = useLocation();

  const hideSidebarOn = ['/', '/login']
  const hideSidebar = hideSidebarOn.includes(location.pathname);
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {!hideSidebar && <Sidebar />
      }
      <div style={{ flex: 1 }}>

        <AppRoutes />

        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
