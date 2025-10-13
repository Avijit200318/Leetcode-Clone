import React from 'react'
import { BookText, ClockFading, FlaskConical, Terminal } from 'lucide-react';

export default function ProblemPageNavigation({currentTab, setCurrentTab}: {currentTab: string ,setCurrentTab: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className="nav flex gap-4 px-4 py-2">
            <button onClick={()=> setCurrentTab("description")} className={`flex items-center gap-1 text-sm cursor-pointer border-r-2 pr-2 ${currentTab === "description"? '' : 'opacity-60'}`}><BookText className='resize-custom w-4 text-blue-500' /> Description</button>
            <button onClick={()=> setCurrentTab("solutions")} className={`flex items-center gap-1 text-sm cursor-pointer border-r-2 pr-2 ${currentTab === "solutions"? '' : 'opacity-60'}`}><FlaskConical className='resize-custom w-4 text-blue-500' /> Solutions</button>
            <button onClick={()=> setCurrentTab("submissions")} className={`flex items-center gap-1 text-sm cursor-pointer border-r-2 pr-2 ${currentTab === "submissions"? '' : 'opacity-60'}`}><ClockFading className='resize-custom w-4 text-blue-500' /> Submissions</button>
            <button onClick={()=> setCurrentTab("testResult")} className={`flex items-center gap-1 text-sm cursor-pointer ${currentTab === "testResult"? '' : 'opacity-60'}`}><Terminal className='resize-custom w-4 text-green-500' /> Test Result</button>
        </div>
    )
}
