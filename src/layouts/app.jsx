import React from 'react'
import './app.scss'
export default function MainLayout({ children }) {
  return (
    <div className="app">
    <header className="navbar">
      <h1>Stock Monitoring Dashboard</h1>
    </header>

    <div className="dashboard-layout">
      <aside className="sidebar">
      
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  </div>
  )
}
