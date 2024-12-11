'use client';
import React from 'react';
import { toZonedTime } from 'date-fns-tz';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { WeatherResponse } from '@/types/WeatherResponse';

export function WeatherChart({ data }: { data: WeatherResponse[] }) {
  if (!data.length) return null;

  const generateBackgroundColor = (index: number) => {
    const colors = ['#ffcccc70', '#ccffcc70', '#ccccff70'];
    return colors[index % colors.length]; // 色を繰り返し使用
  };

  const startDate = new Date(data[0].time);
  const startTime = toZonedTime(startDate, 'Asia/Tokyo').getTime();
  const endDate = new Date(data[data.length - 1].time);
  const endTime = toZonedTime(endDate, 'Asia/Tokyo').getTime();

  const plotBands = [];
  for (let i = startTime; i < endTime; i += 24 * 60 * 60 * 1000) {
    plotBands.push({
      color: generateBackgroundColor(plotBands.length),
      from: i,
      to: i + 24 * 60 * 60 * 1000,
    });
  }

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      min: startTime,
      max: endTime,
      plotBands,
    },
    yAxis: {
      title: {
        text: '[mm]',
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'line',
        name: '降水量',
        data: data.map((item) => [new Date(item.time).getTime(), item.value]),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
