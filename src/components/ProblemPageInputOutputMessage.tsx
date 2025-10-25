import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import MDEditor from '@uiw/react-md-editor';

interface chatsType {
    input: string,
    output: string
}

export default function ProblemPageInputOutputMessage({chats, isSubmitting}: {chats: chatsType[], isSubmitting: boolean}) {
    return (
        <>
            {chats.length > 0 && chats.map((ele, index) =>
                <div key={index}>
                    <div className='w-full flex justify-end'>
                        <div className="w-[22rem] min-h-12 rounded-md p-3 bg-[var(--chart-4)] whitespace-pre-wrap">
                            {ele.input}
                        </div>
                    </div>
                    {(isSubmitting && ele.output === "") && <div className='w-full my-8'>
                        <div className="w-[26rem] min-h-32 bg-[var(--sidebar-accent)] rounded-md p-3">
                            <Skeleton style={{ background: "var(--card)" }} className="h-8 w-full rounded-mb mb-2" />
                            <Skeleton style={{ background: "var(--card)" }} className="h-8 w-full rounded-mb mb-2" />
                            <Skeleton style={{ background: "var(--card)" }} className="h-8 w-[80%] rounded-mb" />
                        </div>
                    </div>
                    }
                    {(ele.output.length !== 0) && <div className='w-full my-8'>
                        <MDEditor.Markdown source={ele.output} className="markdown-body w-[26rem] min-h-32 bg-[var(--sidebar-accent)] rounded-md p-3" />
                    </div>}
                </div>
            )}
        </>
    )
}
