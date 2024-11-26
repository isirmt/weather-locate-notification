import WeatherChartContainer from "@/components/highchart/WeatherChartContainer";
import { OverlayProvider } from "@/components/overlay/OverlayProvider";
import PointsList from "@/components/PointsList";
import PointsReduxWrapper from "@/components/PointsReduxWrapper";
import PointsSync from "@/components/PointsSync";
import SendNoticeTestButton from "@/components/SendNotice";

export default async function Home() {
  return (
    <main className="lg:ml-64 relative pt-10 transition-transform">
      <PointsReduxWrapper>
        <PointsSync />
        <OverlayProvider>
          <PointsList />
          <WeatherChartContainer />
          <SendNoticeTestButton />
        </OverlayProvider>
      </PointsReduxWrapper>
    </main>
  );
}
