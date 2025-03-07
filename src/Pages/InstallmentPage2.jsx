import React from 'react'
import { Link } from 'react-router-dom'
import Installment from '../Components/Installment-2/Installment'

const InstallmentPage2 = () => {
  return (
    <div>
      <Link to='/' className='btn btn-primary'>Back</Link>
      <Installment />
    </div>
  )
}

export default InstallmentPage2
