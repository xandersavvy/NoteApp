"use client"
import { useAuth } from "@/context/JWTLoadercontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard(){
    const { token, isLoading, setIsLoading, setToken } = useAuth();
        useEffect(() => {
                setIsLoading(false)
                if (token) {
                    useRouter().push("/dashboard")
                }
                return () => {
                };
              }, []); 
            

    return (<>
        Hello Logged In 
    </>)
}