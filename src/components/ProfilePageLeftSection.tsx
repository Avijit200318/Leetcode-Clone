import React from 'react'
import { Button } from '@/components/ui/button'
import { Eye, FolderCheck, GraduationCap, MapPin, MessageCircle, Star, Tag } from 'lucide-react'
import { IUser } from '@/models/User'
import { LevelWiseProblemType } from '@/app/(app)/problems/page'

export default function ProfilePageLeftSecond({fullUserInfo}: {fullUserInfo: IUser | null}) {
    return (
        <div className="customBackground w-[20%] h-full  rounded-lg px-3 py-4">
            <div className="flex items-center gap-4 w-full">
                <img src={fullUserInfo?.avatar} alt="" className='w-22 h-22 rounded-full bg-blue-500' />
                <div className="">
                    <h1 className="font-semibold text-lg">{fullUserInfo?.username}</h1>
                    <h2 className="text-sm">{fullUserInfo?.username}</h2>
                    <h2 className='mt-4 font-semibold'>Rank 164,334</h2>
                </div>
            </div>
            <div className="my-4 w-full max-h-48">
                <p className='line-clamp-8'>{fullUserInfo?.bio}</p>
            </div>
            <Button variant='outline' className='w-full mt-4'>Edit Profile</Button>
            <div className="my-8 flex flex-col gap-4 text-gray-400">
                <div className="w-full flex gap-3 items-center">
                    <MapPin className='resize-custom w-6' />
                    <h3 className="truncate w-[calc(100%-1.5rem)]">{fullUserInfo?.country || "Add Country"}</h3>
                </div>
                <div className="w-full flex gap-3 items-center">
                    <GraduationCap className='resize-custom w-6' />
                    <h3 className="truncate w-[calc(100%-1.5rem)]">{fullUserInfo?.unversity || "Add University"}</h3>
                </div>
                <div className="w-full flex gap-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-7' viewBox="0 0 640 640"><path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" fill='gray' /></svg>
                    <h3 className="truncate w-[calc(100%-1.5rem)]">{fullUserInfo?.github || "Add Github link"}</h3>
                </div>
                <div className="w-full flex gap-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-7' viewBox="0 0 640 640"><path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" fill='gray' /></svg>
                    <h3 className="truncate w-[calc(100%-1.5rem)]">linkdin/avijit200.com</h3>
                </div>
                <div className="w-full flex gap-3 items-start">
                    <Tag className='resize-custom w-6' />
                    <div className="truncate w-[calc(100%-1.5rem)] flex gap-2 flex-wrap">
                        <h3 className="px-4 py-0.5 text-sm bg-[var(--sidebar-accent)] rounded-full">html</h3>
                        <h3 className="px-4 py-0.5 text-sm bg-[var(--sidebar-accent)] rounded-full">css</h3>
                        <h3 className="px-4 py-0.5 text-sm bg-[var(--sidebar-accent)] rounded-full">js</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 border-t pt-2 pb-4">
                <h1 className="font-semibold mb-3">Community Status</h1>
                <div className="flex gap-4">
                    <Eye className='resize-custom w-5 text-blue-500' />
                    <div className="text-gray-500">
                        <h4 className='text-sm'>Views <span className='font-semibold'>10</span></h4>
                        <p className='text-xs'>Last week 0</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <FolderCheck className='resize-custom w-5 text-green-500' />
                    <div className="text-gray-500">
                        <h4 className='text-sm'>Solutions <span className='font-semibold'>10</span></h4>
                        <p className='text-xs'>Last week 0</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <MessageCircle className='resize-custom w-5' />
                    <div className="text-gray-500">
                        <h4 className='text-sm'>Discuss <span className='font-semibold'>10</span></h4>
                        <p className='text-xs'>Last week 0</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Star className='resize-custom w-5 text-orange-500' />
                    <div className="text-gray-500">
                        <h4 className='text-sm'>Discuss <span className='font-semibold'>10</span></h4>
                        <p className='text-xs'>Last week 0</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 border-t pt-2">
                <h1 className="font-semibold mb-3">Languages</h1>
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-between items-center">
                        <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">C++</h3>
                        <h3 className="text-sm text-gray-400 mr-2"><span className="font-semibold text-white">210</span> problems solved</h3>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Python</h3>
                        <h3 className="text-sm text-gray-400 mr-2"><span className="font-semibold text-white">210</span> problems solved</h3>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Javascript</h3>
                        <h3 className="text-sm text-gray-400 mr-2"><span className="font-semibold text-white">210</span> problems solved</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-3 border-t pt-2">
                    <h1 className="font-semibold mb-3">Skills</h1>
                    <h1 className="font-semibold mt-2 text-sm ml-2">Advance</h1>
                    <div className="flex flex-col gap-3 ml-2">
                        <div className="flex w-full gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Dynamic Programming</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x30</h3>
                        </div>
                        <div className="flex w-full gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Backtracking</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x20</h3>
                        </div>
                        <div className="flex w-full gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Devide and Conquer</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x10</h3>
                        </div>
                    </div>
                    <h1 className="font-semibold mt-2 text-sm ml-2">Intermediate</h1>
                    <div className="flex w-full flex-wrap gap-3 ml-2">
                        <div className="flex gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Hash Table</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x30</h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Math</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x20</h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Tree</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x10</h3>
                        </div>
                    </div>
                    <h1 className="font-semibold mt-2 text-sm ml-2">Fundamental</h1>
                    <div className="flex flex-wrap w-full gap-3 ml-2">
                        <div className="flex gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Array</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x30</h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">String</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x20</h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            <h3 className="px-4 py-0.5 rounded-full bg-[var(--sidebar-accent)] text-sm text-gray-400">Shorting</h3>
                            <h3 className="text-sm text-gray-400 mr-2">x10</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
