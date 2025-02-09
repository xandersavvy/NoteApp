"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"; // Assuming you installed ShadCN
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/JWTLoadercontext";

const LoginPage = () => {
    
    const { token, isLoading, setIsLoading, setToken } = useAuth();
    useEffect(() => {
        setIsLoading(false)
        if (token) {
            useRouter().push("/dashboard")
        }
        return () => {
        };
      }, []); 
    

    

    setIsLoading(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setIsLoading(true);

        // Mock login logic (replace with actual API call)
        if (email === "user@example.com" && password === "password123") {
            const mockToken = "mock-jwt-token";
            localStorage.setItem("jwt_token", mockToken);
            setToken(mockToken)
            router.push("/dashboard"); // Redirect to dashboard page
        } else {
            alert("Invalid email or password!");
        }
        setIsLoading(false);
    };

    return (
            <Card className="max-w-md w-full p-6 shadow-lg">
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
    );
};

export default LoginPage;
