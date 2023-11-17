import React,  { useEffect, useState } from 'react';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import * as d3 from 'd3';
import { GradientTealBlue } from '@visx/gradient';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import useMeasure from 'react-use-measure';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { useQuery } from 'react-query';
import ApiClient from '@/service/apiClient';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { set } from 'react-hook-form';

const SelectFilter = ({placeholder, queryKey, query, selected, callback}:any) => {

  const {data, error, isLoading} = useQuery({
    queryKey: queryKey,
    queryFn: query
  });
  
  if (isLoading) return (
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  )
  
  if (error) return <div className='text-red-500'>error...</div>
    
  return (
    <>
      <Select defaultValue={selected} onValueChange={callback}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.data?.map((d:any,i:any) => {
              return (
                <SelectItem value={d.id}>{d.name}</SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select> 
    </>
  )

}

const TrainingsChart = () => {
  const [selectedSeance, setSelectedSeance] = useState<string|undefined>(undefined);
  const [selectedExercice, setSelectedExercice] = useState<string|undefined>(undefined);
  const [selectedData, setSelectedData] = useState<string|undefined>(undefined);
  const [dataset, setDataset] = useState<any|undefined>(undefined);

  const handleSelectSeanceChange = (value:any) => {
     setSelectedSeance(value);
  };

  const handleSelectExerciceChange = (value:string) => {
    setSelectedExercice(value);
  };

  const handleSelectDataChange = (value:string) => {
    setSelectedData(value);
  };

  const apiClient = new ApiClient();

  const {data, error, isLoading} = useQuery({
    queryKey: ['trainings'],
    queryFn: () => apiClient.getTrainings()
  });

// list all trainings 
const trainings = data?.data

const filterData = (data:any, selectedSeance:any, selectedExercice:any, selectedData:any)=>{
  const dataFiltered = data?.filter((d:any) => {
    return d.seance._id === selectedSeance && d.exercises._id === selectedExercice
  })
  const dataTransformed = dataFiltered?.map((d:any) => ({
    _id: d._id,
    key: d.createdAt,
    value: selectedData == 'weight' ? d.trainingsets.weight : selectedData == 'set_reps' ? d.trainingsets.set_reps : d.trainingsets.exe_reps
  }));
  return dataTransformed
}

useEffect(() => {
  const dataset = filterData(trainings, selectedSeance, selectedExercice, selectedData)
  setDataset(dataset);
}, [selectedSeance, selectedExercice, selectedData])

//CHART

// accessors
const getKey = (d:any) => d.key;
const getValue = (d:any) => Number(d.value);

 // bounds
 const [ref, bounds] = useMeasure();

 const margin = 32;

 const width = bounds.width || 100;
 const height = bounds.height || 100;

 const innerWidth = width - margin;
 const innerHeight = height - margin;

//scales

const keys = dataset !== undefined ? dataset?.map(getKey) : []
const values = dataset !== undefined ? dataset?.map(getValue) : []

  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: keys,
    padding: 0.2,
  });
  
  const yScale = scaleLinear<number>({
    range: [innerHeight, margin],
    round: true,
    domain: [
      Math.min(...values) - 1,
      Math.max(...values) + 1
    ],
  });


if (isLoading) return (
  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
)

if (error) return <div className='text-red-500'>error...</div>
  
  return (

    <div className=' rounded-lg shadow-md'>
      <div className='flex items-center justify-center m-4'>
        <div ref={ref} className='relative w-600 h-400 min-w-300'>
          <svg width='100%' height='100%' viewBox={`0 0 ${width} ${height}`}>
            <Group >
              {dataset?.map((d:any) => {
                const key = getKey(d);
                const value = getValue(d);
                const barWidth = xScale.bandwidth();
                const barHeight = innerHeight - (yScale(getValue(d)) ?? 0);
                const barX = xScale(key);
                const barY = innerHeight - barHeight;
                return (
                  <>
                    <Bar
                      key={`bar-${key}`}
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill="rgba(23, 233, 217, .5)"
                    />
                    <text
                      key={`text-label-${key}`}
                      x={barX}
                      y={barY}
                      dx={barWidth / 2}
                      dy="-.25em"
                      fontSize={8}
                      textAnchor="middle"
                    >
                      {value}
                    </text>
                  </>
                );
              })}
            </Group>
            <Group>
              <AxisBottom
                scale={xScale}
                top={innerHeight}
              />
            </Group>
            <Group>
              <AxisLeft
                scale={yScale}
                left={margin} 
              />
            </Group>
          </svg>
        </div>
      </div> 

      <div className='m-4 flex justify-between items-center'>   
        <div className='m-4'>
          <SelectFilter 
            placeholder={'Séances'}
            queryKey={['trainingsSeances']}
            query={() => apiClient.getTrainingsSeances()}
            selected={selectedSeance} 
            callback={handleSelectSeanceChange} 
          /> 
        </div> 
        <div className='m-4'>
          <Select defaultValue={selectedData} onValueChange={handleSelectDataChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Donnée" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="exe_reps">exe_reps</SelectItem>
                <SelectItem value="set_reps">set_reps</SelectItem>
                <SelectItem value="weight">weight</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>   
        </div> 
        <div className='m-4'>
          <SelectFilter 
            placeholder={'Exercices'}
            queryKey={['trainingsExercices']}
            query={() => apiClient.getTrainingsExercises()}
            selected={selectedExercice} 
            callback={handleSelectExerciceChange} 
          />   
        </div>          
      </div>   
    
    </div>
  )
}

export default TrainingsChart