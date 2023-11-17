'use client'
import SideBar from '@/components/SideBar'
import UserInfo from '@/components/UserInfo'
import TrainingsChart from '@/components/charts/TrainingsChart'
import SeanceContainer from '@/components/seances/SeanceContainer'
import ApiClient from '@/service/apiClient'
import React from 'react'
import { useQuery } from 'react-query'


const page = () => {
  
  

  return (
    
       <>

          <h2 className='text-2xl font-bold'>Statistiques</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div className="col-span-1">
              <TrainingsChart/>
            </div>
          </div>

       </>
        
   
  )
}

export default page