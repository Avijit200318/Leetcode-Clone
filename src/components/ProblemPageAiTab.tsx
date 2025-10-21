"use client";
import { History, Plus, SendHorizontal, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import ProblemPageInputOutputMessage from './ProblemPageInputOutputMessage';

export default function ProblemPageAiTab() {
    const [chats, setChats] = useState<{ input: string; output: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    return (
        <div style={{ background: "var(--card)" }} className='w-full min-h-[calc(100vh-6.5rem)] flex flex-col'>
            <div className="w-full flex justify-between items-center border-b py-3 px-4">
                <h1 className='flex items-center gap-3 font-semibold '><Sparkles className='resize-custom w-5 text-blue-600' /> Leet</h1>
                <div className="flex gap-4 items-center">
                    <Plus className='resize-custom w-5' />
                    <History className='resize-custom w-5' />
                </div>
            </div>
            <div className="w-full h-[calc(100vh-10rem)] p-4 pb-8">
                <ScrollArea className="w-full h-[70%] pb-1 px-4">
                    <ProblemPageInputOutputMessage chats={chats} isSubmitting={isSubmitting} />
                </ScrollArea>
                <div className="w-full h-[30%] flex justify-center">
                    <div className="w-[42rem] h-full flex justify-center items-start relative border-2 border-blue-500 rounded-lg py-3">
                        <textarea name="" className='w-[40rem] h-20 resize-none outline-none' placeholder='Asked Leet for guide...'></textarea>
                        <div className="w-full absolute bottom-0 left-0  flex justify-between items-center px-4 py-1">
                            <div className="w-30 border flex items-center justify-between py-1.5 px-3 rounded-full">
                                <img src="/gemini logo.png" alt="" className="w-7 h-7 bg-white rounded-full p-0.5" />
                                <h3 className="">Gemini</h3>
                            </div>
                            <Button variant="outline" className='w-9 h-9 rounded-full p-1 cursor-pointer'><SendHorizontal className='resize-custom w-6 -rotate-90 text-gray-500' /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
