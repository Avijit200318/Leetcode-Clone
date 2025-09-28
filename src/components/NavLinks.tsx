"use client";
import React from 'react'
import Link from 'next/link'

export default function NavLinks({theme}: {theme: string | undefined}) {
  return (
    <div className="flex gap-6 w-[80%]">
        <Link href="/problems" className={`text-lg font-semibold ${theme === "dark"? 'text-neutral-300' : ''}`}>Problems</Link>
        <Link href="/solution" className={`text-lg font-semibold ${theme === "dark"? 'text-neutral-300' : ''}`}>Discuss</Link>
        <Link href="/about" className={`text-lg font-semibold ${theme === "dark"? 'text-neutral-300' : ''}`}>Explore</Link>
        <Link href="/store" className={`text-lg font-semibold ${theme === "dark"? 'text-neutral-300' : ''}`}>Store</Link>
      </div>
  )
}
