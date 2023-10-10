'use client';
import React, { use } from 'react'
import  ApiClient  from '../service/apiClient';
import { useQuery } from 'react-query';
import Loader from './Loader';
import { Skeleton } from "@/components/ui/skeleton"
function UserInfo() {
  const apiClient = new ApiClient();


    const {data, error, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => apiClient.getMe()
    });

    if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

    if (error) return <div className='text-red-500'>error...</div>

  return (
    <div>
        <div>Bonjour {data?.data.name}</div>
    </div>
  )
}

export default UserInfo