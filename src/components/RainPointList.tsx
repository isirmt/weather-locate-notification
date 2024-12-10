import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import RainPointContent from './RainPointContent';
import { useOverlay } from './overlay/OverlayProvider';
import RegisterPoint from './overlay/RegisterPoint';

export default function RainList() {
  const points = useSelector((state: RootState) => state.pointsState.points);
  const { openOverlay } = useOverlay();

  return (
    <ul className='flex w-full flex-col items-center'>
      {points.map((point) => (
        <li key={point.uuid} className='w-full p-2'>
          <RainPointContent point={point} />
        </li>
      ))}
      <li className='relative w-full p-4'>
        <button
          onClick={() => {
            openOverlay(<RegisterPoint />);
          }}
          className='flex w-full items-center justify-center gap-1.5 rounded border-4 border-sky-200 bg-sky-100 px-2 py-6 font-bold text-sky-700 transition-colors hover:bg-sky-200'
        >
          <span className='i-tabler-circle-plus' />
          地点を追加
        </button>
      </li>
    </ul>
  );
}
