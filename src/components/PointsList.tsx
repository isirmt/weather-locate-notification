'use client';

import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPoint } from '@/lib/PointReducer';
import { RootState } from '@/lib/store';
import { useOverlay } from './overlay/OverlayProvider';
import RegisterPoint from './overlay/RegisterPoint';

export default function PointsList() {
  const points = useSelector((state: RootState) => state.pointsState.points);
  const currentPoint = useSelector((state: RootState) => state.pointsState.currentPoint);
  const { openOverlay } = useOverlay();
  const dispatch = useDispatch();

  return (
    <ul className='sticky top-0 z-30 flex w-full flex-shrink-0 items-stretch justify-center overflow-x-auto bg-sky-800 shadow scrollbar-thin'>
      {points.map((point) => (
        <li key={point.uuid} className='flex items-stretch'>
          <button
            onClick={() => {
              dispatch(changeCurrentPoint(point.uuid));
            }}
            className={`flex items-center justify-center gap-1 whitespace-nowrap border-b-4 p-2 font-bold text-white transition-colors hover:border-b-sky-400 hover:bg-sky-600 ${point.uuid === currentPoint?.uuid ? 'border-b-sky-400 bg-sky-600' : 'border-b-sky-600'}`}
          >
            {point.name}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => {
            openOverlay(<RegisterPoint />);
          }}
          className='flex items-center justify-center gap-1 whitespace-nowrap border-b-4 border-b-sky-600 p-2 font-bold text-white transition-colors hover:border-b-sky-400 hover:bg-sky-600'
        >
          <span className='i-tabler-circle-plus size-5' />
          <span>地点を追加</span>
        </button>
      </li>
    </ul>
  );
}
