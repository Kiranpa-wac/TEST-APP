import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import InstallmentPage from './Pages/InstallmentPage'
import FormPage from './Pages/FormPage'
import InstallmentPage2 from './Pages/InstallmentPage2'

const App = () => {
  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/installment" element={<InstallmentPage />} />
          <Route path='/installment2' element={<InstallmentPage2 />} />
          <Route path='/form' element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
