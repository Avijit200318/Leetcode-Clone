"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IUser } from '@/models/User';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { isAxiosError } from 'axios';
import { BookLock, CreditCard, ExternalLink, FlaskConical, Package, Settings, ShieldCheck } from 'lucide-react'
import { ObjectId } from 'mongoose';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {

    const {userId} = useParams()
    const [fullUserInfo, setFullUserInfo] = useState<IUser | null>(null)
    console.log(fullUserInfo)

    const fetchFullUserInfo = useCallback(async () => {
        try {
            const res = await axios.get<ApiResponse>(`/api/user/get-user?userId=${userId}`);

            setFullUserInfo(res.data.user || null)
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.message || "Problem occur while fetching userinfo")
                console.log("Problem occur while fetching userinfo: ", error.response.data.message);
            }else{
                toast.error("Error while fetching user info");
                console.log("Error while fetching user info: ", error);
            }
        }
    }, [userId, setFullUserInfo]);

    useEffect(() => {
        fetchFullUserInfo();
    }, [fetchFullUserInfo])

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
            <div className="w-full h-[80%] relative customBackground">
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
                    <div className="w-[60%] h-[38rem] customBackground rounded-md py-4 px-8 border">
                        <h1 className="font-semibold pt-2 pb-4">Basic Info</h1>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">Username</h2>
                            <Input className='w-[60%] outline-none focus-visible:ring-[0px]' defaultValue={fullUserInfo?.username} />
                        </div>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">Email</h2>
                            {/* <Input className='w-[60%] outline-none focus-visible:ring-[0px]' /> */}
                            <h2 className="w-[60%] dark:bg-[#212124] focus-visible:border-ring border border-input h-10 rounded-md px-4 py-2 cursor-not-allowed">{fullUserInfo?.email}</h2>
                        </div>
                        <div className="flex gap-12 mb-4">
                            <h2 className="w-32">Bio</h2>
                            <textarea className="w-[60%] h-24 rounded-md resize-none dark:bg-[#212124] focus-visible:border-ring border border-input outline-none" defaultValue={fullUserInfo?.bio}></textarea>
                        </div>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">Country</h2>
                            <Input className='w-[60%] outline-none focus-visible:ring-[0px]' defaultValue={fullUserInfo?.country} />
                        </div>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">University</h2>
                            <Input className='w-[60%] outline-none focus-visible:ring-[0px]' defaultValue={fullUserInfo?.unversity} />
                        </div>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">Skills</h2>
                            <Input className='w-[60%] outline-none focus-visible:ring-[0px]' defaultValue={fullUserInfo?.skills} />
                        </div>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">Github</h2>
                            <Input className='w-[60%] outline-none focus-visible:ring-[0px]' defaultValue={fullUserInfo?.github} />
                        </div>
                        <div className="flex items-center gap-12 mb-4">
                            <h2 className="w-32">Linkdin</h2>
                            <Input className='w-[60%] outline-none focus-visible:ring-[0px]' defaultValue={fullUserInfo?.linkdin} />
                        </div>
                        <Button variant="secondary" className='font-semibold w-40 h-10 mt-4 text-base cursor-pointer'>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}