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
import { ApiResponse, codeSubmissionResultType, Judge0SubmissionResult } from '@/types/ApiResponse';
import { IProblem } from '@/models/Problem.js';
import { Skeleton } from "@/components/ui/skeleton"
import ProblemPageDescription from '@/components/ProblemPageDescription';

import ProblemPageCodeEditor from '@/components/ProblemPageCodeEditor';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { CloudUpload, Loader2, Play, Sparkles } from 'lucide-react';

import { useSession } from 'next-auth/react';
import { codeRunValidation } from '@/schemas/codeRunSchema';
import ProblemPageSoluction from '@/components/ProblemPageSoluction';
import ProblemPageSubmission from '@/components/ProblemPageSubmission';
import ProblemPageTestResult from '@/components/ProblemPageTestResult';
import { codeSubmissionValidation } from '@/schemas/codeSubmissionSchema';
import ProblemPageAiTab from '@/components/ProblemPageAiTab';

export default function page() {
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = useParams();
  const { problemId } = pathname;
  const { theme } = useTheme()
  const { data: session, status } = useSession();
  const [problemInfo, setProblemInfo] = useState<IProblem | null>(null);

  const [sourceCode, setSourceCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<number>(54);
  const [isCodeRunning, setIsCodeRunning] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("description");
  const [codeOutput, setCodeOutput] = useState<Judge0SubmissionResult[] | null>(null);
  const [submissionOutput, setSubmissionOutput] = useState<codeSubmissionResultType | null>(null);

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

  const handleCodeRun = async () => {
    if (!problemInfo || !session) return;

    setIsCodeRunning(true);
    setCurrentTab("testResult");
    setCodeOutput(null);
    try {
      const data = {
        sourceCode: sourceCode,
        languageId: selectedLanguageCode,
        testCases: problemInfo.testCases
      }

      const parsedData = codeRunValidation.safeParse(data);
      if (!parsedData.success) {
        toast.error(parsedData.error.issues[0].message);
        console.log(parsedData.error.issues[0].message);
        return;
      }

      const res = await axios.post<ApiResponse>("/api/code/run-code", data);

      toast.success("Code run successfully");
      console.log("codeoutput: ", res.data.results);
      setCodeOutput(res.data.results ?? null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Code run error: ", error.response.data.message || "Check your code and try again");
        toast.error(error.response.data.message || "Check your code and try again");
      } else {
        console.log("Error while running the code", error);
        toast.error("Error while running the code");
      }
    } finally {
      setIsCodeRunning(false);
    }
  }

  const handleCodeSubmission = async () => {
    if(!problemInfo || !session) return;
    
    setIsSubmitLoading(true);
    try {
      const data = {
        userId: session?.user._id,
        language: selectedLanguage,
        problemId: problemInfo._id,
        sourceCode,
        languageId: selectedLanguageCode,
        testCases: problemInfo.testCases
      }

      const parsedData = codeSubmissionValidation.safeParse(data);
      if (!parsedData.success) {
        toast.error(parsedData.error.issues[0].message);
        console.log(parsedData.error.issues[0].message);
        return;
      }

      const res = await axios.post<ApiResponse>("/api/code/submit-code", data);
      toast.success("Code submitted successfully");
      console.log("Code submitted successfully: ", res.data.submissionOutput);
      setSubmissionOutput(res.data.submissionOutput?? null);
    } catch (error) {
      if(axios.isAxiosError(error) && error.response){
        toast.error(error.response.data.message);
        console.log("Code submission error: ", error.response.data.message);
      } else{
        toast.error("Error while submitting the code");
        console.log("Error while submitting the code ", error);
      }
    } finally{
      setIsSubmitLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-[calc(100vh-3rem)] px-3 py-2">
      <div className="w-full flex justify-center items-center absolute top-1.5 left-0">
        <div className="flex gap-1">
          <Button onClick={handleCodeRun} disabled={(session?.user ? false : true) || isCodeRunning} variant="secondary" className='cursor-pointer relative z-40'>{isCodeRunning ? <Loader2 className='resize-custom w-5 animate-spin' /> : <Play />}</Button>
          <Button disabled={session?.user ? false : true} onClick={handleCodeSubmission} variant="secondary" className='w-30 cursor-pointer relative z-40 text-base flex items-center gap-2 font-semibold'>
            {isSubmitLoading ? <><Loader2 className='resize-custom w-5 animate-spin' />Running</> : <><CloudUpload className='resize-custom w-5' /> Submit</>}
          </Button>
          <Button onClick={()=> setCurrentTab("chatBot")} disabled={session?.user ? false : true} variant="secondary" className='cursor-pointer relative z-40'><Sparkles /></Button>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="w-full gap-1">
        <ResizablePanel defaultSize={50} minSize={31} className='rounded-md bg-[var(--sidebar-accent)] border'>
          <ProblemPageNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <ScrollArea className='relative w-full h-[calc(100vh-3.5rem-3rem)]'>
            {!problemInfo && <div style={{ background: "var(--card)" }} className='absolute left-0 top-0 w-full h-full z-[90] p-4'>
              <Skeleton className="h-8 w-36 rounded-md" />
              <Skeleton className="h-8 w-[18rem] rounded-md mt-10" />
              <Skeleton className="h-48 w-full rounded-md mt-4" />
              <Skeleton className="h-52 w-full rounded-md mt-4" />
            </div>
            }

            {(problemInfo && currentTab === "description") && <ProblemPageDescription problemInfo={problemInfo} />}
            {(problemInfo && currentTab === "solutions") && <ProblemPageSoluction />}
            {(problemInfo && currentTab === "submissions") && <ProblemPageSubmission theme={theme} problemInfo={problemInfo} setCurrentTab={setCurrentTab} setSubmissionOutput={setSubmissionOutput} />}
            {(problemInfo && currentTab === "testResult") && <ProblemPageTestResult codeOutput={codeOutput} isCodeRunning={isCodeRunning} theme={theme} problemInfo={problemInfo} session={session} submissionOutput={submissionOutput} setSubmissionOutput={setSubmissionOutput} />}
            {(problemInfo && currentTab === "chatBot") && <ProblemPageAiTab sourceCode={sourceCode} theme={theme} />}
            <ProblemSideFooter />
          </ScrollArea>

        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={30} className='rounded-md'>
          <ProblemPageCodeEditor theme={theme} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} setSelectedLanguageCode={setSelectedLanguageCode} sourceCode={sourceCode} setSourceCode={setSourceCode} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
