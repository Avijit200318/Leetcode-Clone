"use client";
import { CircleQuestionMark, MessageCircle, SquareArrowOutUpRight, Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function ProblemSideFooter() {
  const [startClicked, setStarClicked] = useState<boolean>(false);

  const handleCopyLink = () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}/${window.location.pathname}`;
    navigator.clipboard.writeText(baseUrl);
    toast.success("URL Copied");
  }

  const handleStarClick = () => {
    setStarClicked(!startClicked);
  }

  return (
    <div className='absolute bottom-0 left-0 w-full h-8 bg-[var(--sidebar-accent)] flex items-center px-4 gap-4'>
      <div className="flex gap-2 items-center px-3 rounded-sm" style={{ background: "var(--card)" }}>
        <div className="flex gap-1 items-center border-r-2">
          <ThumbsUp className='resize-custom w-4' />
          <p className='text-sm pr-2'>100k</p>
        </div>
        <ThumbsDown className='resize-custom w-4' />
      </div>
      <MessageCircle className='resize-custom w-4' />
      {startClicked ? <Star fill="orange" onClick={handleStarClick} className='resize-custom w-4 cursor-pointer text-orange-400' /> : <Star onClick={handleStarClick} className='resize-custom w-4 cursor-pointer' />}
      <SquareArrowOutUpRight onClick={handleCopyLink} className='resize-custom w-4 cursor-pointer' />
      <CircleQuestionMark className='resize-custom w-4 cursor-pointer' />
    </div>
  )
}
