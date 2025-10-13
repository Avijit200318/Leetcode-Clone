"use client"
import { Judge0SubmissionResult } from '@/types/ApiResponse'
import { CircleCheckBig } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { IProblem } from '@/models/Problem'
import { Skeleton } from './ui/skeleton'

export default function ProblemPageTestResult({ codeOutput, isCodeRunning, theme, problemInfo, selectedLanguage }: { codeOutput: Judge0SubmissionResult[] | null, isCodeRunning: boolean, theme: string | undefined, problemInfo: IProblem, selectedLanguage: string }) {
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
    }, [codeOutput])

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
        </div>
    )
}
