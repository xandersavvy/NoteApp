"use client"
import { useAuth } from "@/context/JWTLoadercontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard(){
    const { token, isLoading, setIsLoading, setToken } = useAuth();
    const router = useRouter()
        useEffect(() => {
                setIsLoading(false)
                if (token) {
                    router.push("/dashboard")
                }
                return () => {
                };
              }, [router,token]); 
            

    return (<>
        Hello Logged In 
    </>)
}