import { WeatherChart } from "@/components/highchart/WeatherChart";
import SendNoticeTestButton from "@/components/SendNotice";
import { GetPrediction } from "@/lib/weather";

export default async function Home() {
  // Tokyo Sta.
  const prediction = await GetPrediction(35.681236, 139.767125, "Asia/Tokyo");

  return (
    <main className="lg:ml-64 transition-transform">
      <SendNoticeTestButton />
      <WeatherChart data={prediction} />
    </main>
  );
}
