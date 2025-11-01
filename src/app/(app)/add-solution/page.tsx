"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area';
import MDEditor from '@uiw/react-md-editor';
import { Loader2, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { solutionValidation } from '@/schemas/solutiionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { ISubmission } from '@/models/Submission';
import { toast } from 'sonner';
import { Types } from 'mongoose';
import Link from 'next/link';

export default function page() {
  let code = `#include<bits/stdc++.h>\nusing name spacestd\nint main(){\nint a;\ncin>> a\nreturn 0\n}`;

  const [mounted, setMounted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submission, setSubmission] = useState<ISubmission | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("id")
  const router = useRouter();

  const form = useForm<z.infer<typeof solutionValidation>>({
    resolver: zodResolver(solutionValidation),
    defaultValues: {
      problemId: "",
      title: "",
      tags: [""],
      explanation: `### Explanation:\n\n> Describe your first thoughts on how to solve this problem.\n\n### Intuition\n\n> Describe your approach to solving the problem.\n\n### Approach\n\n> Add your time complexity here, e.g. $$O(n)$$ \n\n### Complexity\n\n- #### Time complexity:\n\n- - > Add your time complexity here, e.g. $$O(n)$$\n\n- #### Space complexity:\n\n- - > Add your space complexity here, e.g. $$O(n)$$\n\n\n\n<br>\n\n### Code\n\n\`\`\`\n${""}\n\`\`\``,
      sourceCode: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof solutionValidation>) => {
    setIsSubmitting(true);
    if(!submission){
      toast.error("Submission information required");
      return;
    }

    try {
      const res = await axios.post<ApiResponse>("/api/solution/add-solution", data);

      toast.success("Solution added successfully");
      router.replace(`/problem/${submission?.problemId}`);
    } catch (error) {
      if(axios.isAxiosError(error) && error.response){
        toast.error(error.response.data.message || "Something went wrong while submitting solution")
        console.log(error.response.data.message || "Something went wrong while submitting solution")
      } else{
        console.log("Error while submitting solution: ", error);
        toast.error("Error while submitting solution");
      }
    } finally{
      setIsSubmitting(false);
    }
  }

  // const allValues = form.watch()
  const allTags = form.watch("tags");
  const explanationValue = form.watch("explanation");

  const fetchSubmissionDetails = async () => {
    if (!mounted) return;
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponse>(`/api/code/get-submission?submissionId=${submissionId}`);

      if (!res.data.success) return;

      setSubmission(res.data.submissionDetails as ISubmission);

      form.reset({
        problemId: ((res.data.submissionDetails as ISubmission).problemId as Types.ObjectId).toString(),
        title: "",
        tags: [""],
        explanation: `### Explanation:\n\n> Describe your first thoughts on how to solve this problem.\n\n### Intuition\n\n> Describe your approach to solving the problem.\n\n### Approach\n\n> Add your time complexity here, e.g. $$O(n)$$ \n\n### Complexity\n\n- #### Time complexity:\n\n- - > Add your time complexity here, e.g. $$O(n)$$\n\n- #### Space complexity:\n\n- - > Add your space complexity here, e.g. $$O(n)$$\n\n\n\n<br>\n\n### Code\n\n\`\`\`\n${res.data.submissionDetails?.sourceCode || ""}\n\`\`\``,
        sourceCode: res.data.submissionDetails?.sourceCode || "",
      });

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Problem occur while fetching submission details");
        console.log(error.response.data.message || "Problem occur while fetching submission details");
      } else {
        console.log("Error in solution fetching route", error);
        toast.error("Error in solutiion fetching route");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSubmissionDetails();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
  }, [mounted]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className='w-full flex justify-center'>
      <div style={{ background: "var(--card)" }} className="w-[90%] h-full px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4 mt-4 border-b-2">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder='Enter your title' {...field} className='customTransparent text-2xl h-14 border-none focus-visible:ring-[0px]' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-[18%] justify-between">
                <Link href={`/problem/${submission?.problemId}`}>
                  <Button type='button' variant="outline" className='w-24 font-semibold h-10 cursor-pointer'>Cancel</Button>
                </Link>
                <Button disabled={isSubmitting} className='w-24 bg-green-400 text-white font-semibold h-10 cursor-pointer hover:bg-green-500 disabled:bg-green-500'>{isSubmitting ? <><Loader2 className='animate-spin resize-custom w-5' /> Wait</> : <><Send /> Post</>}</Button>
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-full h-10 flex items-center gap-2 px-2 truncate">
                {allTags.length > 0 && allTags.filter((value) => value !== "").map((value, index) =>
                  <h2 key={index} className="bg-[var(--sidebar-accent)] px-6 h-8 rounded-full flex items-center justify-center border">{value}</h2>
                )}
              </div>
              <FormField
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder='Tags (add space seperated tags)'
                        value={Array.isArray(field.value) ? field.value.join(" ") : field.value}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const tagsArray = inputValue.split(" ").map(tag => tag.trim());
                          form.setValue("tags", tagsArray);
                        }}
                        className='customTransparent h-12 focus-visible:ring-[0px] border-none' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-[calc(100vh-5.5rem)] flex gap-2 mt-4">
              <ScrollArea className="w-1/2 h-full rounded-md">
                <FormField
                  name="explanation"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <MDEditor
                        value={field.value}
                        onChange={(value) => field.onChange(value || "")}
                        height={"100%"}
                        preview='edit'
                        hideToolbar={true}
                        className='p-2 w-full customTextWhite'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>
              <ScrollArea className="w-1/2 h-full rounded-md">
                <MDEditor.Markdown source={explanationValue} className='markdown-body customTextWhite min-h-full p-4' />
              </ScrollArea>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
