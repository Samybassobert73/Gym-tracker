import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (
    <div className='h-full bg-gray-100 color-red-400 w-[15%] flex flex-col'>
        <Link href='/dashboard' className='p-2 hover:text-gray-600 hover:bg-gray-200'>
          Acceuil
        </Link>
        <Link href='/dashboard/exercices' className='p-2 hover:text-gray-600 hover:bg-gray-200'>
          Exercice
        </Link>
        <Link href='/dashboard/seances' className='p-2 hover:text-gray-600 hover:bg-gray-200'>
          Séance
        </Link>
    </div>
  )
}

export default SideBar