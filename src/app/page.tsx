'use client';
import { useSelector } from 'react-redux';
import Main from '@/components/MainLayout';
import PointsList from '@/components/PointsList';
import SendNoticeTestButton from '@/components/SendNotice';
import WeatherChartContainer from '@/components/highchart/WeatherChartContainer';
import { RootState } from '@/lib/store';

export default function Home() {
  const currentPoint = useSelector((state: RootState) => state.pointsState.currentPoint);

  return (
    <Main>
      <PointsList />
      {currentPoint && <WeatherChartContainer point={currentPoint} />}
      <SendNoticeTestButton />
    </Main>
  );
}
