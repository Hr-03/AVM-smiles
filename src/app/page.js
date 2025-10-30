"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ 
      UserId: "",
       UserPassword: "" });
  const { mutate: login, isPending } = useLogin();
  const dispatch = useDispatch();

  const router = useRouter(); 




   const handleSignIn = (e) => {
      e.preventDefault();
        login(form, {
          onSuccess: (res) => {
            dispatch(setCredentials({ token: res.token, user: res.userId }));
            router.push("/dashboard");
          },
          onError: (err) => alert(err.response?.data?.message || "Login failed"),
        }); 
   };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md border-gray-700 bg-gray-900 text-gray-100 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
Orthosquare          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="bg-gray-800 border-gray-700 focus:ring-2 focus:ring-indigo-500"
    value={form.UserId ?? ""}
              onChange={(e) => setForm({ ...form, UserId: e.target.value })}

            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-gray-800 border-gray-700 pr-10 focus:ring-2 focus:ring-indigo-500"
                value={form.UserPassword ?? ""}
                onChange={(e) => setForm({ ...form, UserPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div> */}
          </div>

          {/* Login Button */}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer hover:text-white" onClick={handleSignIn}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
