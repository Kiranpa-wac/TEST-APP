import React from 'react'
import InstallmentForm from '../Components/InstallmentForm'
import { Link } from 'react-router-dom'

const InstallmentPage = () => {
  return (
    <div>
        <Link to='/' className='btn btn-primary'>Back</Link>
        <InstallmentForm />
    </div>
  )
}

export default InstallmentPage
