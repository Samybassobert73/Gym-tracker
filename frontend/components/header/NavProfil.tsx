import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { setAccessToken, setIsAuthenticate, setRefreshToken } from '@/redux/slice/authSlice'
import { useRouter } from 'next/navigation';
import ApiClient from '@/service/apiClient'
import Loader from '../Loader'



const NavProfil = () => {
  const apiClient = new ApiClient();
    const router = useRouter();
    const dispatch = useDispatch();
    const logoutMutation = useMutation({
        mutationFn: () => apiClient.logout(),
        onSuccess: () => {
          dispatch(setAccessToken(null));
          dispatch(setRefreshToken(null));
          dispatch(setIsAuthenticate(false));
          router.push('/');
        }
      });
    const logout = async () => {
        try {
          
            await logoutMutation.mutateAsync();  
        } catch (error) {
            console.error('Registration error:', error.message);
            alert(error.message);
        }
      }
      
      


     
      
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href='/dashboard/' ><DropdownMenuItem className='cursor-pointer'>Tableau de bord</DropdownMenuItem></Link>
            <Link href='/dashboard/profil' ><DropdownMenuItem className='cursor-pointer'>profil</DropdownMenuItem></Link>
            <DropdownMenuItem className='cursor-pointer' onClick={logout}>Logout {logoutMutation.isLoading && <Loader/>}</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default NavProfil