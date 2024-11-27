import WeatherChartContainer from "@/components/highchart/WeatherChartContainer";
import PointsList from "@/components/PointsList";
import PointsReduxWrapper from "@/components/PointsReduxWrapper";
import SendNoticeTestButton from "@/components/SendNotice";

export default async function Home() {
  return (
    <main className="lg:ml-64 relative pt-10 transition-transform">
      <PointsReduxWrapper>
        <PointsList />
        <WeatherChartContainer />
      </PointsReduxWrapper>
      <SendNoticeTestButton />
    </main>
  );
}
