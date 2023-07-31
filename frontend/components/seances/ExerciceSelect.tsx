'use client'
import React from 'react'
import ApiClient from '@/service/apiClient';
import { useQuery } from 'react-query';
import { Skeleton } from '../ui/skeleton';
const apiClient = new ApiClient();
const ExerciceSelect = () => {
  const {data, error, isLoading} = useQuery({
      queryKey: ['exercices'],
      queryFn: () => apiClient.getExercices()
  });
 
  if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

  if (error) return <div className='text-red-500'>error...</div>
 
  return (
    <select>
    {data && (
      data.data.map((exercise) => (
        <option key={exercise.id} value={exercise.name}>
          {exercise.name}
        </option>
      ))
    )}
  </select>

  )
}

export default ExerciceSelect