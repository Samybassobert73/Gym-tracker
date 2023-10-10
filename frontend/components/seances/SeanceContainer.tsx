'use client'
import ApiClient from '@/service/apiClient';
import React from 'react'
import { useQuery } from 'react-query';
import { Skeleton } from '../ui/skeleton';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const SeanceContainer = () => {
    const apiClient = new ApiClient();

    const {data, error, isLoading} = useQuery({
        queryKey: ['seances'],
        queryFn: () => apiClient.getSeances()
      });
      


      if (isLoading) return (
        <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className='my-4 bg-gray-100 h-40 rounded-lg animate-pulse'>
          <CardHeader>
              <CardTitle><Skeleton className="w-[100px] bg-gray-200 h-[20px] rounded-full" /></CardTitle>
              <CardDescription><Skeleton className="w-[200px] bg-gray-200  h-[20px] rounded-full" /></CardDescription>
          </CardHeader>
          </Card>
        ))}
      </div>
      
      )
      
      if (error) return <div className='text-red-500'>error...</div>
  return (
    <>
        <div className='grid grid-cols-4 gap-4'>
             {data?.data && (
                data?.data?.map((seance: any) => (
                  <Link href={`/dashboard/seances/${seance._id}`} >
                    <Card key={seance._id} className='my-4'>
                    <CardHeader>
                        <CardTitle>{seance.name}</CardTitle>
                        {seance.description && <CardDescription>{seance.description}</CardDescription>}
                    </CardHeader>
                    </Card>
                  </Link>
                ))
              )} 
        </div>

        

    </>
  )
}

export default SeanceContainer