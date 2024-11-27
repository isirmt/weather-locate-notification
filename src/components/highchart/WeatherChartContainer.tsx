'use client';

import { GetPrediction } from "@/lib/weather";
import { WeatherResponse } from "@/types/WeatherResponse";
import { useEffect, useState } from "react";
import { WeatherChart } from "./WeatherChart";
import { RootState } from "@/lib/PointReduxManager";
import { useSelector } from "react-redux";

export default function WeatherChartContainer() {
  const currentPoint = useSelector((state: RootState) => state.pointsState.currentPoint);
  
  const [data, setData] = useState<WeatherResponse[]>([])
  useEffect(() => {
    const getData = async () => {
      setData(await GetPrediction(currentPoint.latitude, currentPoint.longitude, "Asia/Tokyo"));
    }
    getData();
  }, [currentPoint.latitude, currentPoint.longitude])
  return <WeatherChart data={data} />
}