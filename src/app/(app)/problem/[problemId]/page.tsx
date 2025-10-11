"use client";
import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import ProblemPageNavigation from '@/components/ProblemPageNavigation';
import { ScrollArea } from "@/components/ui/scroll-area"
import ProblemSideFooter from '@/components/ProblemPageSideFooter';
import { useParams } from 'next/navigation.js';

import { mongodbObjectId } from '@/schemas/similarQuestionSchema';
import { toast } from 'sonner';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { IProblem } from '@/models/Problem.js';
import { Skeleton } from "@/components/ui/skeleton"
import ProblemPageDescription from '@/components/ProblemPageDescription';

import ProblemPageCodeEditor from '@/components/ProblemPageCodeEditor';
import { useTheme } from 'next-themes';

export default function page() {
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = useParams();
  const { problemId } = pathname;
  const {theme} = useTheme()
  const [problemInfo, setProblemInfo] = useState<IProblem | null>(null);

  // 68e414989b5acf879c409226

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      if (!mounted) return null;

      try {
        const parsedData = mongodbObjectId.safeParse(problemId);

        if (!parsedData.success) {
          console.log("Invalid Problem Id: ", problemId);
          toast.error("Invalid Problem Id");
          return;
        }

        const res = await axios.get<ApiResponse>(`/api/problem/get-problem?problemId=${problemId}`);

        setProblemInfo(res.data.problem || null);

      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
          console.log("Problem fetching route error: ", error.response.data.message)
        } else {
          toast.error("Error while fetching error");
          console.log("Error while fetching error: ", error);
        }
      }
    }

    fetchProblemDetails();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-[calc(100vh-3rem)] px-3 py-2">
      <ResizablePanelGroup direction="horizontal" className="w-full gap-1">
        <ResizablePanel defaultSize={50} className='rounded-md bg-[var(--sidebar-accent)] border'>
          <ProblemPageNavigation />

          <ScrollArea className='relative w-full h-[calc(100vh-3.5rem-3rem)]'>
            {!problemInfo && <div style={{ background: "var(--card)" }} className='absolute left-0 top-0 w-full h-full z-[90] p-4'>
              <Skeleton className="h-8 w-36 rounded-md" />
              <Skeleton className="h-8 w-[18rem] rounded-md mt-10" />
              <Skeleton className="h-48 w-full rounded-md mt-4" />
              <Skeleton className="h-52 w-full rounded-md mt-4" />
            </div>
            }

            {problemInfo && <ProblemPageDescription problemInfo={problemInfo} />}
            <ProblemSideFooter />
          </ScrollArea>

        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className='rounded-md'>
          <ProblemPageCodeEditor theme={theme} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
