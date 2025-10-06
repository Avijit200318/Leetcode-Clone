"use client";
import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { twoSum } from "./problem.js";
import MDEditor from '@uiw/react-md-editor';
import ProblemPageNavigation from '@/components/ProblemPageNavigation';
import { Lock, Tag } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import ProblemSideFooter from '@/components/ProblemPageSideFooter';
import { useTheme } from 'next-themes';

import ProblemPageCollapseButton from '@/components/ProblemPageCollapseButton';

export default function page() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  let value = "**Hello world!!!**";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-[calc(100vh-3rem)] px-3 py-2">
      <ResizablePanelGroup direction="horizontal" className="w-full gap-1">
        <ResizablePanel defaultSize={50} className='rounded-md bg-[var(--sidebar-accent)] border'>
          <ProblemPageNavigation />
          
          <ScrollArea className='relative w-full h-[calc(100vh-3.5rem-3rem)]'>
            <div style={{ background: "var(--card)" }} className="w-full h-full flex flex-col p-4 pb-12">
              <h1 className="text-2xl font-bold">1. Two Sum</h1>
              <div className="w-full flex gap-2 mt-10">
                <div className="text-sm px-2.5 py-1 rounded-full bg-[var(--sidebar-accent)] text-yellow-400">Medium</div>
                <div className="flex gap-1 items-center text-sm px-2.5 py-1 rounded-full bg-[var(--sidebar-accent)]"><Tag className='resize-custom w-4' /> Topics</div>
                <div className="flex gap-1 items-center text-sm px-2.5 py-1 rounded-full bg-[var(--sidebar-accent)] text-orange-400"><Lock className='resize-custom w-4' /> Companies</div>
              </div>
              <div className="text w-full mt-4 ">
                <MDEditor.Markdown source={twoSum.content} className="markdown-body w-full" style={{ background: "var(--card)" }} />
              </div>

              <ProblemPageCollapseButton />
              <p className={`${theme === "dark" ? 'text-neutral-400' : ''} text-xs font-semibold mt-8`}>Copyright © {new Date().getFullYear()} LeetCode-Clone (Next JS Project Created by Avijit). All rights reserved.</p>
            </div>
            <ProblemSideFooter />
          </ScrollArea>

        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className='rounded-md'>
          <div className="w-full h-full flex items-center bg-blue-300 justify-center p-6">
            <span className="font-semibold">two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
