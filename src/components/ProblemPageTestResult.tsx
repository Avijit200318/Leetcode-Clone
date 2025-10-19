"use client"
import { codeSubmissionResultType, Judge0SubmissionResult } from '@/types/ApiResponse'
import { CircleCheckBig, Clock4, Info, Sparkles, SquarePen, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { IProblem } from '@/models/Problem'
import { Skeleton } from './ui/skeleton'
import { Session } from 'next-auth'
import CustomBarChart from './CustomBarChart'
import { formatDate } from '@/helpers/formatDate'
import MDEditor from '@uiw/react-md-editor';

interface ProblemPageTestResultType {
    codeOutput: Judge0SubmissionResult[] | null,
    isCodeRunning: boolean, theme: string | undefined,
    problemInfo: IProblem,
    session: Session | null,
    submissionOutput: codeSubmissionResultType | null,
    setSubmissionOutput: React.Dispatch<React.SetStateAction<codeSubmissionResultType | null>> 
}

export default function ProblemPageTestResult({ codeOutput, isCodeRunning, theme, problemInfo, session, submissionOutput, setSubmissionOutput }: ProblemPageTestResultType) {
    const [viewTestCase, setViewTestCase] = useState<number>(0);
    const [inputValues, setInputValues] = useState<string[]>([]);
    const [outputValues, setOutputValues] = useState<string[]>([]);
    const [isAccepted, setIsAccepted] = useState<boolean>(true);

    useEffect(() => {
        const setInputAndOutputValues = () => {
            const inputArray = problemInfo.testCases[viewTestCase].input.split("\n");
            setInputValues(inputArray);
            const outputArray = problemInfo.testCases[viewTestCase].output.split("\n");
            setOutputValues(outputArray);
        }
        setInputAndOutputValues();
    }, [viewTestCase]);

    useEffect(() => {
        const checkIsAllTestCasePass = () => {
            if (!codeOutput) return;

            for (let i = 0; i < codeOutput.length; i++) {
                if (codeOutput[i].status.description !== "Accepted") {
                    setIsAccepted(false);
                    setViewTestCase(i);
                    return;
                }
            }
        }
        checkIsAllTestCasePass();
    }, [codeOutput]);

    const handleSubmissionClose = () => {
        setSubmissionOutput(null);
    }

    return (
        <div style={{ background: "var(--card)" }} className='w-full min-h-[calc(100vh-6.5rem)] flex flex-col p-4 pb-12 relative'>
            {(!codeOutput && !isCodeRunning) && <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                <h2 className='text-lg'>You must run your code first</h2>
            </div>}
            {isCodeRunning &&
                <div className="absolute w-full h-[calc(100vh-6.5rem)] top-0 left-0 px-4 py-2">
                    <Skeleton className="w-[18rem] h-10 rounded-sm" />
                    <Skeleton className="w-[20rem] h-12 rounded-md mt-5" />
                    <Skeleton className="w-full h-24 rounded-md mt-5" />
                    <Skeleton className="w-full h-16 rounded-md mt-2" />
                    <Skeleton className="w-full h-24 rounded-md mt-2" />
                    <Skeleton className="w-full h-24 rounded-md mt-2" />
                </div>
            }
            {(codeOutput && !isCodeRunning) &&
                <div className="">
                    <div className="flex gap-4 items-center">
                        {isAccepted ?
                            <h1 className='text-2xl font-semibold text-green-500'>Accepted</h1> :
                            <h1 className='text-2xl font-semibold text-red-500'>Wrong Answer</h1>
                        }
                        <h2 className={`${theme === "dark" ? 'text-neutral-400' : ''}`}>Runtime: 0 ms</h2>
                    </div>
                    <div className="flex gap-4 my-6">
                        {codeOutput.map((ele, index) =>
                            <Button key={index} onClick={() => setViewTestCase(index)} variant="secondary" className={`flex items-center gap-2 px-8 py-2  cursor-pointer font-semibold ${viewTestCase === index ? '' : 'opacity-60'} ${ele.status.description === "Accepted" ? 'text-green-500' : 'text-red-400'}`}><CircleCheckBig className='resize-custom w-4' /> Case{index + 1}</Button>
                        )}
                    </div>
                    <div className="">
                        <h2 className={`mb-2 font-semibold ${theme === "dark" ? 'text-neutral-400' : ''}`}>Input</h2>
                        {inputValues.map((value, index) =>
                            <div key={index} className="w-full h-16 bg-[var(--sidebar-accent)] mb-2 p-4 rounded-md font-semibold">{value}</div>
                        )}
                        <h2 className={`mb-2 font-semibold ${theme === "dark" ? 'text-neutral-400' : ''}`}>Output</h2>
                        {codeOutput[viewTestCase].stdout?.trim().split("\n").map((value, index) =>
                            <div key={index} className="w-full h-16 bg-[var(--sidebar-accent)] mb-2 p-4 rounded-md font-semibold">{value}</div>
                        )}
                        <h2 className={`mb-2 font-semibold ${theme === "dark" ? 'text-neutral-400' : ''}`}>Expected</h2>
                        {outputValues.map((value, index) =>
                            <div key={index} className="w-full h-16 bg-[var(--sidebar-accent)] mb-2 p-4 rounded-md font-semibold">{value}</div>
                        )}
                    </div>
                </div>
            }

            {submissionOutput && <div style={{ background: "var(--card)" }} className="absolute w-full top-0 left-0  p-4 pb-10 transition-all duration-200">
                <div className="w-full flex justify-between items-end">
                    <div className="">
                        <div className="flex items-center gap-2 mb-3">
                            {submissionOutput.status === "Accepted" ?
                                <h2 className="text-xl font-semibold text-green-500">{submissionOutput.status}</h2> :
                                <h2 className="text-xl font-semibold text-red-500">{submissionOutput.status}</h2>
                            }
                            {submissionOutput.status === "Accepted" ?
                                <p className={`text-sm ${theme === "dark" ? 'text-neutral-400' : ''}`}>3 / 3 testcases passed</p> : <p className={`text-sm ${theme === "dark" ? 'text-neutral-400' : ''}`}>Some  testcases failed</p>
                            }
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={session?.user.avatar || " "} alt="" className="w-8 h-8 rounded-full bg-blue-200 object-contain" />
                            <h2 className="text-lg font-semibold">{session?.user.username}</h2>
                            <p className={`text-sm ${theme === "dark" ? 'text-neutral-400' : ''}`}>Submitted at {formatDate(submissionOutput.createdAt as Date)}</p>
                        </div>
                    </div>
                    {submissionOutput.status === "Accepted" ? <Button className='bg-green-500 text-white font-semibold cursor-pointer hover:bg-green-600 duration-300'><SquarePen className='resize-custom w-4 h-4' /> Solution</Button>:
                    <Button onClick={handleSubmissionClose} className='bg-red-500 text-white font-semibold  cursor-pointer hover:bg-red-600 duration-300'><X className='resize-custom w-5 h-5' /> Close</Button>
                }
                </div>
                <div className="w-1/2 p-4 rounded-md my-6 bg-[var(--sidebar-accent)] flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <h2 className={`flex gap-2 items-center ${submissionOutput.status === "Accepted"? '' : 'text-red-500'}`}><Clock4 className="resize-custom w-4 h-4" /> Runtime</h2>
                        <Info className={`resize-custom w-4 h-4 ${submissionOutput.status === "Accepted"? '' : 'text-red-500'}`} />
                    </div>
                    <h2 className={`text-xl ${submissionOutput.status === "Accepted"? '' : 'text-red-500'}`}>{ submissionOutput.status === "Accepted"? `${(submissionOutput.time * 1000).toFixed(2)} ms` : 'N/A'}</h2>
                    {submissionOutput.status === "Accepted" && 
                    <h2 className="flex items-center gap-2 text-blue-500"><Sparkles className='resize-custom w-4 h-4' /> Analyze complexity</h2>
                    }
                </div>

                {(submissionOutput && submissionOutput.status === "Accepted") && <div className="w-full h-[20rem] overflow-hidden">
                    <CustomBarChart />
                </div>}
                <div className={`flex items-center mt-6 mb-4 ${theme === "dark" ? 'text-neutral-400' : ''}`}>
                    <h2 className="font-semibold px-2 border-r-2">Code</h2>
                    <h2 className="font-semibold px-2">{submissionOutput.language}</h2>
                </div>
                <div className="w-full border rounded-md overflow-hidden mb-8">
                    <MDEditor.Markdown
                    source={`\`\`\`\n${submissionOutput.sourceCode}\n\`\`\``}
                    className="markdown-body w-full" style={{ background: "var(--card)"}}  />
                </div>
            </div>
            }
        </div>
    )
}
