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
      if (!currentPoint) {
        setData([]);
        return;
      }
      setData(await GetPrediction(currentPoint.latitude, currentPoint.longitude, "Asia/Tokyo"));
    }
    getData();
  }, [currentPoint, currentPoint?.latitude, currentPoint?.longitude])

  if (!currentPoint) return null;

  return <WeatherChart data={data} />
}