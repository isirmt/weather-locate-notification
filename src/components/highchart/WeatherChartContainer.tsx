'use client';

import { GetPrediction } from "@/lib/weather";
import { WeatherResponse } from "@/types/WeatherResponse";
import { useEffect, useState } from "react";
import { WeatherChart } from "./WeatherChart";
import { useSelector } from "react-redux";
import { GetRainfallData } from "@/lib/WeatherIndexGetter";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { RootState } from "@/lib/store";

export default function WeatherChartContainer() {
  const currentPoint = useSelector((state: RootState) => state.pointsState.currentPoint);
  const [data, setData] = useState<WeatherResponse[]>([])
  const nowData = GetRainfallData(data);

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

  const dropAmount = Math.round((nowData?.data.value ?? 0) * 10) / 10;

  return <div className="p-3 border-b-4 border-sky-500 w-11/12 min-h-96 flex flex-col gap-6 items-stretch xl:flex-row justify-center">
    <div className="flex justify-between px-2 xl:flex-col">
      <h2 className="block font-bold text-lg my-2">{currentPoint.name}</h2>
      <div className="p-2">
        <div className="flex items-center gap-1"><span className="i-tabler-clock-filled" />現在({nowData ? toZonedTime(parseISO(nowData?.data.time), "Europe/London").toLocaleTimeString("ja-JP") : ""})</div>
        <div className={`flex items-center gap-1 font-bold ${dropAmount > 0 ? "text-sky-800" : "text-black"}`}><span className="i-tabler-droplet-filled" />{dropAmount} [mm]</div>
      </div>
    </div>
    <WeatherChart data={data} />
  </div>
}