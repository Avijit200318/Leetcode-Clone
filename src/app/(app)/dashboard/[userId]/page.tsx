"use client";
import ProfilePageLeftSection from '@/components/ProfilePageLeftSection'
import ProfilePageRightSection from '@/components/ProfilePageRightSection';
import { IUser } from '@/models/User'
import { ApiResponse, codeSubmissionResultType } from '@/types/ApiResponse';
import axios, { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { LevelWiseProblemType } from '../../problems/page';
import { levelWiseProblemSeperate } from '@/helpers/levelWiseProblemSeparate';
import { IProblem } from '@/models/Problem';
import { languageWiseSubmissionSeperate } from '@/helpers/languageWiseSubmissionSeparate';

export interface FilteredLanguageType {
    c: number,
    cpp: number,
    js: number,
    java: number,
    py: number
  }

export default function page() {
  const [fullUserInfo, setFullUserInfo] = useState<IUser | null>(null);
  const { userId } = useParams()
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

  const [allSubmissions, setAllSubmissions] = useState<codeSubmissionResultType[]>([]);

  const [filterLanguageWiseSubmission, setFilterLanguageWiseSubmission] = useState<FilteredLanguageType>({
    c: 0, cpp: 0, js: 0, py: 0, java: 0
  })

  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await axios.get<ApiResponse>(`/api/user/get-user?userId=${userId}`)

      setFullUserInfo(res.data.user || null)
      if (!res.data.user) return;

      const data = levelWiseProblemSeperate(res.data.user.solvedQuestions as IProblem[]);

      setLevelWiseSolvedQuestions({ easy: data.e, medium: data.m, hard: data.h });

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log("Problem while fetching user information: ", error.response.data.message);
        toast.error(error.response.data.message || "Problem while fetching user information");
      } else {
        console.log("Error while fetching user info: ", error);
        toast.error("Error while fetching user info");
      }
    }
  }, [userId, setFullUserInfo, setLevelWiseSolvedQuestions])

  const fetchAllProblems = useCallback(async () => {
    try {
      const res = await axios.get<ApiResponse>("/api/problem/all-problems");
      if (!res.data.allProblems) return;

      const data = levelWiseProblemSeperate(res.data.allProblems as IProblem[]);
      setAllQuestionsLevelWise({ easy: data.e, medium: data.m, hard: data.h });

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log("Problem while fetching all questions: ", error.response);
        toast.error(error.response.data.message || "Problem while fetching all questions");
      } else {
        console.log("Error while fetching all questions: ", error);
        toast.error("Error while fetching all questions");
      }
    }
  }, [setAllQuestionsLevelWise])

  const fetchAllSubmisssions = useCallback(async () => {
    try {
      const res = await axios.post<ApiResponse>("/api/code/get-user-allsubmissions", {userId});

      setAllSubmissions(res.data.submissions as codeSubmissionResultType[] || []);

      if(!res.data.submissions) return;

      const data = languageWiseSubmissionSeperate(res.data.submissions as codeSubmissionResultType[]);
      setFilterLanguageWiseSubmission({
        c: data.c,
        cpp: data.cpp,
        js: data.js,
        py: data.py,
        java: data.java
      });

    } catch (error) {
      if(isAxiosError(error) && error.response){
        console.log("Problem occur while fetching all submissions: ", error.response.data.message)
        toast.error(error.response.data.message || "Problem occur while fetching all submissions")
      }else {
        console.log("Error while fetching all submissions: ", error);
        toast.error("Error while fetching all submissions");
      }
    }
  }, [userId, setAllSubmissions, setFilterLanguageWiseSubmission]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    fetchAllProblems()
  }, [fetchAllProblems]);

  useEffect(() => {
    fetchAllSubmisssions()
  }, [fetchAllSubmisssions]);

  return (
    <div className='flex justify-center gap-8 w-full py-8'>
      <ProfilePageLeftSection fullUserInfo={fullUserInfo} filterLanguageWiseSubmission={filterLanguageWiseSubmission} userId={userId?.toString() || ""} />
      <ProfilePageRightSection levelWiseSolvedQuestions={levelWiseSolvedQuestions} allQuestioinsLevelWise={allQuestioinsLevelWise} allSubmissions={allSubmissions} />
    </div>
  )
}
