'use client'
import React, {useState}from 'react'
//react hook form
import { useForm , useFieldArray, Controller} from "react-hook-form";
//yup schema
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ApiClient from '@/service/apiClient';
import { Skeleton } from '../ui/skeleton';
import { useMutation, useQuery } from 'react-query';
import { Toaster } from '../ui/toaster';
import { useToast } from '../ui/use-toast';

//schema yup verification du formulaire
const schema = yup.object({
    name: yup.string().required().min(1),
    description: yup.string().required().min(1),
    sets: yup
      .array()
      .of(
        yup.object().shape({
          exe_id: yup.string().required().min(1),
          exe_reps: yup.number().required().min(1),
          weight: yup.number().required().min(1),
          rest_time: yup.string().required(),
          set_reps: yup.number().required().min(1),
        })
      ),
  });
type FormData = yup.InferType<typeof schema>;



const SeanceForm = () => {
  const apiClient = new ApiClient();
  const { toast } = useToast() 
//react hook form
// const { control, register, handleSubmit, formState: { errors, isSubmitting, isValid,  } } = useForm<FormData>({
//   resolver: yupResolver(schema),
//   mode: 'onChange'
// });


const form = useForm<FormData>({
  resolver: yupResolver(schema),
});



//react hook form dynamic fields
//const {fields, append,  remove} = useFieldArray({control, name:"exercices"})
const {fields, append, remove} = useFieldArray({control:form.control, name:"sets"})

const createSeanceMutation = useMutation({
  mutationFn: (data) => apiClient.createSeance(data),
  onSuccess: (data) => {
    toast({
      description: `Votre séance ` + data.data.name + ` a bien été créée`,
    })
  }
});

//function
const onSubmit = async(data: FormData) => {
  
  try {
       await createSeanceMutation.mutateAsync(data);   
  } catch (error) {
      console.error('Registration error:', error.response.data.message);
  }
}



const {data, error, isLoading} = useQuery({
  queryKey: ['exercices'],
  queryFn: () => apiClient.getExercices()
});



if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

if (error) return <div className='text-red-500'>error...</div>



  return (
    <div >
      <h1 className="text-2xl font-bold">Crée une Séance</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
            <div className='' >
                    <div className='my-4 flex flex-col'>  
                      <FormField 
                        control={form.control}
                        name={`name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de la séance</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de la séance" type='text'{...field} />
                            </FormControl>
                            {/* <FormDescription>
                              Répetitions par série
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      /> 
                    </div> 
                    <div className='my-4 flex flex-col'> 
                      <FormField 
                        control={form.control}
                        name={`description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>description de la séance</FormLabel>
                            <FormControl>
                              <Input placeholder="description de la séance" type='text'{...field} />
                            </FormControl>
                            {/* <FormDescription>
                              Répetitions par série
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />  
                    </div>   

              {fields.map((field, index) => {
                return (

                  <Card key={field.id} className='my-4'>
                    <CardHeader>
                      <CardTitle>Exercice {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className='my-4 flex flex-col'> 
                      <FormField 
                        control={form.control}
                        name={`sets.${index}.exe_id`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exercice</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selectionner un exercice" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {data && (
                                  data.data.map((exercise:any) => (
                                    <SelectItem value={exercise._id}>{exercise.name}</SelectItem>
                                  ))
                                )}               
                              </SelectContent>
                            </Select>
                            {/* <FormDescription>
                              choisissez un exercice
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  <div className='my-4 flex flex-col'> 
                      <FormField 
                        control={form.control}
                        name={`sets.${index}.exe_reps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Répetitions par série</FormLabel>
                            <FormControl>
                              <Input placeholder="Répetitions par série" type='number'{...field} />
                            </FormControl>
                            {/* <FormDescription>
                              Répetitions par série
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                   <div className='my-4 flex flex-col'> 
                      <FormField 
                        control={form.control}
                        name={`sets.${index}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Charges de travail</FormLabel>
                            <FormControl>
                              <Input placeholder="Charges de travail" type='number' {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              Charges de travail
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                   <div className='my-4 flex flex-col'> 
                      <FormField 
                        control={form.control}
                        name={`sets.${index}.rest_time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temps de repos</FormLabel>
                            <FormControl>
                              <Input placeholder="temps de repos" type='text' {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              temps de repos (minutes:secondes)
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='my-4 flex flex-col'> 
                      <FormField 
                        control={form.control}
                        name={`sets.${index}.set_reps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de series</FormLabel>
                            <FormControl>
                              <Input placeholder="nombre de series" type='number' {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              Nombre de series
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='my-4 flex flex-col'>
                      <span
                        className='p-4 text-red-400 cursor-pointer'
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        supprimer
                      </span>
                    </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className='flex justify-between'>
              <button
                className='my-2 px-4 w-fit py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer'
                onClick={() => {
                  append({});
                }}
              >
                Ajouter un exercice
              </button>
              <div>
                {createSeanceMutation.isLoading ?
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>:
                  <button
                    type='submit'
                    className='px-4 my-2 w-fit py-2 bg-red-500 text-white rounded hover:bg-red-600'
                  >
                    Envoyer
                  </button>
                }
                {createSeanceMutation.isError && <p className="text-red-500">{createSeanceMutation.error?.response?.data?.message}</p>}
              </div>
            </div>
            
        
            


          </form>
      </Form>


      <Toaster />
  </div>
  )
}

export default SeanceForm