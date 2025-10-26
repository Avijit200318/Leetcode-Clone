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

export default function page() {
  let code = `#include<bits/stdc++.h>\nusing name spacestd\nint main(){\nint a;\ncin>> a\nreturn 0\n}`;

  const [explanation, setExplanation] = useState<string>(
    `### Explanation:\n\n> Describe your first thoughts on how to solve this problem.\n\n### Intuition\n\n> Describe your approach to solving the problem.\n\n### Approach\n\n> Add your time complexity here, e.g. $$O(n)$$ \n\n### Complexity\n\n- Time complexity:\n\n> Add your time complexity here, e.g. $$O(n)$$\n\n- Space complexity:\n\n> Add your space complexity here, e.g. $$O(n)$$\n\n### Code\n\`\`\`\n${code}\n\`\`\``);

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof solutionValidation>>({
    resolver: zodResolver(solutionValidation),
    defaultValues: {
      problemId: "",
      title: "",
      tags: [""],
      explanation: `### Explanation:\n\n> Describe your first thoughts on how to solve this problem.\n\n### Intuition\n\n> Describe your approach to solving the problem.\n\n### Approach\n\n> Add your time complexity here, e.g. $$O(n)$$ \n\n### Complexity\n\n- Time complexity:\n\n> Add your time complexity here, e.g. $$O(n)$$\n\n- Space complexity:\n\n> Add your space complexity here, e.g. $$O(n)$$\n\n### Code\n\`\`\`\n${code}\n\`\`\``,
      sourceCode: "",
    }
  });

  const onSubmit = async () => {

  }

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
              <Input placeholder='Enter your title' className='customTransparent text-2xl h-14 border-none focus-visible:ring-[0px]' />
              <div className="flex w-[18%] justify-between">
                <Button type='button' variant="outline" className='w-24 font-semibold h-10 cursor-pointer'>Cancel</Button>
                <Button disabled={isSubmitting} className='w-24 bg-green-400 text-white font-semibold h-10 cursor-pointer hover:bg-green-500 disabled:bg-green-500'>{isSubmitting ? <><Loader2 className='animate-spin resize-custom w-5' /> Wait</> : <><Send /> Post</>}</Button>
              </div>
            </div>
            <div className="w-full">
              <Input placeholder='Tags (add coma seperated tags)' className='customTransparent h-12 focus-visible:ring-[0px] border-none mt-2' />
            </div>
            <div className="w-full h-[calc(100vh-5.5rem)] flex gap-2 mt-4">
              <ScrollArea className="w-1/2 h-full rounded-md">
                <MDEditor
                  value={explanation}
                  onChange={(value) => setExplanation(value || "")}
                  height={"100%"}
                  preview='edit'
                  hideToolbar={true}
                  className='p-2 w-full'
                />
              </ScrollArea>
              <ScrollArea className="w-1/2 h-full rounded-md">
                <MDEditor.Markdown source={explanation} className='markdown-body min-h-full p-4' />
              </ScrollArea>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
