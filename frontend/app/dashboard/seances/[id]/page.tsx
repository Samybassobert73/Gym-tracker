'use client'
import Loader from '@/components/Loader'
import { TrainingForm } from '@/components/seances/TrainingForm'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import ApiClient from '@/service/apiClient'
import { log } from 'console'
import React from 'react'
import { useQuery } from 'react-query'

const page = (props:any) => {
    const id = props.params.id
    const apiClient = new ApiClient();

    const {data, error, isLoading} = useQuery({
        queryKey: ['seance'],
        queryFn: () => apiClient.getSeance(id)
      });
     console.log('ici',data);

if (isLoading) return (
    <Loader/>
)

if (error) return <div className='text-red-500'>error...</div>

  return (
    <div className='flex justify-between'>
      <div> 
        <h1 className="text-2xl font-bold">Objectif de la Seance "{data.data.name}"</h1>   
        {/* <div>id de la Séance: {id}</div> */}
          <div>Description: {data.data.description}</div>
          {data?.data?.sets?.map((set: any, index: number) => (
              <div key={index}>
                  <div>Nombre de répétitions:{set.exe_reps}</div>
                  <div>Temps de repos: {set.rest_time}</div>
                  <div>Nombre de sets: {set.set_reps}</div>
                  <div>Charges de travail: {set.weight}</div>
              </div>
          ))}
      </div>

      <div className=''>    
        <TrainingForm donne={data.data} seanceId={id}/>
      </div>

    </div>
  )
}

export default page