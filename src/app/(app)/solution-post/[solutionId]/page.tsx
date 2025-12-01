"use client";
import DiscussPageSideBox from '@/components/DiscussPageSideBox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/helpers/formatDate';
import { ISolution } from '@/models/Solution';
import { IUser } from '@/models/User'
import { ApiResponse } from '@/types/ApiResponse';
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios';
import {Calendar, Eye} from 'lucide-react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {
    const [solution, setSolution] = useState<ISolution | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { solutionId } = useParams()

    const fetchSolution = useCallback(async () => {
        if (!solutionId) return;
        setIsLoading(true)
        try {
            const res = await axios.get<ApiResponse>(`/api/solution/fetch-solution/${solutionId}`);

            setSolution(res.data.solution || null)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || "Problem while fetching solution");
                console.log("Problem while fetching solution: ", error.response.data.message);
            } else {
                toast.error("Error while fetching solution");
                console.log("Error while fetching solution: ", error);
            }
        } finally {
            setIsLoading(false)
        }
    }, [solutionId, setSolution]);

    useEffect(() => {
        fetchSolution()
    }, [fetchSolution])

    return (
        <div className='w-full h-[calc(100vh-5rem)] flex'>
            <ScrollArea className='w-full h-full'>
                {isLoading && <div className="px-12 pb-4 mt-4">
                    <Skeleton className="w-[70%] h-8 mb-4"></Skeleton>
                    <div className="flex gap-2 items-center">
                        <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
                        <Skeleton className="w-36 h-6"></Skeleton>
                    </div>
                    <Skeleton className="w-52 h-8 mt-4"></Skeleton>
                    <Skeleton className="w-[90%] h-52 mt-4"></Skeleton>
                    <Skeleton className="w-[90%] h-52 mt-4"></Skeleton>
                </div>}
                {!isLoading && solution && <div className="px-12 pb-4 mt-4">
                    <h1 className="text-2xl font-semibold mb-6 line-clamp-2">{solution?.title}</h1>
                    <Link href={`/dashboard/${solution.userId._id}`}>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-200 overflow-hidden">
                                {solution &&
                                    <img src={(solution?.userId as IUser)?.avatar} alt="" className="w-full h-full object-cover" />
                                }
                            </div>
                            <div className="">
                                <h2 className="">{(solution?.userId as IUser)?.username}</h2>
                                <div className="flex gap-3 text-gray-500">
                                    <div className="flex gap-2 text-sm">
                                        <Eye className='resize-custom w-4' />
                                        22095
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                        <Calendar className='resize-custom w-4' />
                                        {solution && formatDate(solution.createdAt as Date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 my-4">
                        {solution && solution.tags.map((tag, index) =>
                            <div key={index} className="px-3 rounded-full bg-[var(--sidebar-accent)]">{tag}</div>
                        )}
                    </div>

                    <MDEditor.Markdown source={solution?.explanation} className='markdown-body customTransparent customTextWhite min-h-full py-4 px-2 mt-8' />
                </div>}
            </ScrollArea>
            <DiscussPageSideBox />
        </div>
    )
}
