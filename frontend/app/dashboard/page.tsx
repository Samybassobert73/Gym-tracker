import SideBar from '@/components/SideBar'
import UserInfo from '@/components/UserInfo'
import SeanceContainer from '@/components/seances/SeanceContainer'
import React from 'react'


const page = () => {
  


  return (
    
       <>

          <h2 className='text-2xl font-bold'>Les dernière séances</h2>
          <SeanceContainer/>

       </>
        
   
  )
}

export default page