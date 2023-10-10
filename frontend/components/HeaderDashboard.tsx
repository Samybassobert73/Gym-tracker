'use client'

import React from 'react'
import Link from 'next/link'
import Loader from './Loader';
import NavProfil from './header/NavProfil';
const HeaderDashboard = () => {

  return (
    <>
      <div className=' w-full flex items-center h-fit p-4 shadow-lg relative bg-white'>
        <Link href='/' className='px-4'>Home</Link>
        <span className='ml-auto flex items-center'>
          <>
            <NavProfil/> 
          </>
        </span>
      </div>
    </>
  )
}

export default HeaderDashboard

