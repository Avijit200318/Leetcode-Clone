"use client";
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { timeAgoFunction } from '@/helpers/timeAgoFunction';
import { IProblem } from '@/models/Problem';
import { ApiResponse, codeSubmissionResultType } from '@/types/ApiResponse';
import axios from 'axios';
import { ArrowDownUp, Box, Check, CircleCheckBig, CircleQuestionMark, Funnel, Search, Shuffle, SquarePen } from 'lucide-react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {
  const { userId } = useParams()
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allSubmissions, setAllSubmissions] = useState<codeSubmissionResultType[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<codeSubmissionResultType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      setFilteredSubmissions(allSubmissions);
      return;
    }

    const filtered = allSubmissions.filter(submission =>
      (submission.problemId as IProblem).title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSubmissions(filtered);
  }

  const handleReverseArray = () => {
    setFilteredSubmissions([...filteredSubmissions].reverse());
  }

  const fetchAllSubmisssions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post<ApiResponse>("/api/code/get-user-allsubmissions", { userId });

      setAllSubmissions(res.data.submissions as codeSubmissionResultType[] || []);
      setFilteredSubmissions(res.data.submissions as codeSubmissionResultType[] || []);

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Problem occur while fetching all submissions: ", error.response.data.message)
        toast.error(error.response.data.message || "Problem occur while fetching all submissions")
      } else {
        console.log("Error while fetching all submissions: ", error);
        toast.error("Error while fetching all submissions");
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, setAllSubmissions, setFilteredSubmissions]);

  useEffect(() => {
    fetchAllSubmisssions()
  }, [fetchAllSubmisssions]);

  return (
    <div className='w-full h-[calc(100vh-3rem)] flex'>
      <div className="w-[75%] h-full pt-2 pb-4 px-12">
        <div className="w-full h-12 mt-4 flex justify-between border-b-2">
          <div className="flex w-[70%] justify-between">
            <h1 className='px-4 py-1.5 h-10 customBackground rounded-md'>Submissions</h1>
            <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Career</h1>
            <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Contest</h1>
            <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Compensation</h1>
            <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Feedback</h1>
            <h1 className='px-4 py-1.5 h-10 transition-all duration-300 cursor-pointer hover:bg-[var(--card)] rounded-md'>Interview</h1>
          </div>
          <Button className='bg-green-500 text-white font-semibold cursor-pointer hover:bg-green-600 duration-300'><SquarePen className='resize-custom w-4 h-4' /> Solve More</Button>
        </div>
        <div className="w-full h-18 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-[20rem] rounded-full overflow-hidden flex gap-1 items-center px-4 bg-input">
              <Search className='resize-custom w-5 text-gray-400' />
              <Input onChange={handleSearch} placeholder='Search submissions' className='customTransparent border-none outline-none focus-visible:ring-[0px]' value={searchQuery} />
            </div>
            <Button onClick={handleReverseArray} variant="outline" className='rounded-full w-9 h-9 cursor-pointer'><ArrowDownUp className='resize-custom w-4 text-gray-400' /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='rounded-full w-9 h-9 cursor-pointer'><Funnel className='resize-custom w-4 text-gray-400' /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className='justify-between'>Easy</DropdownMenuItem>
                <DropdownMenuItem className='justify-between'>Medium</DropdownMenuItem>
                <DropdownMenuItem className='justify-between'>Hard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Shuffle className='resize-custom w-5 text-gray-400' />
        </div>
        <ScrollArea className="w-full h-[calc(100vh-12rem)]">
          {isLoading && <div>
            <Skeleton className='w-full h-11'></Skeleton>
            <Skeleton className='w-full h-11 my-2'></Skeleton>
            <Skeleton className='w-full h-11'></Skeleton>
          </div>}
          {!isLoading && [...filteredSubmissions].reverse().map((ele, index) =>
            <Link key={index} href={`/submission/${ele._id}`}>
              <div className={`w-full flex items-center justify-between px-4 py-4 rounded cursor-pointer ${index % 2 == 0 ? 'bg-[var(--sidebar-accent)]' : ''}`}>
                <h2 className="font-semibold flex gap-3 items-center"><CircleCheckBig className='resize-custom w-4 text-green-500' /> {(ele.problemId as IProblem).title}</h2>
                <p className="text-gray-500 text-sm font-semibold">{timeAgoFunction(ele.createdAt as Date)}</p>
              </div>
            </Link>
          )}

        </ScrollArea>

      </div>
      <div className="w-[25%] h-full flex flex-col items-center justify-center py-4">
        <div className="p-2 border w-[80%] rounded-md customBackground h-[75%]">
          <Calendar className='w-full h-[70%] customBackground' />
          <div className="border h-[20%] bg-[#453827] rounded-lg p-2">
            <div className="flex justify-between items-center">
              <h3 className="text-[#fca215] flex gap-2">Weekly Premium <CircleQuestionMark className='resize-custom w-4' /></h3>
              <p className="text-sm dark:text-gray-500">3 days left</p>
            </div>
            <div className="flex justify-around mt-6">
              <h3 className="bg-[#fca215] p-1 font-semibold text-xs rounded-full cursor-pointer">W1</h3>
              <h3 className="hover:bg-[#fca215] hover:text-white transition-all duration-300 p-1 font-semibold text-xs rounded-full cursor-pointer text-gray-400">W2</h3>
              <h3 className="hover:bg-[#fca215] hover:text-white transition-all duration-300 p-1 font-semibold text-xs rounded-full cursor-pointer text-gray-400">W3</h3>
              <h3 className="hover:bg-[#fca215] hover:text-white transition-all duration-300 p-1 font-semibold text-xs rounded-full cursor-pointer text-gray-400">W4</h3>
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="flex gap-2 items-center"><Box fill='green' className='resize-custom w-5' /> 0 <span className="text-sm text-green-400">Redeem</span></p>
              <p className="dark:text-gray-400 text-sm">Rules</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
