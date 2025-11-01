import { ISolution } from '@/models/Solution';
import axios, { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Eye, MessageCircle, Search, ThumbsUp } from 'lucide-react';
import { IUser } from '@/models/User';
import { ScrollArea } from './ui/scroll-area';
import ProblemPageSolutionShow from './ProblemPageSolutionShow';

export default function ProblemPageSoluction({ problemId }: { problemId: string }) {
  const [allSolutions, setAllSolutions] = useState<ISolution[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSolution, setSelectedSolution] = useState<ISolution | null>(null);
  const [isSolutionTapOpen, setIsSolutionTabOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllSolutions = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/solution/get-solutions?problemId=${problemId}`);

        setAllSolutions(res.data.solutions);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "Something went wrong while fetching solutions");
          console.log("Problem fetching submissions: ", error.response.data.message);
        } else {
          toast.error("Error while fetching all solutions");
          console.log("Error while fetching all solutions: ", error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllSolutions()
  }, []);

  const handleSolutionTabOpen = (ele: ISolution) => {
    if (!ele) return;
    setSelectedSolution(ele);
    setIsSolutionTabOpen(true);
  }

  return (
    <div style={{ background: "var(--card)" }} className='w-full min-h-[calc(100vh-6.5rem)] flex flex-col pb-12 relative'>
      {(!isLoading && allSolutions.length === 0) &&
        <div className="w-full min-h-[calc(100vh-7.5rem)] flex items-center justify-center">
          <h2 className="text-lg text-center w-[80%] text-gray-500">Zero solutions shared! You have the chance to write history. Share your solution and become <span className='text-green-500 font-semibold'> Solution #1</span>.</h2>
        </div>
      }
      {(!isLoading && allSolutions.length > 0) &&
        <div className="relative overflow-hidden">
          <div className="w-full flex items-center border px-2 mb-4">
            <Search className='resize-custom w-5 text-gray-500' />
            <Input placeholder='Search' className='customTransparent border-none focus-visible:ring-[0px] text-sm' />
          </div>
          <ScrollArea className="px-4 h-[calc(100vh-13rem)]">
            {allSolutions.map((ele, index) =>
              <div key={index} onClick={() => handleSolutionTabOpen(ele)} className="flex gap-3 mb-4 cursor-pointer">
                <div className="left w-7 h-7 rounded-full bg-amber-200 overflow-hidden">
                  <img src={(ele.userId as IUser).avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="right w-[calc(100%-2rem)] border-b-2 pb-4">
                  <h1 className="text-gray-400 text-sm font-semibold">{(ele.userId as IUser).username}</h1>
                  <h1 className="font-semibold w-[90%] truncate">{ele.title}</h1>
                  <div className="flex gap-2 mb-3 pt-1.5">
                    {ele.tags.map((tag, tagIdx) =>
                      <div key={tagIdx} className="px-3 rounded-full bg-[var(--sidebar-accent)] text-sm">{tag}</div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2 text-sm items-center text-gray-500"><ThumbsUp className='resize-custom w-4' /> {Math.floor(Math.random() * (999 - 100 + 1)) + 100}</div>
                    <div className="flex gap-2 text-sm items-center text-gray-500"><Eye className='resize-custom w-4' /> {((Math.random() * (99 - 10 + 1)) + 10).toFixed(1)}k</div>
                    <div className="flex gap-2 text-sm items-center text-gray-500"><MessageCircle className='resize-custom w-4' /> {Math.floor(Math.random() * (99 - 10 + 1)) + 10}</div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          <div style={{ background: "var(--card)" }} className={`absolute left-0 w-full min-h-screen text-white transition-all duration-400 ${isSolutionTapOpen ? 'top-0' : 'top-[100%]'}`}>
            <ProblemPageSolutionShow setSelectedSolution={setSelectedSolution} setIsSolutionTabOpen={setIsSolutionTabOpen} selectedSolution={selectedSolution} />
          </div>
        </div>
      }
    </div>
  )
}
