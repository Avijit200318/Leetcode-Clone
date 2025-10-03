"use client";
import React from 'react'
import { ModeToggle } from './modeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { Settings, FlaskConical, CreditCard, Package, LogOut, Bell, Timer } from "lucide-react"
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface NavDropdownPropsType {
    session: Session | null,
    signOut: typeof signOut,
    theme: string | undefined
}

export default function NavDropdown({session, signOut, theme}: NavDropdownPropsType) {

    return (
        <div className="flex items-center gap-4">
            <Timer className={`resize-custom w-6 ${theme === "dark"? 'text-neutral-300' : ''}`} />
            <Bell className={`resize-custom w-6 ${theme === "dark"? 'text-neutral-300' : ''}`} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="w-9 h-9 overflow-hidden rounded-full bg-amber-200 border-2 cursor-pointer">
                        <img src={session?.user.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[18rem]" align="center">
                    <DropdownMenuLabel>
                        <Link href="/dashboard">
                            <div className="flex items-center gap-4 my-2">
                                <div className="w-16 h-16 rounded-full overflow-hidden border">
                                    <img src={session?.user.avatar} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-[70%] relative">
                                    <h2 className='text-2xl font-semibold truncate w-full'>{session?.user.username}</h2>
                                    <p className="w-full text-sm leading-4 text-yellow-300">Access all features with our Premium subscription!</p>
                                </div>
                            </div>
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className=' cursor-pointer'>
                            <FlaskConical className='resize-custom w-5 mr-2' /> Try New Features
                        </DropdownMenuItem>
                        <DropdownMenuItem className=' cursor-pointer'>
                            <CreditCard className='resize-custom w-5 mr-2' /> Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem className=' cursor-pointer'>
                            <Settings className='resize-custom w-5 mr-2' /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className=' cursor-pointer'>
                            <Package className='resize-custom w-5 mr-2' /> Orders
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <div className='p-1 flex gap-4 items-center sm:text-base'><ModeToggle /> {theme && theme[0].toUpperCase() + theme?.slice(1)}</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className='sm:text-base cursor-pointer'>
                        <LogOut className='resize-custom w-5 mr-2' /> Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
