import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

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
                        <div className="w-[26rem] min-h-32 rounded-md p-3 bg-[var(--chart-4)]">
                            {ele.input}
                        </div>
                    </div>
                    {isSubmitting && <div className='w-full my-8'>
                        <div className="w-[26rem] min-h-32 bg-[var(--sidebar-accent)] rounded-md p-3">
                            <Skeleton style={{ background: "var(--card)" }} className="h-8 w-full rounded-mb mb-2" />
                            <Skeleton style={{ background: "var(--card)" }} className="h-8 w-full rounded-mb mb-2" />
                            <Skeleton style={{ background: "var(--card)" }} className="h-8 w-[80%] rounded-mb" />
                        </div>
                    </div>
                    }
                    {(!isSubmitting && ele.output.length !== 0) && <div className='w-full my-8'>
                        <div className="w-[26rem] min-h-32 bg-[var(--sidebar-accent)] rounded-md p-3">
                            {ele.output}
                        </div>
                    </div>}
                </div>
            )}
        </>
    )
}
