'use client';

import React, { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart";
import { Session } from "next-auth";

export const description = "Runtime vs Performance Chart";

export default function CustomBarChart({ session, labelValue }: { session: Session | null, labelValue: number }) {
    // Simulated LeetCode-like performance data
    const chartData = [
        { time: 5, performance: 90 },
        { time: 10, performance: 60 },
        { time: 15, performance: 68 },
        { time: 20, performance: 65 },
        { time: 25, performance: 75 },
        { time: 30, performance: 45 },
        { time: 35, performance: 65 },
        { time: 40, performance: 40 },
        { time: 50, performance: 55 },
        { time: 60, performance: 49 },
        { time: 75, performance: 40 },
        { time: 90, performance: 30 },
        { time: 100, performance: 25 },
    ];

    const chartConfig = {
        performance: {
            label: "Performance",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    const findBarForLabel = (value: number) => {
        for (let i = 0; i < chartData.length; i++) {
            if (value < chartData[i].time) return chartData[i].time;
        }
        return chartData[chartData.length - 1].time;
    }

    // Custom label renderer to display image
    const renderCustomLabel = (props: any) => {
        if (!session) return null;
        // fetchs bar position and values
        const { x, y, width, index } = props;

        // showing image
        const barData = chartData[index];
        if (barData.time !== findBarForLabel(labelValue)) return null;

        const imgSize = 26; // image width/height
        return (
            <foreignObject
                x={x + width / 2 - imgSize / 2}
                y={y - imgSize - 4}
                width={imgSize}
                height={imgSize}
                rx={imgSize / 2}
                ry={imgSize / 2}
            >
                <img
                    src={session.user.avatar}
                    className="w-full h-full rounded-full object-contain border-2 border-blue-400"
                    alt="avatar"
                />
            </foreignObject>
        );
    };

    return (
        <Card className="w-full h-full py-4">
            <CardContent className="w-full h-full px-1">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="time"
                            tickFormatter={(v) => `${v}ms`}
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
                        <Bar dataKey="performance" fill="var(--color-performance)" radius={6} barSize={30} >
                            <LabelList dataKey="performance" content={renderCustomLabel} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
