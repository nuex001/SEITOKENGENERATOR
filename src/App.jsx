import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Nav from './layouts/Nav'
import Home from './pages/Home'

function App() {

  return (
  <div className="container">
    <Nav/>
    <Home/>
  </div>
  )
}

export default App
