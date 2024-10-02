"use client";
import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

interface SubCategory {
  name: string;
  value: number;
}

interface ChartDataItem {
  category: string;
  value: number;
  subCategories?: SubCategory[];
}

const chartData: ChartDataItem[] = [
  { 
    category: "Publications", 
    value: 186,
    subCategories: [
      { name: "Journal", value: 80 },
      { name: "Book Chapters", value: 40 },
      { name: "Conference", value: 50 },
      { name: "Book", value: 16 }
    ]
  },
  { 
    category: "Patent", 
    value: 305,
    subCategories: [
      { name: "Tech Patent", value: 200 },
      { name: "Design Patent", value: 105 }
    ]
  },
  { 
    category: "Copyrights", 
    value: 237
  },
  { 
    category: "Events", 
    value: 273,
    subCategories: [
      { name: "Attended", value: 200 },
      { name: "Conducted", value: 73 }
    ]
  },
  { 
    category: "Project", 
    value: 209,
    subCategories: [
      { name: "Consultancy", value: 120 },
      { name: "R&D Projects", value: 89 }
    ]
  },
];

const chartConfig: ChartConfig = chartData.reduce((acc, item) => {
  acc[item.category] = {
    label: item.category,
    color: "hsl(var(--chart-1))",
  };
  return acc;
}, {} as ChartConfig);

export function RadarGraph() {
  return (
    <Card>
      <CardHeader className="items-start">
        <CardTitle className="h5-s text-matte-black">Radar Chart</CardTitle>
        <CardDescription className="text-r text-stone-gray">
          Showing total values for each category
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip 
              cursor={false} 
              content={<CustomTooltip />} 
            />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartDataItem;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const categoryColor = chartConfig[data.category]?.color || 'var(--color-total)';
    
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '15px', border: '1px solid #ccc' }}>
        <p className="label" style={{ color: categoryColor, fontWeight: 'bold' }}>{`${data.category} : ${data.value}`}</p>
        {data.subCategories && data.subCategories.map((subCat, index) => (
          <p key={index}>{`${subCat.name}: ${subCat.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};