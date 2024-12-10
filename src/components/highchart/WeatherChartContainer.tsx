'use client';

import { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { GetRainfallData } from '@/lib/WeatherIndexGetter';
import { GetPrediction } from '@/lib/weather';
import { WeatherPoint } from '@/types/WeatherPoint';
import { WeatherResponse } from '@/types/WeatherResponse';
import { WeatherChart } from './WeatherChart';

export default function WeatherChartContainer({ point, small = false }: { point: WeatherPoint; small?: boolean }) {
  const [data, setData] = useState<WeatherResponse[]>([]);
  const nowData = GetRainfallData(data);

  useEffect(() => {
    const getData = async () => {
      setData(await GetPrediction(point.latitude, point.longitude, 'Asia/Tokyo'));
    };
    getData();
  }, [point.latitude, point.longitude]);

  const dropAmount = Math.round((nowData?.data.value ?? 0) * 10) / 10;

  return (
    <div
      className={`w-11/12 p-3 ${!small ? 'min-h-96' : 'min-h-40'} flex flex-col items-stretch justify-center gap-6 xl:flex-row`}
    >
      <div className={`flex ${!small ? 'justify-between' : 'justify-center'} px-2 xl:flex-col`}>
        {!small && <h2 className='my-2 block text-lg font-bold'>{point.name}</h2>}
        <div className='p-2'>
          <div className='flex items-center gap-1'>
            <span className='i-tabler-clock-filled' />
            現在({nowData ? toZonedTime(parseISO(nowData?.data.time), 'Europe/London').toLocaleTimeString('ja-JP') : ''}
            )
          </div>
          <div className={`flex items-center gap-1 font-bold ${dropAmount > 0 ? 'text-sky-800' : 'text-black'}`}>
            <span className='i-tabler-droplet-filled' />
            {dropAmount} [mm]
          </div>
        </div>
      </div>
      <WeatherChart data={data} />
    </div>
  );
}
