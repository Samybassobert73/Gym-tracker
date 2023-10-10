import Header from '@/components/Header'
import LoginForm from '@/components/LoginForm'
import React from 'react'
const page = () => {
  return (
    <main>
      <Header/>
      <div className='flex justify-center items-center h-screen'>
        <LoginForm/>
      </div>
    </main>
  )
}

export default page