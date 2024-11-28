'use client'
import WeatherChartContainer from "@/components/highchart/WeatherChartContainer";
import PointsList from "@/components/PointsList";
import SendNoticeTestButton from "@/components/SendNotice";

export default function Home() {
  return (
    <main className="flex-grow overflow-y-auto lg:ml-64 relative transition-transform flex flex-col items-center">
      <PointsList />
      <WeatherChartContainer />
      <SendNoticeTestButton />
    </main>
  );
}
