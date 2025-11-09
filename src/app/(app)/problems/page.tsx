"use client";
import CustomRadialChart from '@/components/CustomRadialChart';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDownUp, Barcode, Check, ExternalLink, Funnel, GitFork, GraduationCap, LibraryBig, Play, Plus, RotateCcw, Search, Shuffle, Star } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IProblem } from '@/models/Problem';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { IUser } from '@/models/User';
import { Skeleton } from '@/components/ui/skeleton';
import { levelWiseProblemSeperate } from '@/helpers/levelWiseProblemSeparate';
import { ObjectId } from 'mongoose';

export interface LevelWiseProblemType {
  easy: number,
  medium: number,
  hard: number
}

export default function page() {
  const [allProblems, setAllProblems] = useState<IProblem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(false);
  const [fullUserInfo, setFullUserInfo] = useState<IUser | null>(null);
  const { data: session, status } = useSession();
  const [totalLevelWiseProblem, setTotalLevelWiseProblem] = useState<LevelWiseProblemType>({
    easy: 0,
    medium: 0,
    hard: 0
  })
  const [userTotalLevelProblem, setUserEachLevelProblem] = useState<LevelWiseProblemType>({
    easy: 0,
    medium: 0,
    hard: 0
  })
  const [filteredProblems, setFilteredProblems] = useState<IProblem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const problemColors = {
    "Easy": "text-green-500",
    "Medium": "text-yellow-400",
    "Hard": "text-red-500"
  }

  type problemColorsType = keyof typeof problemColors;

  useEffect(() => {
    const fetchAllProblems = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<ApiResponse>("/api/problem/all-problems");

        setAllProblems(res.data.allProblems || []);
        setFilteredProblems(res.data.allProblems || []);
        if (!res.data.success) return;
        const data = levelWiseProblemSeperate(res.data.allProblems as IProblem[]);
        setTotalLevelWiseProblem({
          easy: data.e, medium: data.m, hard: data.h
        })

      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Problem fetching route error: ", error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          console.error("Error while fetching problem: ", error);
          toast.error("Error while fetch Problems");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProblems();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoadingUserInfo(true);
      if (!session) return;

      try {
        const res = await axios.get<ApiResponse>(`/api/user/get-user?userId=${session?.user._id}`);

        setFullUserInfo(res.data.user || null);

        if (!res.data.success) return;
        const data = levelWiseProblemSeperate(res.data.user?.solvedQuestions as IProblem[]);

        setUserEachLevelProblem({
          easy: data.e, medium: data.m, hard: data.h
        });

      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Problem while fetching user info: ", error.response.data.message);
          toast.error(error.response.data.message || "Problem while fetching user info");
        } else {
          console.error("Error while fetching user info: ", error);
          toast.error("Error while fetching user info");
        }
      } finally {
        setLoadingUserInfo(false);
      }
    }

    fetchUserInfo();
  }, [session]);

  const checkIsProblemSolvedOrnot = (problemId: string): boolean => {
    if (!fullUserInfo) return false;
    for (let i = 0; i < fullUserInfo.solvedQuestions.length; i++) {
      if ((fullUserInfo.solvedQuestions[i]._id as string | ObjectId).toString() === problemId) return true;
    }
    return false;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      setFilteredProblems(allProblems);
      return;
    }

    const filtered = allProblems.filter(problem =>
      problem.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  const handleFilterBtn = (level: string) => {
    const temp = filter === level ? "" : level;
    setFilter(temp);

    if (!temp) {
      setFilteredProblems(allProblems);
    } else {
      const filtered = allProblems.filter((problem) =>
        problem.level === temp
      )
      setFilteredProblems(filtered);
    }
  }

  const handleReverseArray = () => {
    let temp = [];
    for (let i = filteredProblems.length - 1; i >= 0; i--) {
      temp.push(filteredProblems[i]);
    }
    setFilteredProblems(temp);
  }

  return (
    <div className='w-full h-[calc(100vh-3rem)] flex'>
      <div className="w-[15%] h-full py-6 px-4 border-r-4">
        <div className="w-full p-2 rounded mb-3 flex items-center gap-4 hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer"><LibraryBig className='resize-custom w-6' /> Library</div>
        <div className="w-full p-2 rounded mb-3 flex items-center gap-4 hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer"><GraduationCap className='resize-custom w-6' /> Study Plan</div>
        <div className='w-full border-2 mb-4 mt-8'></div>
        <div className="w-full p-2 rounded mb-3 flex items-center justify-between hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer text-gray-500">My List <Plus className='resize-custom w-6 text-gray-500' /></div>
        <div className="w-full p-2 rounded mb-3 flex items-center gap-4 hover:bg-[var(--sidebar-accent)] transition-all duration-300 cursor-pointer"><Star className='resize-custom w-5' /> Favorite</div>
      </div>
      <div className="w-[35%] h-full py-4 px-12">
        <div className="w-full h-full bg-[var(--sidebar-accent)] rounded-md p-6 flex flex-col gap-2">
          <img src="/problem page logo.png" alt="" className="w-22 rounded-md" />
          <h2 className="text-2xl font-semibold">All Problems</h2>
          <p className="text-gray-500 text-sm mb-2">LeetCode- {allProblems.length} questioins - {fullUserInfo?.solvedQuestions.length || 0} solved</p>
          <div className="flex items-center gap-3 mb-2">
            <Button className='rounded-full font-semibold w-32 text-base flex items-center h-10 cursor-pointer'><Play className='resize-custom w-5' /> Practice</Button>
            <Button variant="outline" className='rounded-full w-10 h-10 cursor-pointer'><Star className='resize-custom w-5 text-gray-400' /></Button>
            <Button variant="outline" className='rounded-full w-10 h-10 cursor-pointer'><ExternalLink className='resize-custom w-5 text-gray-400' /></Button>
            <Button variant="outline" className='rounded-full w-10 h-10 cursor-pointer'><GitFork className='text-gray-400' /></Button>
          </div>
          <p className="text-gray-500 text-sm border-b-2 pb-4">Updated 15 days ago</p>
          <div className="w-full flex items-center justify-between">
            <h2 className="font-semibold mb-4">Progress</h2>
            <RotateCcw className='resize-custom w-5 text-gray-400' />
          </div>
          <div className="w-full h-60 flex gap-2">
            <div className="w-[70%] h-full bg-[var(--popover)] rounded-md overflow-hidden">
              {(!loadingUserInfo && !isLoading) && <CustomRadialChart totalLevelWiseProblem={totalLevelWiseProblem} userTotalLevelProblem={userTotalLevelProblem} />}
            </div>
            <div className="w-[30%] h-full flex flex-col gap-2">
              <div className="w-full h-[33.3%] bg-[var(--popover)] rounded-md flex justify-center items-center flex-col font-semibold">
                <h3 className="text-green-500">Easy</h3>
                <h3 className="">{userTotalLevelProblem.easy}/{totalLevelWiseProblem.easy}</h3>
              </div>
              <div className="w-full h-[33.3%] bg-[var(--popover)] rounded-md flex justify-center items-center flex-col font-semibold">
                <h3 className="text-yellow-500">Med.</h3>
                <h3 className="">{userTotalLevelProblem.medium}/{totalLevelWiseProblem.medium}</h3>
              </div>
              <div className="w-full h-[33.3%] bg-[var(--popover)] rounded-md flex justify-center items-center flex-col font-semibold">
                <h3 className="text-red-500">Hard</h3>
                <h3 className="">{userTotalLevelProblem.hard}/{totalLevelWiseProblem.hard}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-18 py-2 flex justify-between items-center pl-4 pr-8">
          <div className="flex items-center gap-4">
            <div className="w-[20rem] rounded-full overflow-hidden flex gap-1 items-center px-4 bg-input">
              <Search className='resize-custom w-5 text-gray-400' />
              <Input onChange={handleSearch} placeholder='Search questions' className='customTransparent border-none outline-none focus-visible:ring-[0px]' value={searchQuery} />
            </div>
            <Button onClick={handleReverseArray} variant="outline" className='rounded-full w-9 h-9 cursor-pointer'><ArrowDownUp className='resize-custom w-4 text-gray-400' /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='rounded-full w-9 h-9 cursor-pointer'><Funnel className='resize-custom w-4 text-gray-400' /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleFilterBtn("Easy")} className='justify-between'>Easy {filter === "Easy" && <Check className='text-orange-300' />}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterBtn("Medium")} className='justify-between'>Medium {filter === "Medium" && <Check className='text-orange-300' />}</DropdownMenuItem>
                <DropdownMenuItem className='justify-between' onClick={() => handleFilterBtn("Hard")}>Hard  {filter === "Hard" && <Check className='text-orange-300' />}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Shuffle className='resize-custom w-5 text-gray-400' />
        </div>
        <ScrollArea className="w-full h-[calc(100%-4.5rem)] flex flex-col px-4 pb-4">
          {isLoading &&
            <div className="w-full">
              <Skeleton className="w-full h-12 flex items-center gap-2 px-4 rounded-md mb-2"></Skeleton>
              <Skeleton className="w-full h-12 flex items-center gap-2 px-4 rounded-md mb-2"></Skeleton>
              <Skeleton className="w-full h-12 flex items-center gap-2 px-4 rounded-md mb-2"></Skeleton>
            </div>
          }
          {(filteredProblems.length > 0 && !isLoading) && filteredProblems.map((problem, index) =>
            <Link key={index} href={`/problem/${problem._id}`}>
              <div className={`w-full h-12 flex items-center gap-2 px-4 rounded-md ${index % 2 === 0 ? 'bg-[var(--sidebar-accent)]' : ''}`}>
                <h2 className="w-[5%] flex justify-center">{checkIsProblemSolvedOrnot(problem._id as string) && <Check className='resize-custom w-5 text-orange-400' />}</h2>
                <h2 className="w-[70%] font-semibold">{problem.title}</h2>
                <h2 className={`w-[15%] text-green-500 text-sm ${problemColors[problem.level as problemColorsType]}`}>{problem.level}</h2>
                <h2 className="flex w-[10%]"><Barcode className='resize-custom w-4 text-gray-500' /><Barcode className='resize-custom w-4 text-gray-500' /></h2>
              </div>
            </Link>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
