"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CloudUpload, Flame, ListVideo, Loader2, Play, Sparkles } from 'lucide-react'
import { Session } from 'next-auth';

interface NavRunButtonType {
  theme: string | undefined,
  session: Session | null
}

export default function NavRunButtonsContainer({theme, session}: NavRunButtonType) {
    const [isRunLoading, setIsRunLoading] = useState<boolean>(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  return (
    <div className="w-[80%] px-4 border-l flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <Link href="/problems"><ListVideo className={`${theme === "dark"? 'text-neutral-300' : ''}`} /></Link>
        <Link href="/problems" className='font-semibold'>Problem List</Link>
        </div>
        <div className="flex gap-1">
          <Button disabled={session?.user? false : true} variant="secondary" className='cursor-pointer'>{isRunLoading? <Loader2 className='resize-custom w-5 animate-spin' /> : <Play />}</Button>
          <Button disabled={session?.user? false : true} variant="secondary" className='w-30 cursor-pointer text-base flex items-center gap-2 font-semibold'>
            {isSubmitLoading? <><Loader2 className='resize-custom w-5 animate-spin' />Running</> : <><CloudUpload className='resize-custom w-5' /> Submit</>}
            </Button>
          <Button disabled={session?.user? false : true} variant="secondary" className='cursor-pointer'><Sparkles /></Button>
        </div>
        <div className="">
          <Flame className={`${theme === "dark"? 'text-neutral-300' : ''}`} />
        </div>
      </div>
  )
}
