"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronRight, Lock, Logs, Tag } from 'lucide-react'
import React, { useState } from 'react'

export default function ProblemPageCollapseButton() {
    const [openTages, setOpenTags] = useState<boolean>(false);
      const [openCompanies, setOpenCompanies] = useState<boolean>(false);
      const [openSimilarQeustions, setOpenSimilarQuestions] = useState<boolean>(false);

    return (
        <div className="mt-8">
            <Collapsible open={openTages} onOpenChange={setOpenTags} className='w-full px-2 py-3 border-t-2 border-b-2 cursor-pointer'>
                <CollapsibleTrigger className='flex items-center justify-between w-full h-full cursor-pointer'>
                    <div className="flex items-center gap-2">
                        <Tag className='resize-custom w-4' />
                        <h3>Topics</h3>
                    </div>
                    <ChevronRight className={`${openTages ? 'rotate-90' : ''} transition-all duration-400`} />
                </CollapsibleTrigger>
                <CollapsibleContent className='flex gap-4 items-center mt-4'>
                    <div className="py-0.5 px-3 bg-[var(--sidebar-accent)] rounded-full text-sm">Array</div>
                    <div className="py-0.5 px-3 bg-[var(--sidebar-accent)] rounded-full text-sm">Hash Table</div>
                </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCompanies} onOpenChange={setOpenCompanies} className='w-full px-2 py-3 border-b-2  cursor-pointer'>
                <CollapsibleTrigger className='flex items-center justify-between w-full h-full cursor-pointer'>
                    <div className="flex items-center gap-2">
                        <Lock className='resize-custom w-4' />
                        <h3>Companies</h3>
                    </div>
                    <ChevronRight className={`${openCompanies ? 'rotate-90' : ''} transition-all duration-400`} />
                </CollapsibleTrigger>
                <CollapsibleContent className='flex gap-4 items-center mt-4'>
                    <div className="py-0.5 px-3 bg-[var(--sidebar-accent)] rounded-full text-sm">Google</div>
                    <div className="py-0.5 px-3 bg-[var(--sidebar-accent)] rounded-full text-sm">Amazon</div>
                </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openSimilarQeustions} onOpenChange={setOpenSimilarQuestions} className='w-full px-2 py-3 border-b-2 cursor-pointer'>
                <CollapsibleTrigger className='flex items-center justify-between w-full h-full cursor-pointer'>
                    <div className="flex items-center gap-2">
                        <Logs className='resize-custom w-4' />
                        <h3>Similar Questions</h3>
                    </div>
                    <ChevronRight className={`${openSimilarQeustions ? 'rotate-90' : ''} transition-all duration-400`} />
                </CollapsibleTrigger>
                <CollapsibleContent className='flex flex-col gap-1 items-center mt-8'>
                    <div className="w-full h-8 flex items-center justify-between px-4 cursor-pointer hover:bg-[var(--sidebar-accent)]">
                        <h2 className=''>Two Sum</h2>
                        <h2 className='text-sm font-semibold text-yellow-400'>Medium</h2>
                    </div>
                    <div className="w-full h-8 flex items-center justify-between px-4 cursor-pointer hover:bg-[var(--sidebar-accent)]">
                        <h2 className=''>Three Sum</h2>
                        <h2 className='text-sm font-semibold text-yellow-400'>Medium</h2>
                    </div>
                    <div className="w-full h-8 flex items-center justify-between px-4 cursor-pointer hover:bg-[var(--sidebar-accent)]">
                        <h2 className=''>Four Sum</h2>
                        <h2 className='text-sm font-semibold text-yellow-400'>Medium</h2>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
