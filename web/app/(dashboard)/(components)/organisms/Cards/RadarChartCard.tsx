import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";

export interface RadarChartCardProps {
  title: string;
  labels: string[];
  data: number[];
}

export default function RadarChartCard({
  title,
  labels,
  data,
}: RadarChartCardProps): React.ReactNode {
  const [chartData, setChartData] = useState({});

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    maxWidth: 600,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          label: "",
          // eslint-disable-next-line no-bitwise
          data,
          backgroundColor: "#6366f1",
          borderColor: "#6366f1",
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data, labels]);

  return (
    <Card className="flex-1 h-full overflow-hidden" title={title}>
      <Chart
        type="radar"
        data={chartData}
        options={chartOptions}
        className="w-full h-full md:w-30rem"
      />
    </Card>
  );
}
