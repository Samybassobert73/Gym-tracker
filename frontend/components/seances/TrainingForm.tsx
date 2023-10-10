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
      sets: yup
        .array()
        .of(
          yup
          .object()
          .shape({
            // exe_id: yup.string().required().min(1),
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
console.log('icifrfrfrfr',data)


  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {sets: isLoading ? null : data.data.sets},
  });
      
  const {fields, append, remove} = useFieldArray({control:form.control, name:"sets",})
  console.log('fields', fields, donne.sets)
  // const createSeanceMutation = useMutation({
  //   mutationFn: (data) => apiClient.createSeance(data),
  //   onSuccess: (data) => {
  //     toast({
  //       description: `Votre séance ` + data.data.name + ` a bien été créée`,
  //     })
  //   }
  // });

  

  const onSubmit = async(data: FormData) => {
    console.log('datato send', data);
    // try {
    //   await createSeanceMutation.mutateAsync(data);   
    // } catch (error) {
    //   console.error('Registration error:', error.response.data.message);
    // }
  }
  
  // const {data, error, isLoading} = useQuery({
  //   queryKey: ['exercices'],
  //   queryFn: () => apiClient.getExercices()
  // });

  

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
                            </CardContent>
                          </Card>
                        
                  
                      );
                    })}
          </form>      
        </Form>
      <Toaster />
    </div>
  )
}
