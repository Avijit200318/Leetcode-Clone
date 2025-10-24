"use client";
import React from 'react'
import Link from 'next/link'
import { Session } from 'next-auth';

export default function NavLinks({theme, session, pathname}: {theme: string | undefined, session: Session | null, pathname: string}) {
  return (
    <div className="flex gap-6 w-[80%]">
        <Link href="/problems" className={`${theme === "dark"? pathname === "/problems"? 'text-white': 'text-neutral-300' 
          : 
          pathname === "/problems"? '' : 'text-neutral-400'}`}>Problems</Link>

        <Link href="/solution" className={`${theme === "dark"? pathname === "/solution"? 'text-white': 'text-neutral-300' 
          : 
          pathname === "/solution"? '' : 'text-neutral-400'}`}>Discuss</Link>

        <Link href="/about" className={`${theme === "dark"? pathname === "/about"? 'text-white': 'text-neutral-300' 
          : 
          pathname === "/about"? '' : 'text-neutral-400'}`}>Explore</Link>

        <Link href="/store" className={`${theme === "dark"? pathname === "/store"? 'text-white': 'text-neutral-300' 
          : 
          pathname === "/store"? '' : 'text-neutral-400'}`}>Store</Link>

        {session && session.user.userType === "admin" && (
          <Link href="/add-problem" className={`${theme === "dark"? pathname === "/add-problem"? 'text-white': 'text-neutral-300' 
          : 
          pathname === "/add-problem"? '' : 'text-neutral-400'}`}>Add Problem</Link>
        )}
      </div>
  )
}
