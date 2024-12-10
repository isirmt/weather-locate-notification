'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addPoint } from '@/lib/PointReducer';
import LoadingCircle from '../LoadingCircle';
import DefaultButton from '../field/DefaultButton';
import DefaultInput from '../field/DefaultInput';
import { useOverlay } from './OverlayProvider';

export default function RegisterPoint() {
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('35.681236');
  const [longitude, setLongitude] = useState<string>('139.767125');
  const dispatch = useDispatch();
  const { closeOverlay } = useOverlay();

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('@/components/map/LeafletMap'), {
        loading: () => (
          <div className='flex size-full items-center justify-center'>
            <LoadingCircle />
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  const handleRegister = () => {
    if (name.trim() === '' || latitude.trim() === '' || longitude.trim() === '') return;
    const point = {
      name,
      latitude: Number(latitude),
      longitude: Number(longitude),
      uuid: uuid(),
    };

    dispatch(addPoint(point));
    closeOverlay();
  };

  const handleMapClick = useCallback((_latitude: number, _longitude: number) => {
    setLatitude(_latitude.toString());
    setLongitude(_longitude.toString());
  }, []);

  return (
    <div className='flex flex-col items-center gap-4'>
      <h3 className='text-center text-lg font-bold'>地点を追加</h3>
      <div>
        <DefaultInput placeholder='地点名 (必須)' value={name} setValue={(val) => setName(val)} />
      </div>
      <div className='flex flex-wrap justify-center gap-2'>
        <DefaultInput placeholder='緯度 (必須)' value={latitude} setValue={(val) => setLatitude(val)} />
        <DefaultInput placeholder='経度 (必須)' value={longitude} setValue={(val) => setLongitude(val)} />
      </div>
      <div className='relative h-64 w-full overflow-clip rounded-lg border'>
        <LeafletMap
          onLocationSelect={handleMapClick}
          initialPos={{ latitude: Number(latitude), longitude: Number(longitude) }}
        />
      </div>
      <div>
        <DefaultButton onClick={handleRegister}>登録</DefaultButton>
      </div>
    </div>
  );
}
