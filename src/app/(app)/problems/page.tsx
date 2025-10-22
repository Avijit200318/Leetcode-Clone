"use client";
import CustomRadialChart from '@/components/CustomRadialChart';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDownUp, Barcode, Check, ExternalLink, Funnel, GitFork, GraduationCap, LibraryBig, Play, Plus, RotateCcw, Search, Shuffle, Star } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function page() {
  return (
    <div className='w-full h-[calc(100vh-3rem)] flex'>
      <div className="w-[15%] h-full py-6 px-4 border-r-4">
        <div className="w-full p-2 rounded mb-3 flex items-center gap-4 hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer"><LibraryBig className='resize-custom w-6' /> Library</div>
        <div className="w-full p-2 rounded mb-3 flex items-center gap-4 hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer"><GraduationCap className='resize-custom w-6' /> Study Plan</div>
        <div className='w-full border-2 mb-4 mt-8'></div>
        <div className="w-full p-2 rounded mb-3 flex items-center justify-between hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer text-gray-500">My List <Plus className='resize-custom w-6 text-gray-500' /></div>
        <div className="w-full p-2 rounded mb-3 flex items-center gap-4 hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer"><Star className='resize-custom w-5' /> Favorite</div>
      </div>
      <div className="w-[35%] h-full py-4 px-12">
        <div className="w-full h-full bg-[var(--sidebar-accent)] rounded-md p-6 flex flex-col gap-2">
          <img src="/problem page logo.png" alt="" className="w-22 rounded-md" />
          <h2 className="text-2xl font-semibold">All Problems</h2>
          <p className="text-gray-500 text-sm mb-2">LeetCode- 1000 questioins - 500 solved</p>
          <div className="flex items-center gap-3 mb-2">
            <Button className='rounded-full font-semibold w-32 text-base flex items-center h-10 cursor-pointer'><Play className='resize-custom w-5' /> Practice</Button>
            <Button variant="outline" className='rounded-full w-10 h-10 cursor-pointer'><Star className='resize-custom w-5 text-gray-400' /></Button>
            <Button variant="outline" className='rounded-full w-10 h-10 cursor-pointer'><ExternalLink className='resize-custom w-5 text-gray-400' /></Button>
            <Button variant="outline" className='rounded-full w-10 h-10 cursor-pointer'><GitFork className='text-gray-400' /></Button>
          </div>
          <p className="text-gray-500 text-sm border-b-2 pb-4">Updated 15 days ago</p>
          <div className="w-full flex items-center justify-between">
            <h2 className="font-semibold mb-4">Progress</h2>
            <RotateCcw className='resize-custom w-5 text-gray-400' />
          </div>
          <div className="w-full h-60 flex gap-2">
            <div className="w-[70%] h-full bg-[var(--popover)] rounded-md overflow-hidden">
              <CustomRadialChart />
            </div>
            <div className="w-[30%] h-full flex flex-col gap-2">
              <div className="w-full h-[33.3%] bg-[var(--popover)] rounded-md flex justify-center items-center flex-col font-semibold">
                <h3 className="text-green-500">Easy</h3>
                <h3 className="">6/19</h3>
              </div>
              <div className="w-full h-[33.3%] bg-[var(--popover)] rounded-md flex justify-center items-center flex-col font-semibold">
                <h3 className="text-yellow-500">Med.</h3>
                <h3 className="">6/19</h3>
              </div>
              <div className="w-full h-[33.3%] bg-[var(--popover)] rounded-md flex justify-center items-center flex-col font-semibold">
                <h3 className="text-red-500">Hard</h3>
                <h3 className="">6/19</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-18 py-2 flex justify-between items-center pl-4 pr-8">
          <div className="flex items-center gap-4">
            <div className="w-[20rem] rounded-full overflow-hidden flex gap-1 items-center px-4 bg-input">
              <Search className='resize-custom w-5 text-gray-400' />
              <Input style={{ background: "transparent !important" }} placeholder='Search questions' className='border-none outline-none focus-visible:ring-[0px]' />
            </div>
            <Button variant="outline" className='rounded-full w-9 h-9 cursor-pointer'><ArrowDownUp className='resize-custom w-4 text-gray-400' /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='rounded-full w-9 h-9 cursor-pointer'><Funnel className='resize-custom w-4 text-gray-400' /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Easy</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Heard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Shuffle className='resize-custom w-5 text-gray-400' />
        </div>
        <ScrollArea className="w-full h-[calc(100%-4.5rem)] flex flex-col px-4 pb-4">
          <Link href="/">
            <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
              <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
              <h2 className="w-[70%] font-semibold">1. Two Sum</h2>
              <h2 className="w-[15%] text-green-500 text-sm">Easy</h2>
              <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4 text-gray-500' /><Barcode className='resize-custom w-4 text-gray-500' /></h2>
            </div>
          </Link>

          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">2. Three Sum</h2>
            <h2 className="w-[15%] text-yellow-500 text-sm">Medium</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
          <div className="w-full h-12 bg-[var(--sidebar-accent)] flex items-center gap-2 px-4 rounded-md">
            <h2 className="w-[5%] flex justify-center"><Check className='resize-custom w-5 text-orange-400' /></h2>
            <h2 className="w-[70%] font-semibold">3. Four Sum</h2>
            <h2 className="w-[15%] text-red-500 text-sm">Hard</h2>
            <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4' /><Barcode className='resize-custom w-4' /></h2>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
