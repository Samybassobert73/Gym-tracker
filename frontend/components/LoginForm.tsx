'use client'

import React, { useEffect } from 'react';
import { set, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from 'react-query';
import  ApiClient  from '../service/apiClient';
import { useRouter } from 'next/navigation';
import { setAccessToken, setRefreshToken, setIsAuthenticate } from '@/redux/slice/authSlice';
import { useDispatch } from 'react-redux';


const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const LoginForm = () => {
  const apiClient = new ApiClient();
  const router = useRouter();
  const dispatch = useDispatch();

    const signInMutation = useMutation({
      mutationFn: (data) => apiClient.signin(data),
      onSuccess: (data) => {
        dispatch(setAccessToken(data?.data?.accessToken));
        dispatch(setRefreshToken(data?.data?.refreshToken));
        dispatch(setIsAuthenticate(true));
        router.push('/dashboard');
      }
    });
    
    const { register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema)})
      const onSubmit = async (data) => {
        try {
            await signInMutation.mutateAsync(data);   
        } catch (error) {
            console.error('Registration error:', error.response.data.message);
        }
      }
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="">

            <div className="mb-4">
                <label htmlFor="username" className="block mb-1 font-bold">
                username:
                </label>
                <input
                type="text"
                id="username"
                {...register("username")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                />
                <p className="text-red-500">{errors.username?.message}</p>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-bold">
                Password:
                </label>
                <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                />
                <p className="text-red-500">{errors.password?.message}</p>
            </div>

            {signInMutation.isLoading ?
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>:
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Submit
              </button>
            }
            {signInMutation.isError && <p className="text-red-500">{signInMutation.error?.response?.data?.message}</p>}
            </form>
  );
};

export default LoginForm;

