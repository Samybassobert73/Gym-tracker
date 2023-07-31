'use client'
import React, {useState}from 'react'
//react hook form
import { useForm , useFieldArray} from "react-hook-form";
//yup schema
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ExerciceSelect from './ExerciceSelect';


//schema yup verification du formulaire
//exercices
//1 exercice : 
//name: string
//Type: string
const schema = yup.object({
    exercises: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required().min(3),
          muscle: yup
            .array()
            .of(yup.string().required().min(1))
            .required()
            .min(1),
        })
      ),
  });
type FormData = yup.InferType<typeof schema>;

  

const SeanceForm = () => {
  //react hook form
const { control, register, handleSubmit, formState: { errors, isSubmitting, isValid,  } } = useForm<FormData>({
  resolver: yupResolver(schema),
  mode: 'onChange'
});
//react hook form dynamic fields
const {fields, append,  remove} = useFieldArray({control, name:"exercices"})
//function
const onSubmit = async(data: FormData) => {

  console.log(data)
}
  return (
    <div className=''>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <div >
        {fields.map((field, index) => {
          return (
            <div key={field.id} className='mb-4 flex'>
              <div className='flex flex-col'>
                <input
                  type='text'
                  {...register(`exercices.${index}.name`)}
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500'
                />
  
                {errors?.exercices?.[index]?.name && (
                  <p className='mt-2 text-red-500'>
                    {errors?.exercices[index]?.name?.message}
                  </p>
                )}
              </div>
              <div>
              
            </div>
  
  
              <span
                className='p-4 text-red-400 cursor-pointer'
                onClick={() => {
                  remove(index);
                }}
              >
                supprimer
              </span>
            </div>
          );
        })}
      </div>
  
      <span
        className='my-2 px-4 w-fit py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer'
        onClick={() => {
          append({});
        }}
      >
        Ajouter un exercice
      </span>
  
      <button
        type='submit'
        className='px-4 my-2 w-fit py-2 bg-red-500 text-white rounded hover:bg-red-600'
      >
        Submit
      </button>
    </form>
        <ExerciceSelect/>

  </div>
  )
}

export default SeanceForm