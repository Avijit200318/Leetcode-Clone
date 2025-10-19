import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import { Bookmark, Braces, ChevronUp, CodeXml, Copy, Maximize, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface ProblemPageCodeEditorType {
    theme: string | undefined,
    selectedLanguage: string,
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>,
    setSelectedLanguageCode: React.Dispatch<React.SetStateAction<number>>,
    sourceCode: string,
    setSourceCode: React.Dispatch<React.SetStateAction<string>>
}

export default function ProblemPageCodeEditor({ theme, selectedLanguage, setSelectedLanguage, setSelectedLanguageCode, sourceCode, setSourceCode }: ProblemPageCodeEditorType) {
    const [isFullScreen, setIsFullScreen] = useState(!document.fullscreenElement);
    console.log("isFull: ", isFullScreen)

    const coddingLanguages = {
        "C": {
            "compilorId": "c",
            "apiId": 50
        },
        "C++": {
            "compilorId": "cpp",
            "apiId": 54
        },
        "Java": {
            "compilorId": "java",
            "apiId": 62
        },
        "Javascript": {
            "compilorId": "javascript",
            "apiId": 93
        },
        "Python": {
            "compilorId": "python",
            "apiId": 71
        }
    }

    type coddingLanguagesType = keyof typeof coddingLanguages;

    useEffect(() => {
        const changeLanguageCode = () => {
            setSelectedLanguageCode(coddingLanguages[selectedLanguage as coddingLanguagesType].apiId);
            setSourceCode("");
        }
        changeLanguageCode();
    }, [selectedLanguage])

    const handleResetCode = () => {
        setSourceCode("");
    }

    const handleFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(!isFullScreen);
        }
    };

    const handleExitFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScreen(!isFullScreen);
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(sourceCode);
        toast.success("Copy to clipboard")
    }

    return (
        <div className="w-full h-full bg-[var(--sidebar-accent)]">
            <div className="header">
                <div className="w-full flex justify-between px-3 py-2">
                    <div className='flex gap-2 items-center'>
                        <CodeXml className='text-green-500' />
                        <h1 className=''>Code</h1>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                        <Tooltip>
                            <TooltipTrigger>
                                {isFullScreen ?
                                    <Maximize onClick={handleFullScreen} className='resize-custom w-4 cursor-pointer' /> :
                                    <Maximize onClick={handleExitFullScreen} className='resize-custom w-4 cursor-pointer' />
                                }
                            </TooltipTrigger>
                            <TooltipContent className={`bg-[var(--sidebar-accent)] border ${theme === "dark" ? 'text-neutral-200 border-gray-600' : 'text-gray-600 border-gray-300'}`}>{isFullScreen ? 'Full screen' : 'Exit Full Screen'}</TooltipContent>
                        </Tooltip>
                        <ChevronUp className='resize-custom w-5 cursor-pointer' />
                    </div>
                </div>
                <div style={{ background: "var(--card)" }} className={`w-full h-6 px-3 py-4 flex items-center justify-between ${theme === "dark" ? 'text-neutral-400' : ''}`}>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center gap-2 outline-none transition-all duration-300 hover:bg-[var(--sidebar-accent)] px-1 rounded-sm cursor-pointer'>{selectedLanguage} <ChevronUp className='resize-custom w-4 rotate-180' /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClickCapture={() => { setSelectedLanguage("C") }}>C</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("C++")}>C++</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("Java")}>Java</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("Javascript")}>Javascript</DropdownMenuItem>
                            <DropdownMenuItem onClickCapture={() => setSelectedLanguage("Python")}>Python</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-3">
                        <Bookmark className='resize-custom w-4' />
                        <Tooltip>
                            <TooltipTrigger>
                                <Copy onClick={handleCopyToClipboard} className='resize-custom w-4 cursor-pointer' />
                            </TooltipTrigger>
                            <TooltipContent className={`bg-[var(--sidebar-accent)] border ${theme === "dark" ? 'text-neutral-200 border-gray-600' : 'text-gray-600 border-gray-300'}`}>Copy Code</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <RotateCcw onClick={handleResetCode} className='resize-custom w-4 cursor-pointer' />
                            </TooltipTrigger>
                            <TooltipContent className={`bg-[var(--sidebar-accent)] border ${theme === "dark" ? 'text-neutral-200 border-gray-600' : 'text-gray-600 border-gray-300'}`}>Reset Editor</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                {isFullScreen ?
                                    <Maximize2 onClick={handleFullScreen} className='resize-custom w-4 ml-2 cursor-pointer' /> :
                                    <Minimize2 onClick={handleExitFullScreen} className='resize-custom w-4 ml-2 cursor-pointer' />
                                }
                            </TooltipTrigger>
                            <TooltipContent className={`bg-[var(--sidebar-accent)] border ${theme === "dark" ? 'text-neutral-200 border-gray-600' : 'text-gray-600 border-gray-300'}`}>{isFullScreen ? 'Full screen' : 'Exit Full Screen'}</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <Editor
                language={coddingLanguages[selectedLanguage as coddingLanguagesType].compilorId}
                value={sourceCode}
                onChange={(value) => setSourceCode(value ?? "")}
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
