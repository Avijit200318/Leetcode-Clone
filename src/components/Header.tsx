"use client";
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react';

import NavDropdown from './NavDropdown';
import { Button } from './ui/button';
import Link from 'next/link';
import NavLinks from './NavLinks';
import NavRunButtonsContainer from './NavRunButtonsContainer';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme && systemTheme) {
      setTheme(systemTheme);
    }
  }, [mounted]);

  // this line help us to avoid theme hydration error
  if (!mounted) {
    return null;
  }

  return (
    <header className='w-full h-16 border-b-2 flex items-center justify-between px-8'>
        {(theme === "dark") ? <img src="/navLogo dark.png" alt="" className='h-8' /> : <img src="/navLogo light.png" alt="" className='h-8' />}
        {pathname.startsWith("/problem/")? <NavRunButtonsContainer theme={theme} session={session} /> : <NavLinks theme={theme} />}
      <div className="flex items-center gap-4">
        {!session && <div className='flex gap-4 items-center'>
          <Link href="/sign-up">
            <Button variant="outline" className='cursor-pointer font-semibold'>Sign up</Button>
          </Link>
          <p>or</p>
          <Link href="/sign-in">
            <Button variant="outline" className='cursor-pointer font-semibold'>Sign in</Button>
          </Link>
        </div>}
        {session && <NavDropdown session={session} signOut={signOut} theme={theme} />}
      </div>
    </header>
  )
}
