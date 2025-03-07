import React from 'react'
import FormComponent from '../Components/FormComponent'
import { Link } from 'react-router-dom'

const FormPage = () => {
  return (
    <div>
        <Link to='/' className='btn btn-primary'>Back</Link>
      <FormComponent />
    </div>
  )
}

export default FormPage
