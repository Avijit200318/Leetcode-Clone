import React from "react";

const NUM_WEEKS = 53;
const DAYS_PER_WEEK = 7;

const getDaysInYear = (startDate: Date): string[] => {
  const days: string[] = [];
  for (let i = 0; i < 365; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() - i);
    days.unshift(d.toISOString().substring(0, 10));
  }
  return days;
};

const colorMap = [
  "bg-gray-200 dark:bg-gray-800",
  "bg-teal-300 dark:bg-[#00661f]",
  "bg-teal-500 dark:bg-[#1f8f36]",
  "bg-teal-700 dark:bg-[#28c047]",
  "bg-teal-900 dark:bg-[#80df88]",
];

const activityData = new Map([
  ["2025-02-01", 5],
  ["2025-02-03", 5],
  ["2025-02-04", 10],
  ["2025-02-06", 15],
  ["2025-02-02", 20],
  ["2025-03-02", 12],
  ["2025-04-03", 22],
  ["2025-04-04", 22],
  ["2025-04-05", 29],
  ["2025-04-06", 10],
  ["2025-04-07", 2],
  ["2025-04-08", 12],
  ["2025-04-09", 2],
  ["2025-04-10", 20],
  ["2025-04-11", 5],
  ["2025-04-12", 15],
  ["2025-04-13", 22],
  ["2025-05-07", 22],
  ["2025-11-08", 10],
  ["2025-11-09", 22],
]);

export default function CustomContributorGraph() {
  const today = new Date();
const allDays = getDaysInYear(today);


  const getColorLevel = (count: number): number => {
    if (count > 20) return 4;
    if (count > 10) return 3;
    if (count > 5) return 2;
    if (count > 0) return 1;
    return 0;
  };

  return (
    <div className="p-4 bg-white dark:bg-transparent rounded-lg shadow-sm overflow-x-auto w-full">
      <div
        className="grid gap-[0.43rem] w-full"
        style={{
            gridTemplateColumns: `repeat(${NUM_WEEKS}, 10px)`,
            gridTemplateRows: `repeat(7, 10px)`,
            gridAutoFlow: "column",
        }}
    >
        {allDays.map((date) => {
          const count = activityData.get(date) || 0;
          const level = getColorLevel(count);

          return (
            <div
              key={date}
              className={`w-[0.8rem] h-[0.8rem] rounded-[2px] ${colorMap[level]} transition-colors`}
              title={`${date}: ${count} activities`}
            />
          );
        })}
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-10">
        <span>Less</span>
        <div className="flex gap-1">
          {colorMap.map((color, i) => (
            <span key={i} className={`w-[0.8rem] h-[0.8rem] rounded-[2px] ${color}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
