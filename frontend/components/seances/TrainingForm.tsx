import ApiClient from '@/service/apiClient';
import React, { useEffect } from 'react'
import * as yup from 'yup';
import { useToast } from '../ui/use-toast';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from 'react-query';
import { Toaster } from '../ui/toaster';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { setServers } from 'dns';

const schema = yup
    .object()
    .shape({
      trainingSets: yup
        .array()
        .of(
          yup
          .object()
          .shape({
            exe_id: yup.string().required().min(1),
            exe_reps: yup.number().required().min(1),
            weight: yup.number().required().min(1),
            rest_time: yup.string().required(),
            set_reps: yup.number().required().min(1),
          })
         
        )
        .required(),
    })
  .required();

type FormData = yup.InferType<typeof schema>;


interface SeanceUpdateProps {
  donne: any;
  seanceId: string;
}
export const TrainingForm = ({donne, seanceId}:SeanceUpdateProps) => {


  const apiClient = new ApiClient();
  const { toast } = useToast() 
  const {data, error, isLoading} = useQuery({
      queryKey: ['seance', seanceId],
      queryFn: () => apiClient.getSeance(seanceId)
    });
    
    const defaultValues = data?.data?.sets.map((set: any) => {
      delete set._id
      delete set.__v
      return set
    })

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {trainingSets: isLoading ? null : defaultValues},
  });
      
  const {fields, append, remove} = useFieldArray({control:form.control, name:"trainingSets",})

  const createTrainingMutation = useMutation({
    mutationFn: (data) => apiClient.createTraining(data),
    onSuccess: (data) => {
      toast({
        description: `Votre entrainement ` + data.data.name + ` a bien été créée`,
      })
    }
  });

  

  const onSubmit = async(data: FormData) => {
    console.log('datatrainingset', data.trainingSets)

    const dataToSend = {
      ...data,
      seanceid: seanceId,
    };
    console.log('dataToSend', dataToSend)
   
    try {
      await createTrainingMutation.mutateAsync(dataToSend);   
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
    }
  }
  


  

  return (
    <div>

      <h1 className="text-2xl font-bold">Training</h1>
        <Form {...form}  >
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
                {fields.map((field, index) => {
                      return (
                          <Card key={field.id} className='my-4'>
                            <CardHeader>
                              <CardTitle>Exercice</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className='my-4 flex flex-col'> 
                                <FormField 
                                  control={form.control}
                                  name={`trainingSets.${index}.exe_reps`}
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
                                  name={`trainingSets.${index}.weight`}
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
                                  name={`trainingSets.${index}.rest_time`}
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
                                  name={`trainingSets.${index}.set_reps`}
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
                            </CardContent>
                          </Card>
                      );
                    })}


              <div>
                {createTrainingMutation.isLoading ?
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
                {createTrainingMutation.isError && <p className="text-red-500">{createTrainingMutation.error?.response?.data?.message}</p>}
              </div>
          </form>      
        </Form>
      <Toaster />
    </div>
  )
}
