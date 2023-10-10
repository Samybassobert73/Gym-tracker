import Header from '@/components/Header'
import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const page = () => {
  return (
    <main>
      <Header/>
    <div className='flex justify-center items-center h-screen'>
        <RegisterForm/>
    </div>
    </main>
  )
}

export default page