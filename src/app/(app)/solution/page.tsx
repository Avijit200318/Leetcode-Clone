"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/helpers/formatDate';
import { ISolution } from '@/models/Solution';
import { IUser } from '@/models/User';
import { ApiResponse } from '@/types/ApiResponse';
import axios from 'axios';
import { ArrowBigUp, Compass, Eye, MessageCircle, Search, SquarePen } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {
  const [allSolutions, setAllSolutions] = useState<ISolution[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllSolutions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponse>("/api/solution/all-solutions");

      setAllSolutions(res.data.solutions as ISolution[] || [])
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Problem occur while fetching all solutoins")
        console.log("Problem occur while fetching all solutions: ", error.response.data.message);
      } else {
        toast.error("Error while fetching all solutions")
        console.log("Error while fetching all solutions: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [setAllSolutions])

  useEffect(() => {
    fetchAllSolutions()
  }, [fetchAllSolutions])

  return (
    <div className='w-full h-[150vh] flex'>
      <div className="w-[80%] h-full flex justify-center pt-8">
        <div className="w-[80%] h-full">
          <div className="w-full h-44 flex gap-4">
            <div className="w-[33%] h-full rounded overflow-hidden">
              <img src="/discuss4.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[33%] h-full rounded overflow-hidden">
              <img src="/discuss3.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[33%] h-full rounded overflow-hidden">
              <img src="/discuss2.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full h-12 mt-4 flex justify-between">
            <div className="flex w-[70%] justify-between">
              <h1 className='px-4 py-1.5 h-10 customBackground rounded-md'>For You</h1>
              <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Career</h1>
              <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Contest</h1>
              <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Compensation</h1>
              <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Feedback</h1>
              <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Interview</h1>
            </div>
            <Button className='bg-green-500 text-white font-semibold cursor-pointer hover:bg-green-600 duration-300'><SquarePen className='resize-custom w-4 h-4' /> Create</Button>
          </div>

          <ScrollArea className="w-full mt-4 py-2 h-[calc(100%-16.5rem)]">
            {isLoading &&
              <>
                <div className="w-full flex gap-4 cursor-pointer">
                  <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
                  <div className="w-[90%] border-b-2 pb-4">
                    <Skeleton className='w-36 h-6'></Skeleton>
                    <Skeleton className='w-full h-10 my-4'></Skeleton>
                    <Skeleton className='w-[95%] h-12'></Skeleton>
                    <Skeleton className='w-40 h-8 my-4'></Skeleton>
                  </div>
                </div>
                <div className="w-full flex gap-4 cursor-pointer mt-3">
                  <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
                  <div className="w-[90%] border-b-2 pb-4">
                    <Skeleton className='w-36 h-6'></Skeleton>
                    <Skeleton className='w-full h-10 my-4'></Skeleton>
                    <Skeleton className='w-[95%] h-12'></Skeleton>
                    <Skeleton className='w-40 h-8 my-4'></Skeleton>
                  </div>
                </div>
              </>
            }
            {!isLoading && <div className="w-full flex gap-4 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-white overflow-hidden border">
                <img src="/navLogo light.png" alt="" className="w-full h-full scale-75" />
              </div>
              <div className="w-[90%] border-b-2 pb-4">
                <p className="text-sm dark:text-gray-400">Leetcode {formatDate(new Date())}</p>
                <h2 className="font-semibold text-xl my-2">Leetcode's Thanks Giving Sale Is Now Live! Get $40 OFF - Your Final Offer of The Year</h2>
                <p className="text-sm dark:text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis eligendi amet beatae. Atque dignissimos vel, harum ex repudiandae consectetur quisquam laboriosam deserunt magnam fugit. Perspiciatis incidunt accusantium fugit dicta recusandae?</p>
                <div className="flex items-center gap-6 mt-4 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <ArrowBigUp className='resize-custom w-4' />
                    <p className="text-sm">300</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className='resize-custom w-4' />
                    <p className="text-sm">300</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className='resize-custom w-4' />
                    <p className="text-sm">300</p>
                  </div>
                </div>
              </div>
            </div>
            }

            {(allSolutions.length > 0 && !isLoading) && allSolutions.map((ele, index) =>
              <div key={index} className="w-full flex gap-4 mt-6 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white overflow-hidden border">
                  <img src={(ele.userId as IUser).avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-[90%] border-b-2 pb-4">
                  <p className="text-sm dark:text-gray-400">Leetcode {formatDate(ele.createdAt as Date)}</p>
                  <h2 className="font-semibold text-xl my-2">{ele.title}</h2>
                  <p className="text-sm dark:text-gray-400 line-clamp-2">{ele.explanation.split("Explanation:\n\n")[1]}</p>
                  <div className="flex items-center gap-6 mt-4 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <ArrowBigUp className='resize-custom w-4' />
                      <p className="text-sm">300</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className='resize-custom w-4' />
                      <p className="text-sm">300</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className='resize-custom w-4' />
                      <p className="text-sm">300</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
      <div className="w-[20%] h-full flex flex-col items-center px-4 py-8">
        <div className="w-full rounded-full overflow-hidden flex gap-1 items-center px-4 bg-input">
          <Search className='resize-custom w-5 text-gray-400' />
          <Input placeholder='Search' className='customTransparent border-none outline-none focus-visible:ring-[0px]' />
        </div>
        <div className="w-full h-[32rem] border-2 rounded-md mt-4 p-3">
          <div className="flex items-center gap-2 pb-4">
            <Compass className='resize-custom w-5' />
            <h3 className="text-lg">Explore</h3>
          </div>
          <p className="text-gray-500 py-3">#Interview</p>
          <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
          <p className="text-gray-500 py-3">#Compensetion</p>
          <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
          <p className="text-gray-500 py-3">#Career</p>
          <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
          <p className="text-gray-500 py-3">#Google</p>
          <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
          <p className="text-blue-600 cursor-pointer pt-6">Show More</p>
        </div>
      </div>
    </div>
  )
}
