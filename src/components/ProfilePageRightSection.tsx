import React from 'react'
import ProfilePageLInearChart from './ProfilePageLInearChart'
import ProblemPageBarChart from './ProfilePageBarChart'
import { ArrowRight, ChevronRight, ClipboardList, FileText, MessageCircleMore, SquareCheckBig } from 'lucide-react'
import CustomContributorGraph from './CustomContributorGraph'
import { LevelWiseProblemType } from '@/app/(app)/problems/page'
import CustomRadialChart from './CustomRadialChart'
import { codeSubmissionResultType } from '@/types/ApiResponse'
import { IProblem } from '@/models/Problem'
import { timeAgoFunction } from '@/helpers/timeAgoFunction'
import Link from 'next/link'

export default function ProfilePageRightSection({ levelWiseSolvedQuestions, allQuestioinsLevelWise, allSubmissions }: { levelWiseSolvedQuestions: LevelWiseProblemType, allQuestioinsLevelWise: LevelWiseProblemType, allSubmissions: codeSubmissionResultType[] }) {
  console.log(allSubmissions)

  return (
    <div className="w-[60%] h-full rounded-lg flex flex-col gap-4">
      <div className="customBackground flex w-full h-60 rounded-md">
        <div className="w-1/2 h-full relative">
          <ProfilePageLInearChart />
        </div>
        <div className="border-l w-1/2 h-full">
          <ProblemPageBarChart />
        </div>
      </div>
      <div className="flex gap-4 w-full h-56">
        <div className="customBackground border w-1/2 h-full rounded-md">
          <div className="w-full h-full flex gap-3 p-2">
            <div className="w-[75%] h-full bg-[var(--popover)] rounded-md overflow-hidden relative">
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <CustomRadialChart totalLevelWiseProblem={allQuestioinsLevelWise} userTotalLevelProblem={levelWiseSolvedQuestions} />
              </div>
            </div>
            <div className="w-[25%] h-full flex flex-col gap-3">
              <div className="w-full h-[30%] bg-[var(--sidebar-accent)] rounded-md flex justify-center items-center flex-col font-semibold text-sm">
                <h3 className="text-green-500">Easy</h3>
                <h3 className="">{levelWiseSolvedQuestions.easy}/{allQuestioinsLevelWise.easy}</h3>
              </div>
              <div className="w-full h-[30%] bg-[var(--sidebar-accent)] rounded-md flex justify-center items-center flex-col font-semibold text-sm">
                <h3 className="text-yellow-500">Med.</h3>
                <h3 className="">{levelWiseSolvedQuestions.medium}/{allQuestioinsLevelWise.medium}</h3>
              </div>
              <div className="w-full h-[30%] bg-[var(--sidebar-accent)] rounded-md flex justify-center items-center flex-col font-semibold text-sm">
                <h3 className="text-red-500">Hard</h3>
                <h3 className="">{levelWiseSolvedQuestions.hard}/{allQuestioinsLevelWise.hard}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="customBackground border w-1/2 h-full rounded-md py-3 px-4">
          <div className="flex w-full justify-between">
            <div className="">
              <p className='text-gray-400'>Badges</p>
              <h2 className="text-2xl font-semibold">3</h2>
            </div>
            <ArrowRight className='text-gray-400' />
          </div>
          <div className="w-full h-24 flex gap-3 justify-center items-center">
            <img src="/badge1.png" alt="" className="w-20 h-20" />
            <img src="/badge2.png" alt="" className="w-22 h-22" />
            <img src="/badge3.png" alt="" className="w-22 h-20" />
          </div>
          <div className="">
            <p className="text-gray-400 text-sm">Most rescent badges</p>
            <h2 className='font-semibold text-lg'>50 Days badges 2025</h2>
          </div>
        </div>
      </div>
      <div className="customBackground flex w-full h-60 rounded-md py-4">
        <CustomContributorGraph />
      </div>
      <div className="customBackground flex flex-col w-full h-[34.5rem] rounded-md">
        <div className="w-full h-20 flex justify-between items-center gap-3 px-4">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="flex items-center gap-3 px-6 py-3 rounded cursor-pointer bg-[var(--sidebar-accent)]">
              <ClipboardList className='resize-custom w-5' />
              Recent AC
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded text-gray-300 cursor-pointer">
              <FileText className='resize-custom w-5' />
              List
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded text-gray-300 cursor-pointer">
              <SquareCheckBig className='resize-custom w-5' />
              Solutions
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded text-gray-300 cursor-pointer">
              <MessageCircleMore className='resize-custom w-5' />
              Discus
            </div>
          </div>
          <div className="flex gap-1 items-center text-gray-300 cursor-pointer">
            <Link href={`/all-submissions/${allSubmissions[0]?.userId}`}>
              <h3 className="">View all solutions</h3>
            </Link>
            <ChevronRight className='resize-custom w-5' />
          </div>
        </div>

        <div className="w-full h-[calc(100%-5rem)] px-4 mt-2">
          {[...allSubmissions].reverse().slice(0, 8).map((ele, index) =>
            <Link href={`/submission/${ele._id}`} key={index}>
            <div className={`w-full flex items-center justify-between px-4 py-4 rounded cursor-pointer ${index % 2 == 0 ? 'bg-[var(--sidebar-accent)]' : ''}`}>
              <h2 className="font-semibold">{(ele.problemId as IProblem).title}</h2>
              <p className="text-gray-500 text-sm font-semibold">{timeAgoFunction(ele.createdAt as Date)}</p>
            </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
