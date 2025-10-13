"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CloudUpload, Flame, ListVideo, Loader2, Play, Shuffle, Sparkles } from 'lucide-react'
import { Session } from 'next-auth';

interface NavRunButtonType {
  theme: string | undefined,
  session: Session | null
}

export default function NavRunButtonsContainer({ theme, session }: NavRunButtonType) {
  const [isRunLoading, setIsRunLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  return (
    <div className="w-[80%] px-4 border-l flex justify-between items-center h-full">
      <div className="flex items-center gap-2">
        <Link href="/problems"><ListVideo className={`${theme === "dark" ? 'text-neutral-300' : ''} resize-custom w-5`} /></Link>
        <Link href="/problems" className=''>Problem List</Link>
        <Shuffle className={`${theme === "dark" ? 'text-neutral-300' : ''} resize-custom w-4 ml-4`} />
      </div>
      <div className="">
        <Flame className={`${theme === "dark" ? 'text-neutral-300' : ''}`} />
      </div>
    </div>
  )
}
