import React from 'react'
import { BookText, ClockFading, FlaskConical } from 'lucide-react';

export default function ProblemPageNavigation() {
    return (
        <div className="nav flex gap-4 px-4 py-2">
            <button className="flex items-center gap-1 text-sm cursor-pointer border-r-2 pr-2"><BookText className='resize-custom w-4 text-blue-500' /> Description</button>
            <button className="flex items-center gap-1 text-sm cursor-pointer border-r-2 pr-2"><FlaskConical className='resize-custom w-4 text-blue-500' /> Solutions</button>
            <button className="flex items-center gap-1 text-sm cursor-pointer"><ClockFading className='resize-custom w-4 text-blue-500' /> Submissions</button>
        </div>
    )
}
