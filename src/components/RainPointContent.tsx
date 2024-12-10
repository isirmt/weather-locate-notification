import { WeatherPoint } from "@/types/WeatherPoint";
import WeatherChartContainer from "./highchart/WeatherChartContainer";

export default function RainPointContent({point}: {point: WeatherPoint}) {
  return <div className="relative flex items-center w-full justify-center p-10">
    <div className="w-24 font-bold text-lg flex-shrink-0 p-2">{point.name}</div>
    <div className="flex-grow flex justify-center">
      <WeatherChartContainer point={point} small />
    </div>
  </div>
}