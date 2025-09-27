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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';

import { useTheme } from 'next-themes';
import { signInValidation } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';


export default function page() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const { theme, systemTheme, setTheme } = useTheme();
  console.log("theme: ", theme)

  // zod validation + react hook form
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInValidation>) => {
    setIsSubmitting(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      });

      if(res?.error){
        if(res.error === "CredentialsSignin"){
          console.log("Login failded incorrect username or password: ", res.error);
          toast.error("Login failded incorrect username or password");
        }else{
          console.log(`Error: ${res.error}`)
          toast.error(`Error: ${res.error}`);
        }
      }

      if (res?.ok && res?.url) {
        toast.success("Login Successfull");
        router.replace('/problems');
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Sign in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
      if (!mounted) return;
      if(theme && systemTheme){
        setTheme(systemTheme);
      }
    }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // this line help us to avoid theme hydration error
  if (!mounted) {
    return null;
  }

  return (
    <div className='w-full h-[calc(100vh-4rem)] flex justify-center items-center'>
      <div className="w-[32rem] border-2 py-4 px-8 rounded-2xl flex flex-col items-center relative">
        <div className="logo">
          {(theme === "dark")? <img src="/logo dark.png" alt="" /> : <img src="/logo.svg" alt="" />}
        </div>
        <div className="w-full">
          <h1 className='text-3xl mt-8 mb-2 font-semibold'>Sign in</h1>
          <p className="text-sm w-[90%]">Welcome back! Continue solving challenges and track your coding progress.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-8">
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
                    <Input type='password' placeholder="Password" {...field} className='text-base p-4 h-11' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full h-11 text-base font-semibold cursor-pointer'>{isSubmitting ? <><Loader2 className='resize-custom animate-spin w-7 h-7' /> Please wait</> : 'Sign in'}</Button>
          </form>
        </Form>
        <div className="w-full flex gap-2 items-center my-4">
          <p>Don't have an account?</p>
          <Link href="/sign-up" className='font-semibold' >Sign up</Link>
        </div>
      </div>
    </div>
  )
}
