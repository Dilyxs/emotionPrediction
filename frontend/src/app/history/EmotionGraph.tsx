"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type EmotionDataPoint = {
  [key: string]: number;
};

const EMOTION_COLORS: { [key: string]: string } = {
  anger: "#EF4444",
  contempt: "#F97316",
  disgust: "#10B981",
  fear: "#8B5CF6",
  happy: "#FCD34D",
  neutral: "#9CA3AF",
  sad: "#60A5FA",
  surprise: "#EC4899",
};

export const EmotionGraph = ({ data }: { data: EmotionDataPoint[] }) => {
  const emotionKeys = Object.keys(EMOTION_COLORS);

  const formattedData = data.map((point, index) => ({
    ...point,
    name: `Frame ${index + 1}`, // or use a timestamp if you have one
  }));

  const toPercent = (decimal: number) => `${(decimal * 100).toFixed(0)}%`;

  return (
    <div className="w-screen h-64 justify-center">
      <div className="h-64 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData} // Use the local formatted data
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            {/* XAxis now maps to the 'name' we generated above */}
            <XAxis dataKey="name" hide />

            <YAxis
              domain={[0, 1]}
              tickFormatter={toPercent}
              width={40}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #93c5fd",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#334155" }}
              itemStyle={{ color: "#4b5563" }}
              formatter={(value: number, name: string) => [
                toPercent(value),
                name,
              ]}
            />

            <Legend
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "12px",
                textAlign: "center",
              }}
              iconType="circle"
              iconSize={8}
            />

            {/* Dynamically render lines based on your allowed colors */}
            {emotionKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                connectNulls={true}
                stroke={EMOTION_COLORS[key]}
                strokeWidth={2}
                dot={{ r: 3, fill: EMOTION_COLORS[key], strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  stroke: EMOTION_COLORS[key],
                  strokeWidth: 2,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
