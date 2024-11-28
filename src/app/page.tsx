'use client'
import WeatherChartContainer from "@/components/highchart/WeatherChartContainer";
import Main from "@/components/MainLayout";
import PointsList from "@/components/PointsList";
import SendNoticeTestButton from "@/components/SendNotice";

export default function Home() {
  return (
    <Main>
      <PointsList />
      <WeatherChartContainer />
      <SendNoticeTestButton />
    </Main>
  );
}
