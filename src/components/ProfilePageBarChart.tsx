'use client';

import React from "react";
import { Bar, BarChart, CartesianGrid } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";

export const description = "Runtime vs Performance Chart";

export default function ProblemPageBarChart() {
    // Simulated LeetCode-like performance data
    const chartData = [
        { time: 5, performance: 5 },
        { time: 10, performance: 10 },
        { time: 15, performance: 20 },
        { time: 20, performance: 30 },
        { time: 25, performance: 40 },
        { time: 30, performance: 50 },
        { time: 35, performance: 100 },
        { time: 40, performance: 70 },
        { time: 50, performance: 50 },
        { time: 60, performance: 30 },
        { time: 75, performance: 20 },
        { time: 90, performance: 10 },
        { time: 100, performance: 5 },
    ];

    const chartConfig = {
        performance: {
            label: "Submission",
            color: "#3e3e3e",
        },
    } satisfies ChartConfig;

    return (
        <Card className="w-full h-full py-4 border-none">
            <CardHeader className='absoute top-0 left-0 gap-1'>
                <CardDescription className='font-semibold text-lg'>Top</CardDescription>
                <CardTitle className='text-2xl font-normal'>93.97%</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full px-1">
                <ChartContainer config={chartConfig} className="w-full h-[60%]">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent labelFormatter={(v) => `${v}`} />}
                        />
                        <Bar dataKey="performance" fill="var(--color-performance)" radius={3} barSize={30} >
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
