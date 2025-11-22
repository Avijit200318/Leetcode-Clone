"use client";
import ProfilePageLeftSection from '@/components/ProfilePageLeftSection'
import ProfilePageRightSection from '@/components/ProfilePageRightSection';
import { IUser } from '@/models/User'
import { ApiResponse } from '@/types/ApiResponse';
import axios, { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { LevelWiseProblemType } from '../../problems/page';
import { levelWiseProblemSeperate } from '@/helpers/levelWiseProblemSeparate';
import { IProblem } from '@/models/Problem';

export default function page() {
  const [fullUserInfo, setFullUserInfo] = useState<IUser | null>(null);
  const {userId} = useParams()
  const [levelWiseSolvedQuestions, setLevelWiseSolvedQuestions] = useState<LevelWiseProblemType>({
    easy: 0,
    medium: 0,
    hard: 0
  });
  const [allQuestioinsLevelWise, setAllQuestionsLevelWise] = useState<LevelWiseProblemType>({
    easy: 0,
    medium: 0,
    hard: 0
  });

  console.log(fullUserInfo)

  useEffect(() => {
    const fetchUserInfo = async () => {
      if(!userId) return;

      try {
        const res = await axios.get<ApiResponse>(`/api/user/get-user?userId=${userId}`)

        setFullUserInfo(res.data.user || null)
        if(!res.data.user) return;

        const data = levelWiseProblemSeperate(res.data.user.solvedQuestions as IProblem[]);

        setLevelWiseSolvedQuestions({easy: data.e, medium: data.m, hard: data.h});

      } catch (error) {
        if(isAxiosError(error) && error.response){
          console.log("Problem while fetching user information: ", error.response.data.message);
          toast.error(error.response.data.message || "Problem while fetching user information");
        }else{
          console.log("Error while fetching user info: ", error);
          toast.error("Error while fetching user info");
        }
      }
    }
    fetchUserInfo();
  }, [])

  useEffect(() => {
    const fetchAllProblems = async () => {
      try {
        const res = await axios.get<ApiResponse>("/api/problem/all-problems");
        if(!res.data.allProblems) return;
        
        const data = levelWiseProblemSeperate(res.data.allProblems as IProblem[]);
        setAllQuestionsLevelWise({ easy: data.e, medium: data.m, hard: data.h});

      } catch (error) {
        if(isAxiosError(error) && error.response){
          console.log("Problem while fetching all questions: ", error.response);
          toast.error(error.response.data.message || "Problem while fetching all questions");
        }else{
          console.log("Error while fetching all questions: ", error);
          toast.error("Error while fetching all questions");
        }
      }
    }
    fetchAllProblems();
  }, []);

  return (
    <div className='flex justify-center gap-8 w-full py-8'>
      <ProfilePageLeftSection fullUserInfo={fullUserInfo} />
      <ProfilePageRightSection levelWiseSolvedQuestions={levelWiseSolvedQuestions} allQuestioinsLevelWise={allQuestioinsLevelWise} />
    </div>
  )
}
