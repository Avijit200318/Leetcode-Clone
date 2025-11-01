"use client";
import { formatDate } from '@/helpers/formatDate';
import { IProblem } from '@/models/Problem';
import { ApiResponse, codeSubmissionResultType } from '@/types/ApiResponse';
import axios from 'axios';
import { ChevronDown, Clock4, Cpu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';

interface ProblemPageSubmissionType {
  theme: string | undefined,
  problemInfo: IProblem,
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>, setSubmissionOutput: React.Dispatch<React.SetStateAction<codeSubmissionResultType | null>> 
}

export default function ProblemPageSubmission({ theme, problemInfo, setCurrentTab, setSubmissionOutput }: ProblemPageSubmissionType) {
  const [submission, setSubmission] = useState<codeSubmissionResultType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(`/api/problem/get-submitted-code?problemId=${problemInfo._id}`);

        setSubmission(res.data.submissions as codeSubmissionResultType[]);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
          console.log("Problem fetching submissions: ", error.response.data.message);
        } else {
          toast.error("Error while fetching submissions");
          console.log("Error while fetching submissions: ", error);
        }
      } finally{
        setLoading(false);
      }
    }
    fetchSubmission();
  }, []);

  const handleClick = (ele: codeSubmissionResultType) => {
    if(!submission) return;

    setCurrentTab("testResult");
    setSubmissionOutput(ele);
  }

  return (
    <div style={{ background: "var(--card)" }} className='w-full min-h-[calc(100vh-6.5rem)] flex flex-col p-4 pb-12'>
      <div className="w-full flex items-center justify-between py-1 border-b border-t px-2">
        <p className={`${theme === "dark" ? 'text-neutral-300' : ''}`}>No</p>
        <h1 className={`text-lg ${theme === "dark" ? 'text-neutral-300' : ''}`}>Status</h1>
        <div className="flex items-center gap-16 w-[32rem]">
          <h3 className={`flex items-center gap-1 ${theme === "dark" ? 'text-neutral-300' : ''}`}>Language <ChevronDown className='resize-custom w-4' /></h3>
          <h3 className={`flex items-center gap-1 ${theme === "dark" ? 'text-neutral-300' : ''}`}>Runtime <ChevronDown className='resize-custom w-4' /></h3>
          <h3 className={`flex items-center gap-1 ${theme === "dark" ? 'text-neutral-300' : ''}`}>Memory <ChevronDown className='resize-custom w-4' /></h3>
        </div>
      </div>

      {loading && <div className='absolute top-14 left-0 w-full h-14 opacity-50 px-4 flex items-center gap-4'>
        <Skeleton className="w-[12rem] h-11 rounded-sm" />
        <div className="flex items-center gap-10 px-4">
        <Skeleton className="w-16 h-11 rounded-sm" />
        <Skeleton className="w-24 h-11 rounded-sm" />
        <Skeleton className="w-32 h-11 rounded-sm" />
        </div>
        </div>}

      {(submission && !loading && submission.length === 0) && 
        <div className="w-full h-[calc(100vh-13rem)] flex items-center">
          <h2 className="text-lg text-center w-[90%] text-gray-500">No Submission to Show. Run and submit your code first to see the <span className="text-green-500">results</span> and <span className="text-green-500">complexity analysis</span> here.</h2>
        </div>
      }

      {submission && !loading && submission.map((ele, index) =>
        <div key={index} onClick={()=> handleClick(ele)} className="w-full flex items-center justify-between py-1 border-b border-t cursor-pointer px-2">
          <p className=''>{index + 1}</p>
          <div className="">
            <h1 className={`text-lg font-semibold ${ele.status === "Accepted"? 'text-green-500' : 'text-red-500'}`}>{ele.status}</h1>
            <h2 className={`text-sm ${theme === "dark" ? 'text-neutral-300' : ''}`}>{formatDate(ele.createdAt as Date)}</h2>
          </div>
          <div className="flex items-center gap-16 w-[30rem]">
            <h3 className="px-2 py-0.5 rounded-full bg-[var(--sidebar-accent)]">{ele.language}</h3>
            <h3 className={`flex items-center gap-1 ${theme === "dark" ? 'text-neutral-300' : ''}`}><Clock4 className='resize-custom w-4' /> {ele.status === "Accepted"? `${(ele.time * 1000).toFixed(2)} ms` : 'N/A'}</h3>
            <h3 className={`flex items-center gap-1 ${theme === "dark" ? 'text-neutral-300' : ''} ${ele.status === "Accepted"? 'ml-6' : 'ml-12.5'}`}><Cpu className='resize-custom w-4' /> {ele.status === "Accepted"? `${(ele.memory).toFixed(2)} MB` : 'N/A'}</h3>
          </div>
        </div>
      )}
    </div>
  )
}
