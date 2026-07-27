"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartProps {
  data: Record<string, unknown>[];
  type?: "area" | "bar" | "line";
  dataKeys: { key: string; color: string; name?: string }[];
  xKey?: string;
  height?: number;
}

export function Chart({ data, type = "area", dataKeys, xKey = "month", height = 300 }: ChartProps) {
  const ChartComponent = type === "bar" ? BarChart : type === "line" ? LineChart : AreaChart;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={xKey} className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--popover-foreground))",
          }}
        />
        <Legend />
        {dataKeys.map((dk) =>
          type === "bar" ? (
            <Bar key={dk.key} dataKey={dk.key} fill={dk.color} name={dk.name ?? dk.key} radius={[4, 4, 0, 0]} />
          ) : type === "line" ? (
            <Line key={dk.key} type="monotone" dataKey={dk.key} stroke={dk.color} name={dk.name ?? dk.key} strokeWidth={2} dot={false} />
          ) : (
            <Area
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              stroke={dk.color}
              fill={dk.color}
              fillOpacity={0.15}
              name={dk.name ?? dk.key}
              strokeWidth={2}
            />
          )
        )}
      </ChartComponent>
    </ResponsiveContainer>
  );
}
