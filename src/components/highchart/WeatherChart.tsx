'use client';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";
import { WeatherResponse } from "@/types/WeatherResponse";

export function WeatherChart({ data }: { data: WeatherResponse[] }) {
  const chartOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "Precipitation forecast at 15 minute intervals",
    },
    xAxis: {
      categories: data.map((item) => item.time),
      title: {
        text: "Time",
      },
      labels: {
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "Precipitation (mm)",
      },
    },
    series: [
      {
        name: "Precipitation",
        data: data.map((item) => item.value),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}