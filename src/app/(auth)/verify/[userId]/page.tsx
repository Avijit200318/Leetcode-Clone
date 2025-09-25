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
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyCodeValidation } from '@/schemas/verifyCodeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';

import { useTheme } from 'next-themes';


export default function page() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { userId } = useParams();

  // zod validation + react hook form
  const form = useForm<z.infer<typeof verifyCodeValidation>>({
    resolver: zodResolver(verifyCodeValidation),
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof verifyCodeValidation>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post<ApiResponse>("/api/auth/verify-code", {
        id: userId,
        code: data.code
      });

      toast.success("Account verified successfully");
      router.replace("/sign-in");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Account verification error: ", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error while user verification: ", error);
        toast.error("User verification failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // this line help us to avoid theme hydration error
  if (!mounted) {
    return null;
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="w-[32rem] border-2 py-8 px-8 rounded-2xl flex flex-col items-center">
        <div className="logo">
          {theme === "dark"? <img src="/logo dark.png" alt="" /> : <img src="/logo.svg" alt="" />}
        </div>
        <div className="w-full">
          <h1 className='text-3xl mt-8 mb-2 font-semibold'>Verify Your Account</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-8">
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
        <div className="w-full flex gap-2 items-center my-4">
          <p>Verification issue?</p>
          <Link href="/sign-up" className='font-semibold' >Sign up</Link>
        </div>
      </div>
    </div>
  )
}
