"use client";
import CustomBarChart from '@/components/CustomBarChart';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/helpers/formatDate';
import { IProblem } from '@/models/Problem';
import { ApiResponse, codeSubmissionResultType } from '@/types/ApiResponse';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { Clock4, Info, Sparkles, SquarePen } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {
  const { data: session, status } = useSession();
  const [submissionOutput, setSubmissionOutput] = useState<codeSubmissionResultType | null>(null);
  const { submissionId } = useParams();
  console.log(submissionId)
  console.log(submissionOutput)

  const fetchSubmission = useCallback(async () => {
    if (!submissionId) return;
    try {
      const res = await axios.get<ApiResponse>(`/api/code/fetch-submission?submissionId=${submissionId}`);

      setSubmissionOutput(res.data.submissionOutput || null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Problem while fetching submission")
        console.log("Problem while fetching submission: ", error.response);
      } else {
        toast.error("Error while fetching the submission");
        console.log("Error while fetching the submission: ", error);
      }
    }
  }, [submissionId, setSubmissionOutput]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  return (
    <div className='w-full flex flex-col items-center pb-8'>
      {submissionOutput &&
        <h1 className='text-2xl mt-4 mb-8 font-semibold w-[60%]'>{(submissionOutput.problemId as IProblem).title}</h1>
      }
      {submissionOutput &&
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-[60%] flex justify-between mb-4">
            <div className="">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xl font-semibold text-green-500">Accepted</h2>
                <p className="text-sm dark:text-neutral-400">3 / 3 testcases passed</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={session?.user.avatar || " "} alt="" className="w-8 h-8 rounded-full bg-blue-200 object-contain" />
                <h2 className="text-lg font-semibold">{session?.user.username || "Avijit"}</h2>
                <p className="text-sm dark:'text-neutral-400">Submitted at {formatDate(submissionOutput.createdAt as Date)}</p>
              </div>
            </div>
            <Link href={`/add-solution?id=${submissionId}`}>
            <Button className='bg-green-500 text-white font-semibold cursor-pointer hover:bg-green-600 duration-300'><SquarePen className='resize-custom w-4 h-4' /> Solution</Button>
            </Link>
          </div>
          <div className="w-[60%] border p-4 rounded-lg">
            <div className="w-1/2 p-4 rounded-md mt-3 bg-[var(--sidebar-accent)] flex flex-col gap-2">
              <div className="w-full flex items-center justify-between">
                <h2 className={`flex gap-2 items-center ${submissionOutput.status === "Accepted" ? '' : 'text-red-500'}`}><Clock4 className="resize-custom w-4 h-4" /> Runtime</h2>
                <Info className={`resize-custom w-4 h-4 ${submissionOutput.status === "Accepted" ? '' : 'text-red-500'}`} />
              </div>
              <h2 className={`text-xl ${submissionOutput.status === "Accepted" ? '' : 'text-red-500'}`}>{submissionOutput.status === "Accepted" ? `${(submissionOutput.time * 1000).toFixed(2)} ms` : 'N/A'}</h2>
              {submissionOutput.status === "Accepted" &&
                <h2 className="flex items-center gap-2 text-blue-500"><Sparkles className='resize-custom w-4 h-4' /> Analyze complexity</h2>
              }
            </div>
            <div className="w-full h-[20rem] overflow-hidden mt-4">
              <CustomBarChart session={session} labelValue={submissionOutput.time} />
            </div>
          </div>
          <div className="w-[60%]">
            <h1 className='dark:text-gray-400 my-4 font-semibold'>Code | {submissionOutput.language}</h1>
            <div className="w-full border rounded-md overflow-hidden mb-8">
              <MDEditor.Markdown
                source={`\`\`\`\n${submissionOutput.sourceCode}\n\`\`\``}
                className="markdown-body customTextWhite w-full" style={{ background: "var(--card)" }} />
            </div>
            <div className="w-full h-64 customBackground rounded-md py-3">
              <textarea className='w-full h-[90%] resize-none px-3 outline-none' placeholder='Write your notes here'></textarea>
              <div className="w-full h-[10%] border-t flex justify-between px-3 py-1">
                <h3 className='dark:text-gray-400 text-sm'>Select related tags</h3>
                <h3 className='dark:text-gray-400 text-sm'>0/5</h3>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
