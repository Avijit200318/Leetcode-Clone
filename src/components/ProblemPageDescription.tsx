import React from 'react'
import { IProblem } from '@/models/Problem'
import MDEditor from '@uiw/react-md-editor';
import { Lock, Tag } from 'lucide-react';
import ProblemPageCollapseButton from './ProblemPageCollapseButton';
import { useTheme } from 'next-themes';

export default function ProblemPageDescription({ problemInfo }: { problemInfo: IProblem }) {
    const { theme } = useTheme();

    const problemColors = {
        "Easy": "text-green-500",
        "Medium": "text-yellow-400",
        "Hard": "text-red-500"
    }

    // this is the type of problemColors object
    type problemColorsType = keyof typeof problemColors;

    return (
        <div style={{ background: "var(--card)" }} className="w-full h-full flex flex-col p-4 pb-12">
            <h1 className="text-2xl font-bold">{problemInfo.title}</h1>
            <div className="w-full flex gap-2 mt-10">
                <div className={`text-sm px-2.5 py-1 rounded-full bg-[var(--sidebar-accent)] ${problemColors[problemInfo.level as problemColorsType]}`}>{problemInfo.level}</div>
                <div className="flex gap-1 items-center text-sm px-2.5 py-1 rounded-full bg-[var(--sidebar-accent)]"><Tag className='resize-custom w-4' /> Topics</div>
                <div className="flex gap-1 items-center text-sm px-2.5 py-1 rounded-full bg-[var(--sidebar-accent)] text-orange-400"><Lock className='resize-custom w-4' /> Companies</div>
            </div>
            <div className="text w-full mt-4 ">
                <MDEditor.Markdown source={(problemInfo.description + problemInfo.examples + problemInfo.constraints)} className="markdown-body w-full" style={{ background: "var(--card)" }} />
            </div>

            <ProblemPageCollapseButton problemInfo={problemInfo} />
            <p className={`${theme === "dark" ? 'text-neutral-400' : ''} text-xs font-semibold mt-8`}>Copyright © {new Date().getFullYear()} LeetCode-Clone (Next JS Project Created by Avijit). All rights reserved.</p>
        </div>
    )
}
