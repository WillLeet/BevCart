import React from 'react'
import AllProducts from './components/AllProducts'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Navbar />
    <div id="singlepage">
      <div>
        <Routes />
      </div>
    </div>
    </div>
  )
}

export default App
