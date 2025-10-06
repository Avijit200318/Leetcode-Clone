"use client";
import React from 'react'
import Link from 'next/link'
import { Session } from 'next-auth';

export default function NavLinks({theme, session}: {theme: string | undefined, session: Session | null}) {
  return (
    <div className="flex gap-6 w-[80%]">
        <Link href="/problems" className={`${theme === "dark"? 'text-neutral-300' : ''}`}>Problems</Link>
        <Link href="/solution" className={`${theme === "dark"? 'text-neutral-300' : ''}`}>Discuss</Link>
        <Link href="/about" className={`${theme === "dark"? 'text-neutral-300' : ''}`}>Explore</Link>
        <Link href="/store" className={`${theme === "dark"? 'text-neutral-300' : ''}`}>Store</Link>
        {session && session.user.userType === "admin" && (
          <Link href="/add-problem" className={`${theme === "dark"? 'text-neutral-300' : ''}`}>Add Problem</Link>
        )}
      </div>
  )
}
