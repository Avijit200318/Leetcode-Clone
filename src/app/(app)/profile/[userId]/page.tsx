"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IUser } from '@/models/User';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { isAxiosError } from 'axios';
import { CreditCard, ExternalLink, FlaskConical, Loader2, Package, Settings, ShieldCheck, University } from 'lucide-react'
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserValidation } from '@/schemas/updateUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function page() {

    const { userId } = useParams()
    const [fullUserInfo, setFullUserInfo] = useState<IUser | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<z.infer<typeof updateUserValidation>>({
        resolver: zodResolver(updateUserValidation),
        defaultValues: {
            username: "",
            bio: "",
            country: "",
            university: "",
            github: "",
            linkdin: "",
        }
    })

    const allValues = form.watch()
    console.log(allValues)

    const fetchFullUserInfo = useCallback(async () => {
        try {
            const res = await axios.get<ApiResponse>(`/api/user/get-user?userId=${userId}`);

            setFullUserInfo(res.data.user || null);
            if (!res.data.user) return;

            form.reset({
                username: res.data.user.username,
                bio: res.data.user.bio,
                country: res.data.user.country,
                university: res.data.user.university,
                github: res.data.user.github,
                linkdin: res.data.user.linkdin,
            });
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || "Problem occur while fetching userinfo")
                console.log("Problem occur while fetching userinfo: ", error.response.data.message);
            } else {
                toast.error("Error while fetching user info");
                console.log("Error while fetching user info: ", error);
            }
        }
    }, [userId, setFullUserInfo]);

    useEffect(() => {
        fetchFullUserInfo();
    }, [fetchFullUserInfo]);

    const onSubmit = async (data: z.infer<typeof updateUserValidation>) => {
        setIsSubmitting(true);

        try {
            const res = await axios.post("/api/user/update-user", data);
            toast.success("User info updated successfully")
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.message || "Problem occur while submitting info")
                console.log("Problem occur while submitting information: ", error.response.data.message);
            }else{
                toast.error("Error while submitting user info")
                console.log("Error while submitting user info: ", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='w-full h-screen'>
            <div className="w-full h-[40%] flex items-center gap-12 mb-4 px-24">
                <div className="w-40 h-40 border-white border-4 rounded-lg overflow-hidden">
                    <img src={fullUserInfo?.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="">
                    <h1 className="text-2xl font-semibold flex items-center gap-4">{fullUserInfo?.username} <ExternalLink className='resize-custom w-5 text-blue-500' /></h1>
                    <p className="text-gray-500">Leetcode ID: {(fullUserInfo?._id || "").toString()}</p>
                </div>
            </div>
            <div className="w-full h-[84%] relative customBackground">
                <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
                    <div className="w-[20%]">
                        <h2 className="w-full bg-blue-400 py-4 px-8 text-lg rounded-md">Basic Info</h2>
                        <div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-gray-500">
                            <Settings className='resize-custom w-5' />
                            <h3 className="">Account</h3>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-gray-500">
                            <FlaskConical className='resize-custom w-5' />
                            <h3 className="">Labs</h3>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-gray-500">
                            <ShieldCheck className='resize-custom w-5' />
                            <h3 className="">Privacy</h3>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-gray-500">
                            <CreditCard className='resize-custom w-5' />
                            <h3 className="">Billing</h3>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-gray-500">
                            <Package className='resize-custom w-5' />
                            <h3 className="">Orders</h3>
                        </div>
                    </div>
                    <div className="w-[60%] h-[40rem] customBackground rounded-md py-4 px-8 border">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                <h1 className="font-semibold pt-2 pb-4">Basic Info</h1>
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex gap-12'>
                                            <FormLabel className='w-32'>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} className='text-base p-4 h-11 w-[60%]' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center gap-12 mb-4">
                                    <h2 className="w-32">Email</h2>
                                    <h2 className="w-[60%] dark:bg-[#212124] focus-visible:border-ring border border-input h-10 rounded-md px-4 py-2 cursor-not-allowed">{fullUserInfo?.email}</h2>
                                </div>
                                <FormField
                                    name="bio"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex gap-12'>
                                            <FormLabel className='w-32'>Bio</FormLabel>
                                            <textarea className="w-[60%] h-24 rounded-md resize-none dark:bg-[#212124] border border-input focus-visible:border-ring px-4 py-2" onChange={(e) => field.onChange(e.target.value)} value={allValues.bio}></textarea>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="country"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex gap-12'>
                                            <FormLabel className='w-32'>Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Country" {...field} className='text-base p-4 h-11 w-[60%]' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="university"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex gap-12'>
                                            <FormLabel className='w-32'>University</FormLabel>
                                            <FormControl>
                                                <Input placeholder="University" {...field} className='text-base p-4 h-11 w-[60%]' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="github"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex gap-12'>
                                            <FormLabel className='w-32'>Github</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Github" {...field} className='text-base p-4 h-11 w-[60%]' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="linkdin"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex gap-12'>
                                            <FormLabel className='w-32'>Linkdin</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Linkdin" {...field} className='text-base p-4 h-11 w-[60%]' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex justify-center mt-4">
                                    <Button disabled={isSubmitting} type='submit' className='w-[60%] font-semibold cursor-pointer h-10 text-base'>{isSubmitting ? <><Loader2 className='resize-custom animate-spin w-7 h-7' /> Please wait</> : 'Save'}</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}