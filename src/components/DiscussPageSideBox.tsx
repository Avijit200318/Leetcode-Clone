"use client";
import { Compass, Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'

export default function DiscussPageSideBox() {
    return (
        <div className="w-[20%] h-full flex flex-col items-center px-4 py-8">
            <div className="w-full rounded-full overflow-hidden flex gap-1 items-center px-4 bg-input">
                <Search className='resize-custom w-5 text-gray-400' />
                <Input placeholder='Search' className='customTransparent border-none outline-none focus-visible:ring-[0px]' />
            </div>
            <div className="w-full h-[32rem] border-2 rounded-md mt-4 p-3">
                <div className="flex items-center gap-2 pb-4">
                    <Compass className='resize-custom w-5' />
                    <h3 className="text-lg">Explore</h3>
                </div>
                <p className="text-gray-500 py-3">#Interview</p>
                <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
                <p className="text-gray-500 py-3">#Compensetion</p>
                <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
                <p className="text-gray-500 py-3">#Career</p>
                <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
                <p className="text-gray-500 py-3">#Google</p>
                <h2 className="line-clamp-2">Oracle On-Campus Interview Experience | Google vs Atlasian</h2>
                <p className="text-blue-600 cursor-pointer pt-6">Show More</p>
            </div>
        </div>
    )
}
