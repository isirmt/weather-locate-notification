import { WeatherPoint } from '@/types/WeatherPoint';
import WeatherChartContainer from './highchart/WeatherChartContainer';

export default function RainPointContent({ point }: { point: WeatherPoint }) {
  return (
    <div className='relative flex w-full items-center justify-center p-10'>
      <div className='w-24 flex-shrink-0 p-2 text-lg font-bold'>{point.name}</div>
      <div className='flex flex-grow justify-center'>
        <WeatherChartContainer point={point} small />
      </div>
    </div>
  );
}
