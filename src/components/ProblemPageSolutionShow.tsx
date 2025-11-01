"use client";
import { formatDate } from '@/helpers/formatDate';
import { ISolution } from '@/models/Solution';
import { IUser } from '@/models/User';
import MDEditor from '@uiw/react-md-editor';
import { ArrowLeft, Calendar, Eye, Link, Table2 } from 'lucide-react'
import React from 'react'
import { ScrollArea } from './ui/scroll-area';

interface ProblemPageSolutionShowType {
    setSelectedSolution: React.Dispatch<React.SetStateAction<ISolution | null>>,
    setIsSolutionTabOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedSolution: ISolution | null
}

export default function ProblemPageSolutionShow({ setSelectedSolution, setIsSolutionTabOpen, selectedSolution }: ProblemPageSolutionShowType) {

    const handleSolutionTabClose = () => {
        setSelectedSolution(null);
        setIsSolutionTabOpen(false);
    }

    return (
        <ScrollArea className='w-full h-[calc(100vh-8.5rem)]'>
            <div className="flex justify-between border py-2 px-4">
                <div onClick={handleSolutionTabClose} className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <ArrowLeft />
                    <h4 className="">All Solutions</h4>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <Link className='resize-custom w-5' />
                    <Table2 className='resize-custom w-5' />
                </div>
            </div>
            <div className="px-4 pb-4">
                <h1 className="text-2xl font-semibold mb-6 line-clamp-2">{selectedSolution?.title}</h1>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-200 overflow-hidden">
                        {selectedSolution &&
                            <img src={(selectedSolution?.userId as IUser)?.avatar} alt="" className="w-full h-full object-cover" />
                        }
                    </div>
                    <div className="">
                        <h2 className="">{(selectedSolution?.userId as IUser)?.username}</h2>
                        <div className="flex gap-3 text-gray-500">
                            <div className="flex gap-2 text-sm">
                                <Eye className='resize-custom w-4' />
                                22095
                            </div>
                            <div className="flex gap-2 text-sm">
                                <Calendar className='resize-custom w-4' />
                                {selectedSolution && formatDate(selectedSolution.createdAt as Date)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 my-4">
                    {selectedSolution && selectedSolution.tags.map((tag, index) => 
                    <div key={index} className="px-3 rounded-full bg-[var(--sidebar-accent)]">{tag}</div>
                    )}
                </div>

                <MDEditor.Markdown source={selectedSolution?.explanation}  className='markdown-body customTransparent customTextWhite min-h-full py-4 px-2 mt-8' />
            </div>
        </ScrollArea>
    )
}
