'use client';

import { GetPrediction } from "@/lib/weather";
import { WeatherResponse } from "@/types/WeatherResponse";
import { useEffect, useState } from "react";
import { WeatherChart } from "./WeatherChart";
import { GetRainfallData } from "@/lib/WeatherIndexGetter";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { WeatherPoint } from "@/types/WeatherPoint";

export default function WeatherChartContainer({point, small = false}: {point: WeatherPoint, small?: boolean}) {
  
  const [data, setData] = useState<WeatherResponse[]>([])
  const nowData = GetRainfallData(data);

  useEffect(() => {
    const getData = async () => {
      setData(await GetPrediction(point.latitude, point.longitude, "Asia/Tokyo"));
    }
    getData();
  }, [point.latitude, point.longitude])

  const dropAmount = Math.round((nowData?.data.value ?? 0) * 10) / 10;

  return <div className={`p-3 w-11/12 ${!small ? "min-h-96" : "min-h-40"} flex flex-col gap-6 items-stretch xl:flex-row justify-center`}>
    <div className={`flex ${!small ? "justify-between" : "justify-center"} px-2 xl:flex-col`}>
      {!small && <h2 className="block font-bold text-lg my-2">{point.name}</h2>}
      <div className="p-2">
        <div className="flex items-center gap-1"><span className="i-tabler-clock-filled" />現在({nowData ? toZonedTime(parseISO(nowData?.data.time), "Europe/London").toLocaleTimeString("ja-JP") : ""})</div>
        <div className={`flex items-center gap-1 font-bold ${dropAmount > 0 ? "text-sky-800" : "text-black"}`}><span className="i-tabler-droplet-filled" />{dropAmount} [mm]</div>
      </div>
    </div>
    <WeatherChart data={data} />
  </div>
}