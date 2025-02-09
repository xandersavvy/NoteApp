"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/JWTLoadercontext";
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod'


const RegisterSchema = z.object({
    email: z.string().email("Invalid Email Entered"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})

export default function Register() {
    const router = useRouter();
    const { token, isLoading, setToken, setIsLoading } = useAuth();
    useEffect(() => {
        setIsLoading(false)
        if (token) {
            router.push("/dashboard")
        }
        return () => {
        };
    }, [router,token]);


    const {
        register,
        handleSubmit,
        formState
    } = useForm({
        resolver: zodResolver(RegisterSchema)
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        console.info("Registering user:", data);
        // For API Request
        setTimeout(() => setIsLoading(false), 2000);

        if (true) {
            setToken("mock JWT Token")
        }

    }

    return (
        <Card className="max-w-md mx-auto shadow-lg p-6">
            <CardContent>
                <h2 className="text-xl font-semibold mb-4 text-center">Create an Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="Enter your email" {...register("email")} />
                        {formState.errors.email && <p className="text-red-500 text-sm">{formState.errors.email.message as unknown as string}</p>}
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter password" {...register("password")} />
                        {formState.errors.password && <p className="text-red-500 text-sm">{formState.errors.password.message as unknown as string}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}