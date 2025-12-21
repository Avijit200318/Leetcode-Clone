"use client";
import React, { useCallback, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2 } from 'lucide-react';
import { createProblemValidation } from '@/schemas/createProblemSchema';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { IProblem } from '@/models/Problem';


export default function page() {

  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [problemInfo, setProblemInfo] = useState<IProblem | null>(null);
  const router = useRouter();
  const { problemId } = useParams();
  console.log("problem: ", problemInfo)


  // zod validation + react hook form
  const form = useForm<z.infer<typeof createProblemValidation>>({
    resolver: zodResolver(createProblemValidation),
    defaultValues: {
      title: "",
      level: "",
      description: "",
      examples: "",
      constraints: "",
      testCases: [],
      topics: "",
      companies: ""
    }
  })

  const allValues = form.watch();
  // console.log("Form values:", allValues);
  const descriptionValue = form.watch("description");
  const examplesValue = form.watch("examples");
  const constraintsValue = form.watch("constraints");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testCases",
  });



  const onSubmit = async (data: z.infer<typeof createProblemValidation>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.patch<ApiResponse>(`/api/problem/update-problem?problemId=${problemId}`, data);
      toast.success("Problem updated successfully");
      router.replace(`/problem/${problemId}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error while fetching problem info: ", error.response.data.message);
        toast.error(error.response.data.message || "Error while fetching problem info");
      } else {
        console.log("Something went wrong while fetching error info: ", error);
        toast.error("Something went wrong while fetching error info");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchProblemInfo = useCallback(async () => {
    try {
      const res = await axios.get<ApiResponse>(`/api/problem/get-problem?problemId=${problemId}`);

      setProblemInfo(res.data.problem || null);
      if (!res.data.problem) return;

      form.reset({
        title: res.data.problem.title,
        level: res.data.problem.level,
        description: res.data.problem.description,
        examples: res.data.problem.examples,
        constraints: res.data.problem.constraints,
        testCases: res.data.problem.testCases,
        topics: res.data.problem.topics,
        companies: res.data.problem.companies
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error while fetching problem info: ", error.response.data.message);
        toast.error(error.response.data.message || "Error while fetching problem info");
      } else {
        toast.error("Something went wrong while fetching problem information");
        console.log("Something went wrong while fetching problem information: ", error);
      }
    }
  }, [setProblemInfo, problemId]);

  useEffect(() => {
    fetchProblemInfo();
  }, [fetchProblemInfo]);

  useEffect(() => {
    if (!mounted) return;
    if (theme && systemTheme) {
      setTheme(systemTheme);
    }
  }, [mounted]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="container w-full h-[calc(100vh-3rem)] flex">
      <ScrollArea className='relative w-1/2 h-[calc(100vh-3rem)] px-4 py-2'>
        <div className="w-full border-2 py-8 px-8 rounded-2xl flex flex-col items-center relative">
          <div className="logo">
            {(theme === "dark") ? <img src="/logo dark.png" alt="" /> : <img src="/logo.svg" alt="" />}
          </div>
          <div className="w-full">
            <h1 className='text-3xl mt-8 mb-2 font-semibold'>Update Problem</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-8">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} className='text-base p-4 h-11' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="level"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="Level" {...field} className='text-base p-4 h-11' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (udpate the bellow template)</FormLabel>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
                      height={"calc(100vh-3rem)"}
                      preview='edit'
                      hideToolbar={true}
                      className='p-2 w-full'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="examples"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Examples</FormLabel>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
                      height={"calc(100vh-3rem)"}
                      preview='edit'
                      hideToolbar={true}
                      className='p-2 w-full'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="constraints"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints</FormLabel>
                    <MDEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
                      height={"calc(100vh-3rem)"}
                      preview='edit'
                      hideToolbar={true}
                      className='p-2 w-full'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="testCases"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Cases</FormLabel>
                    <div className="flex flex-col gap-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <FormControl className="flex-1">
                            <textarea
                              placeholder="Input"
                              {...form.register(`testCases.${index}.input` as const)}
                              className="border rounded-md p-2 w-full h-20 resize-none bg-transparent"
                            />
                          </FormControl>
                          <FormControl className="flex-1">
                            <textarea
                              placeholder="Output"
                              {...form.register(`testCases.${index}.output` as const)}
                              className="border rounded-md p-2 w-full h-20 resize-none bg-transparent"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="destructive"
                            className='cursor-pointer font-semibold'
                            onClick={() => remove(index)}
                          >
                            <Trash2 className='resize-custom w-5' />
                          </Button>
                        </div>
                      ))}

                      <Button variant="outline" type="button" className='w-full h-11 text-base font-semibold cursor-pointer' onClick={() => append({ input: "", output: "" })}>
                        Add Test Case
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="topics"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topics</FormLabel>
                    <FormControl>
                      <Input placeholder="Topics" {...field} className='text-base p-4 h-11' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="companies"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Companies</FormLabel>
                    <FormControl>
                      <Input placeholder="Companies" {...field} className='text-base p-4 h-11' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className='w-full h-11 text-base font-semibold cursor-pointer'>{isSubmitting ? <><Loader2 className='resize-custom animate-spin w-7 h-7' /> Please wait</> : 'Update'}</Button>
            </form>
          </Form>
        </div>
      </ScrollArea>
      <ScrollArea className='relative w-1/2 h-[calc(100vh-3rem)] border-l-2 py-4'>
        <>
          <h2 className="mb-2 pl-3 font-semibold text-lg">Description View</h2>
          <MDEditor.Markdown source={descriptionValue} className='markdown-body customTextWhite py-4 px-4 mb-6' />
        </>
        <>
          <h2 className="mb-2 pl-3 font-semibold text-lg">Examples View</h2>
          <MDEditor.Markdown source={examplesValue} className='markdown-body customTextWhite py-4 px-4 mb-6' />
        </>
        <>
          <h2 className="mb-2 pl-3 font-semibold text-lg">Constraints View</h2>
          <MDEditor.Markdown source={constraintsValue} className='markdown-body customTextWhite py-4 px-4' />
        </>
      </ScrollArea>
    </div>
  )
}
