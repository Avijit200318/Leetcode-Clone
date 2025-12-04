import { Button } from '@/components/ui/button'
import { CircleDollarSign, CirclePlus, Gift, Package, Star } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className='w-full h-[150vh] relative'>
      <div className="absolute top-0 right-12 h-8 border-2 border-t-0 flex items-center gap-2 p-6 rounded-b-md">Your Points: <span className='text-yellow-400'>1362</span><CircleDollarSign className='resize-custom w-5 text-yellow-400' /></div>
      <div className="w-full h-1/2 flex flex-col justify-center items-center">
        <div className="w-40 h-40 bg-[url(/navLogo-light.png)] dark:bg-[url(/navLogo-dark.png)] bg-cover"></div>
        <h1 className="text-3xl my-4 font-light"><span className='font-semibold'>LeetCode</span> Store</h1>
        <p className="my-4 dark:text-gray-400">Shop in our store or redeem our products for free by using LeetCoins.</p>
        <div className="flex items-center gap-4">
          <Button variant="outline" className='rounded-full cursor-pointer text-lg w-44 h-12'><Gift className='resize-custom w-6' /> Redeem</Button>
          <Button variant="outline" className='rounded-full cursor-pointer text-lg w-44 h-12'><CirclePlus className='resize-custom w-6' /> Earn Leetcoin</Button>
          <Button variant="outline" className='rounded-full cursor-pointer text-lg w-44 h-12'><Star className='resize-custom w-6' fill='#fff' /> Premium</Button>
          <Button variant="outline" className='rounded-full cursor-pointer text-lg w-44 h-12'><Package className='resize-custom w-6' /> View Orders</Button>
        </div>
      </div>
      <div className="w-full h-1/2 bg-white flex flex-wrap justify-around items-center">
        <div className="w-80 h-68 cursor-pointer shadow-[0_4px_20px_2px_gray] p-2 rounded-md">
          <div className="w-full h-[80%] rounded-md overflow-hidden">
            <img src="/timeTravel.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-[20%] flex justify-between items-center">
            <div>
              <h3 className="text-black font-semibold mt-1">Time Travel Ticket</h3>
              <p className="text-black dark:text-gray-500 text-xs font-semibold mt-1">For Daily Coding Challenge</p>
            </div>
            <Button className='bg-green-500 font-semibold text-white'>70 <CircleDollarSign className='resize-custom w-5' /></Button>
          </div>
        </div>
        <div className="w-80 h-68 cursor-pointer shadow-[0_4px_20px_2px_gray] p-2 rounded-md">
          <div className="w-full h-[80%] rounded-md overflow-hidden">
            <img src="/Premium.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-[20%] flex justify-between items-center">
            <div>
              <h3 className="text-black font-semibold mt-1 truncate">30 Day Primium Subscription</h3>
              <p className="text-black dark:text-gray-500 text-xs font-semibold mt-1">Premium</p>
            </div>
            <Button className='bg-green-500 font-semibold text-white'>6000 <CircleDollarSign className='resize-custom w-5' /></Button>
          </div>
        </div>
        <div className="w-80 h-68 cursor-pointer shadow-[0_4px_20px_2px_gray] p-2 rounded-md">
          <div className="w-full h-[80%] rounded-md overflow-hidden">
            <img src="/tshirt.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-[20%] flex justify-between items-center">
            <div>
              <h3 className="text-black font-semibold mt-1">Leetcode T-Shirt</h3>
              <p className="text-black dark:text-gray-500 text-xs font-semibold mt-1">Redeem Your High Quality T-Shirt</p>
            </div>
            <Button className='bg-green-500 font-semibold text-white'>7200 <CircleDollarSign className='resize-custom w-5' /></Button>
          </div>
        </div>
        <div className="w-80 h-68 cursor-pointer shadow-[0_4px_20px_2px_gray] p-2 rounded-md">
          <div className="w-full h-[80%] rounded-md overflow-hidden">
            <img src="/cap.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-[20%] flex justify-between items-center">
            <div>
              <h3 className="text-black font-semibold mt-1">Leetcode Cap</h3>
              <p className="text-black dark:text-gray-500 text-xs font-semibold mt-1">Comes in Black and White</p>
            </div>
            <Button className='bg-green-500 font-semibold text-white'>6500 <CircleDollarSign className='resize-custom w-5' /></Button>
          </div>
        </div>

      </div>
    </div>
  )
}
