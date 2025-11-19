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

export const EmotionGraph = ({ data }: { data: EmotionDataPoint[] })=> {
 const allEmotionKeys = new Set<string>();
  data.forEach((point) => {
    Object.keys(point).forEach((key) => {
      if (key !== "name" && key !== "timestamp") {
        allEmotionKeys.add(key);
      }
    });
  });
  const emotionKeys = Array.from(allEmotionKeys);

  const colors: { [key: string]: string } = {
    anger: "#EF4444", // Red
    contempt: "#F97316", // Orange
    disgust: "#10B981", // Green
    fear: "#8B5CF6", // Purple
    happy: "#FCD34D", // Yellow
    neutral: "#9CA3AF", // Gray
    sad: "#60A5FA", // Blue
    surprise: "#EC4899", // Pink
    // Add more emotion-color mappings here
  };

  const toPercent = (decimal: number) => `${(decimal * 100).toFixed(0)}%`;

  return (
    // Outer container with the light blue border, rounded corners, and shadow
    // Centered horizontally by its parent `page.tsx`
    <div className="w-full max-w-2xl border-2 border-blue-400 rounded-xl shadow-md p-2 bg-white">
      <div className="h-64 p-2">
        {" "}
        {/* Inner padding */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />{" "}
            {/* Light gray dashed horizontal lines */}
            {/* XAxis: Hidden for now as per image, but could be used for dates/timestamps */}
            <XAxis dataKey="name" hide />
            {/* YAxis: Range 0-1, formatted as percentages, visible on left */}
            <YAxis
              domain={[0, 1]}
              tickFormatter={toPercent}
              width={40} // Provide space for ticks
              tick={{ fontSize: 12, fill: "#64748b" }} // Gray text for ticks
              axisLine={false} // Hide axis line itself
              tickLine={false} // Hide small tick lines
            />
            {/* Tooltip: Styled to match the general aesthetic */}
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #93c5fd", // Light blue border for tooltip
                backgroundColor: "rgba(255,255,255,0.9)", // Slightly transparent white
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#334155" }} // Darker label
              itemStyle={{ color: "#4b5563" }} // Item text color
              formatter={(value: number, name: string) => [
                toPercent(value),
                name,
              ]}
            />
            {/* Legend: Below the chart, styled with circles */}
            <Legend
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "12px",
                textAlign: "center",
              }}
              iconType="circle" // Small circles for legend items
              iconSize={8}
            />
            {/* Render a Line for each unique emotion */}
            {emotionKeys.map((key) => (
              <Line
                key={key}
                type="monotone" // Smooth curve
                dataKey={key} // Crucial: This must match a key in your emotion data objects
                connectNulls={true}
                stroke={colors[key] || "#94a3b8"} // Emotion-specific color or default gray
                strokeWidth={2} // Slightly thinner line
                dot={{ r: 3, fill: colors[key] || "#94a3b8", strokeWidth: 0 }} // Small dots
                activeDot={{
                  r: 5,
                  stroke: colors[key] || "#94a3b8",
                  strokeWidth: 2,
                }} // Larger dot on hover
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
