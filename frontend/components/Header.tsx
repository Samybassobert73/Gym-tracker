'use client'

import React, { use, useEffect } from 'react'
import Link from 'next/link'
import store from '@/redux/store';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import Router from 'next/router'
import ApiClient from '@/service/apiClient';
import { setAccessToken, setIsAuthenticate, setRefreshToken } from '@/redux/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import Loader from './Loader';
import { usePathname } from 'next/navigation'
import NavProfil from './header/NavProfil';
const Header = () => {

  const isAuth = useSelector((state) => state?.auth.isAuthenticate);

  return (
    <>
      <div className=' w-full flex items-center h-fit p-4 shadow-lg fixed top-0 left-0 bg-white'>
        <Link href='/' className='px-4'>Home</Link>
        <span className='ml-auto flex items-center'>
          {isAuth ? 
          <>
            <NavProfil/> 
          </>
          :
            <>
              <Link href='/login' className='px-4'>
                Login
              </Link>
              <Link href='/register'>
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

