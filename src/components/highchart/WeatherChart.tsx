'use client';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";
import { WeatherResponse } from "@/types/WeatherResponse";

export function WeatherChart({ data }: { data: WeatherResponse[] }) {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "line",
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: data.map((item) => item.time),
      visible: false
    },
    yAxis: {
      title: {
        text: "[mm]"
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: "line",
        name: "降水量",
        data: data.map((item) => item.value),
      },
    ],
    credits: {
      enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}