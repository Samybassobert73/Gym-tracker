'use client'

import React, { use, useEffect } from 'react'
import Link from 'next/link'
import store from '@/redux/store';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import Router from 'next/router'
import { setAccessToken, setIsAuthenticate, setRefreshToken } from '@/redux/slice/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import Loader from './Loader';
import { usePathname } from 'next/navigation'
import NavProfil from './header/NavProfil';
const Header = () => {


  
  
  const isAuth = useSelector((state) => state?.auth?.isAuthenticate);

  return (
    <>
      <div className='z-10 w-full flex items-center h-fit p-4 shadow-lg fixed top-0 left-0 bg-black opacity-60'>
        <Link href='/' className='px-4 text-white'>Home</Link>
        <span className='ml-auto flex items-center'>
          {isAuth ? 
          <>
            <NavProfil/> 
          </>
          :
            <>
              <Link href='/login' className='px-4 text-white'>
                Login
              </Link>
              <Link href='/register' className='text-white'>
                Register
              </Link>
            </>
          }
         
          
        </span>
      </div>
    </>
  )
}

export default Header

