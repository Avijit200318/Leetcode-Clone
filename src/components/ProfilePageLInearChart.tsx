"use client"
import React from 'react'
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", submission: 186 },
  { month: "February", submission: 305 },
  { month: "March", submission: 237 },
  { month: "April", submission: 73 },
  { month: "May", submission: 209 },
  { month: "June", submission: 214 },
]

const chartConfig = {
  submission: {
    label: "Submission",
    color: "#d79f02",
  },
} satisfies ChartConfig

export default function ProfilePageLInearChart() {
  return (
    <Card className='w-full h-full border-none py-4 gap-3'>
      <CardHeader className='absoute top-0 left-0'>
        <CardDescription className='font-semibold text-lg'>Contest Rating</CardDescription>
        <CardTitle className='text-2xl'>1,369</CardTitle>
      </CardHeader>
      <CardContent className='w-full h-full'>
        <ChartContainer config={chartConfig} className='w-full h-[60%]'>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="submission"
              type="linear"
              stroke="var(--color-submission)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
