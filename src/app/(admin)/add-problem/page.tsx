"use client";
import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function page() {
  const [value, setValue] = useState<string>("\nGiven an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n<br>\n\n#### Example 1\n- **Input:**\n```javascript\nnums = [2, 7, 11, 15]\ntarget = 9\n```\n- **Output:**\n```javascript\n[0, 1]\n```\n- **Explanation:**\n```javascript\nBecause nums[0] + nums[1] == 9, we return [0, 1].\n```\n\n<br>\n\n#### Example 2\n- **Input:**\n```javascript\nnums = [3, 2, 4]\ntarget = 6\n```\n- **Output:**\n```javascript\n[1, 2]\n```\n- **Explanation:**\n```javascript\nBecause nums[1] + nums[2] == 6, we return [1, 2].\n```\n\n<br>\n\n#### Example 3\n- **Input:**\n```javascript\nnums = [3, 3]\ntarget = 6\n```\n- **Output:**\n```javascript\n[0, 1]\n```\n- **Explanation:**\n```javascript\nBecause nums[0] + nums[1] == 6, we return [0, 1].\n```\n\n<br>\n\n#### Constraints\n\n- `2 <= nums.length <= 10^4`\n- `-10^9 <= nums[i] <= 10^9`\n- `-10^9 <= target <= 10^9`\n\n- Only one valid answer exists.\n\n<br>\n\n#### Follow-up\n Can you come up with an algorithm that is less than **O(n²)** time complexity?");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="container w-full h-[calc(100vh-3rem)] flex">
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || "")}
        height={"calc(100vh-3rem)"} 
        preview='edit'
        hideToolbar={true}
        className='py-1 pl-6 w-1/2'
      />
      <ScrollArea className='relative w-1/2 h-[calc(100vh-3rem)] border-l-2'>
      <MDEditor.Markdown source={value} className='py-4 px-4' />
      </ScrollArea>
    </div>
  )
}
