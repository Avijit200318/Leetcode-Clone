"use client";
import React from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  {
    month: "january",
    easy: 30,
    medium: 20,
    hard: 30,
    easyMax: 100,
    mediumMax: 150,
    hardMax: 200,
    easyRemaining: 100 - 30,
    mediumRemaining: 150 - 20,
    hardRemaining: 200 - 30,
  },
];

// Chart configuration
const chartConfig = {
  easy: { label: "Easy", color: "#00c950" },
  medium: { label: "Medium", color: "#d79f02" },
  hard: { label: "Hard", color: "#bb252d" },
} satisfies ChartConfig;

export default function CustomRadialChart() {
  const totalSolved = chartData[0].easy + chartData[0].medium + chartData[0].hard;
  const totalMax = chartData[0].easyMax + chartData[0].mediumMax + chartData[0].hardMax;

  return (
    <Card className="w-full h-full bg-[var(--popover)] border-none">
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
          <RadialBarChart
            data={chartData}
            endAngle={270}
            innerRadius={80}
            outerRadius={100}
            className="origin-center rotate-45"
          >

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} className="origin-center -rotate-45">
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" className="flex flex-col gap-4">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-semibold"
                        >
                          {totalSolved}
                          <tspan className="text-base font-light">/{totalMax}</tspan>
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground font-semibold text-sm"
                        >
                          Solved
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>            

            <RadialBar
              dataKey="hardRemaining"
              fill="rgba(156, 163, 175, 0.2)"
              stackId="a"
              cornerRadius={5}
            />
            <RadialBar
              dataKey="hard"
              fill="#bb252d"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent"
            />
            <RadialBar
              dataKey="mediumRemaining"
              fill="rgba(156, 163, 175, 0.2)"
              stackId="a"
              cornerRadius={5}
            />
            <RadialBar
              dataKey="medium"
              fill="#d79f02"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent"
            />
            <RadialBar
              dataKey="easyRemaining"
              fill="rgba(156, 163, 175, 0.2)"
              stackId="a"
              cornerRadius={5}
            />
            <RadialBar
              dataKey="easy"
              fill="#00c950"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
