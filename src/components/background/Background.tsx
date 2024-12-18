'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SendNotice } from '@/lib/NoticeManager';
import { GetRainfallData } from '@/lib/WeatherIndexGetter';
import { RootState } from '@/lib/store';
import { GetPrediction } from '@/lib/weather';
import { WeatherPoint } from '@/types/WeatherPoint';
import { useOverlay } from '../overlay/OverlayProvider';

export default function Background() {
  const points = useSelector((state: RootState) => state.pointsState.points);
  const settings = useSelector((state: RootState) => state.settingsState);
  const { openOverlay } = useOverlay();

  useEffect(() => {
    const intervalId = setInterval(
      async () => {
        const rainComingSpots: WeatherPoint[] = [];
        await Promise.all(
          points.map(async (point) => {
            const data = await GetPrediction(point.latitude, point.longitude, 'Asia/Tokyo');
            const futureData = GetRainfallData(data, settings.checkingAfterMinute);
            if (!futureData) return;
            const currentData = data[futureData.index - 1];
            if (currentData.value === 0 && futureData.data.value > 0) {
              // if (true) {
              rainComingSpots.push(point);
            }
          }),
        );

        if (rainComingSpots.length > 0) {
          SendNotice({
            title: '◆◇◆◇天気通知◇◆◇◆',
            body: `${settings.checkingAfterMinute}分後に雨が降ります！お気をつけて！☔\n対象地域: ${rainComingSpots.map((spot) => spot.name).join('/')}`,
          });
          openOverlay(
            <div>
              {settings.checkingAfterMinute}分後に雨が降り出します！☔
              <br />
              対象地域: {rainComingSpots.map((spot) => spot.name).join('/')}
            </div>,
          );
        }
      },
      settings.backgroundNoticeInterval * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [openOverlay, points, settings.backgroundNoticeInterval, settings.checkingAfterMinute]);

  return null;
}
