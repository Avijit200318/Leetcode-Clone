import React, { useState } from 'react'
import Editor from '@monaco-editor/react';
import { Bookmark, Braces, ChevronUp, CodeXml, Maximize, Maximize2, RotateCcw } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function ProblemPageCodeEditor({theme}: {theme: string | undefined}) {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");

    const coddingLanguages = {
        "C": {
            "compilorId": "c",
            "apiId": ""
        },
        "C++": {
            "compilorId": "cpp",
            "apiId": ""
        },
        "Java": {
            "compilorId": "java",
            "apiId": ""
        },
        "Javascript": {
            "compilorId": "javascript",
            "apiId": ""
        },
        "Python": {
            "compilorId": "python",
            "apiId": ""
        }
    }

    type coddingLanguagesType = keyof typeof coddingLanguages;

    return (
        <div className="w-full h-full bg-[var(--sidebar-accent)]">
            <div className="header">
                <div className="w-full flex justify-between px-3 py-2">
                    <div className='flex gap-2 items-center'>
                        <CodeXml className='text-green-500' />
                        <h1 className=''>Code</h1>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                        <Maximize className='resize-custom w-4 cursor-pointer' />
                        <ChevronUp className='resize-custom w-5 cursor-pointer' />
                    </div>
                </div>
                <div style={{ background: "var(--card)" }} className={`w-full h-6 px-3 py-4 flex items-center justify-between ${theme === "dark"? 'text-neutral-400' : ''}`}>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center gap-2 outline-none transition-all duration-300 hover:bg-[var(--sidebar-accent)] px-1 rounded-sm cursor-pointer'>{selectedLanguage} <ChevronUp className='resize-custom w-4 rotate-180' /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("C")}>C</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("C++")}>C++</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("Java")}>Java</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("Javascript")}>Javascript</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("Python")}>Python</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-3">
                        <Bookmark className='resize-custom w-4' />
                        <Braces className='resize-custom w-4' />
                        <RotateCcw className='resize-custom w-4' />
                        <Maximize2 className='resize-custom w-4 ml-2' />
                    </div>
                </div>
            </div>
            <Editor
                defaultLanguage={coddingLanguages[selectedLanguage as coddingLanguagesType].compilorId}
                defaultValue=""
                theme='vs-dark'
                options={{
                    automaticLayout: true,
                    minimap: { enabled: false },
                    // optional, removes extra width
                    scrollBeyondLastLine: false,
                    // prevents extra empty scroll space
                    lineNumbers: "on",
                }}
                className='w-full h-[calc(100vh-8.7rem)]'
            />
        </div>
    )
}
