import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import InstallmentPage from './Pages/InstallmentPage'
import FormPage from './Pages/FormPage'

const App = () => {
  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/installment" element={<InstallmentPage />} />
          <Route path='/form' element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
