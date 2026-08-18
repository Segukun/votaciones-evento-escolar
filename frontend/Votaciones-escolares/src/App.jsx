import React from 'react'
import CarList from './layout/CarList'
import Header from './layout/Header'
import './App.css'

function App() {
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Header />
      <CarList />
    </div>
  )
}

export default App
