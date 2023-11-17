import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import React from 'react'
import { FormControl } from '../ui/form'

const SelectSeance = () => {

    // const {data, error, isLoading} = useQuery({
    //     queryKey: ['exercises'],
    //     queryFn: () => apiClient.getExercises()
    // });


    


  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
            <SelectValue placeholder="Selectionner un exercice" />
        </SelectTrigger>
       
        <SelectContent>
        {/* {data && (
            data.data.map((exercise:any) => (
            <SelectItem value={exercise._id}>{exercise.name}</SelectItem>
            ))
        )}                */}
        </SelectContent>
    </Select>
  )
}

export default SelectSeance