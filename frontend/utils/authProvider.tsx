"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function AuthProviders({ children }: React.PropsWithChildren) {
    const router = useRouter();
    const pathname = usePathname();
    const isAuth = useSelector((state) => state?.auth.isAuthenticate);
    if(!isAuth && pathname !== '/login' && pathname !== '/register' && pathname !== '/') {
        router.push('/login');
    }
  return (
        <>
        
      {children}
        </>
      
  );
}

export default AuthProviders;