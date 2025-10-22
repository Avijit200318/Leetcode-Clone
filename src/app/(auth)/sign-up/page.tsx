"use client";

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from "axios";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpValidation } from '@/schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';

import { useTheme } from 'next-themes';


export default function page() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const router = useRouter();
  const { theme, systemTheme, setTheme } = useTheme();

  // zod validation + react hook form
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signUpValidation>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post<ApiResponse>("/api/auth/sign-up", data);

      // if status code is 400 or greater then axios treat it as error so it goes to catch block

      // if (res.data.success === false) {
      //   return;
      // }

      toast.success("User is registerd, please verify your account");
      router.replace(`/verify/${res.data.userId}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Sign up route error: ", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error in signup of user: ", error);
        toast.error("Sign up failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme && systemTheme) {
      setTheme(systemTheme);
    }
  }, [mounted]);

  const handlePasswordShow = () => {
    setIsShowingPassword(!isShowingPassword);
  }

  // this line help us to avoid theme hydration error
  if (!mounted) {
    return null;
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="w-[32rem] border-2 py-4 px-8 rounded-2xl flex flex-col items-center relative">
        <div className="logo">
          {(theme === "dark") ? <img src="/logo dark.png" alt="" /> : <img src="/logo.svg" alt="" />}
        </div>
        <div className="w-full">
          <h1 className='text-3xl mt-8 mb-2 font-semibold'>Create Account</h1>
          <p className="text-sm w-[90%]">Join our community to start solving coding challenges and improving your skills.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-8">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} className='text-base p-4 h-11' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} className='text-base p-4 h-11' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative w-auto h-auto">
                      <Input type={isShowingPassword ? 'text' : 'password'} placeholder="Password" {...field} className='text-base p-4 h-11 focus-visible:ring-0' />
                      {isShowingPassword ? <Eye onClick={handlePasswordShow} className={`absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${theme === "dark" ? 'text-neutral-400' : ''}`} /> : <EyeClosed onClick={handlePasswordShow} className={`absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${theme === "dark" ? 'text-neutral-400' : ''}`} />}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full h-11 text-base font-semibold cursor-pointer'>{isSubmitting ? <><Loader2 className='resize-custom animate-spin w-7 h-7' /> Please wait</> : 'Submit'}</Button>
          </form>
        </Form>
        <div className="w-full flex gap-2 items-center my-4">
          <p>Already have an account?</p>
          <Link href="/sign-in" className='font-semibold' >Sign in</Link>
        </div>
      </div>
    </div>
  )
}
