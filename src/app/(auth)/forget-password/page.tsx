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
import axios from "axios";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgetPasswordValidation, emailValidation } from '@/schemas/forgetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Loader2, SendHorizontal } from 'lucide-react';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';


export default function page() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [isSendingMail, setIsSendingMail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const router = useRouter();
  const { theme, systemTheme, setTheme } = useTheme();

  // zod validation + react hook form
  const form = useForm<z.infer<typeof forgetPasswordValidation>>({
    resolver: zodResolver(forgetPasswordValidation),
    defaultValues: {
      email: '',
      password: '',
      code: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof forgetPasswordValidation>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post<ApiResponse>("/api/auth/forget-password" , data);

      toast.success("Password updated successfully, please sign in");
      router.replace("/sign-in");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Forget password route error: ", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error in forget password: ", error);
        toast.error("Password Updation Failed");
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

  const handleSendingMail = async (email: string) => {
    const parsedData = emailValidation.safeParse({email});

    if(!parsedData.success){
      toast.error(parsedData.error.issues[0].message);
      console.log(parsedData.error.issues[0].message);
      return;
    }
    
    try {
      setIsSendingMail(true);
      const res = await axios.post<ApiResponse>("/api/auth/forget-password-mail", {email});

      toast.success("Check your inbox! We’ve sent a password reset code");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Forget password mail route error: ", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error in forget password mail route: ", error);
        toast.error("Forget password mail failed");
      }
    } finally{
      setIsSendingMail(false);
    }
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
          <h1 className='text-3xl mt-8 mb-2 font-semibold'>Forgot Password</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-8 py-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} className='text-base p-4 h-11' onChange={(e)=> {
                      field.onChange(e)
                      setEmail(e.target.value)
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={()=> handleSendingMail(email)} type="button" className='h-11 w-56 text-base font-semibold cursor-pointer'>{isSendingMail ? <><Loader2 className='resize-custom animate-spin w-7 h-7' /> Please wait</> : <>Send Veification Code <SendHorizontal className='resize-custom w-5' /></>}</Button>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative w-auto h-auto">
                      <Input type={isShowingPassword ? 'text' : 'password'} placeholder="Password" {...field} className='text-base p-4 h-11' />
                      {isShowingPassword ? <Eye onClick={handlePasswordShow} className={`absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${theme === "dark" ? 'text-neutral-400' : ''}`} /> : <EyeClosed onClick={handlePasswordShow} className={`absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${theme === "dark" ? 'text-neutral-400' : ''}`} />}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" {...field} className='text-base p-4 h-11' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full h-11 text-base font-semibold cursor-pointer'>{isSubmitting ? <><Loader2 className='resize-custom animate-spin w-7 h-7' /> Please wait</> : 'Submit'}</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
