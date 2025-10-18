'use client';

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";

export const description = "Runtime vs Performance Chart";

export default function CustomBarChart() {
    // Simulated LeetCode-like performance data
    const chartData = [
        { time: "5ms", performance: 98 },
        { time: "10ms", performance: 60 },
        { time: "15ms", performance: 68 },
        { time: "20ms", performance: 65 },
        { time: "25ms", performance: 75 },
        { time: "30ms", performance: 45 },
        { time: "35ms", performance: 65 },
        { time: "40ms", performance: 40 },
        { time: "50ms", performance: 55 },
        { time: "60ms", performance: 49 },
        { time: "75ms", performance: 40 },
        { time: "90ms", performance: 30 },
        { time: "100ms", performance: 25 },
    ];

    const chartConfig = {
        performance: {
            label: "Performance",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    return (
        <Card className="w-full h-full py-4">
            <CardContent className="w-full h-full px-1">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            label={{
                                position: "insideBottom",
                                // offset: -5,
                            }}
                        />
                        <YAxis
                            domain={[0, 100]}
                            tickFormatter={(v) => `${v}%`}
                            label={{
                                angle: -90,
                                position: "insideLeft",
                            }}
                            tickMargin={10}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent labelFormatter={(v) => `${v} Runtime`} />}
                        />
                        <Bar dataKey="performance" fill="var(--color-performance)" radius={6} barSize={30} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
