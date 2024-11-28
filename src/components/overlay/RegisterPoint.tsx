'use client';

import { useCallback, useMemo, useState } from "react";
import DefaultInput from "../field/DefaultInput";
import DefaultButton from "../field/DefaultButton";
import { addPoint } from "@/lib/PointReduxManager";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { useOverlay } from "./OverlayProvider";
import dynamic from "next/dynamic";
import LoadingCircle from "../LoadingCircle";

export default function RegisterPoint() {
  const [name, setName] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("35.681236");
  const [longitude, setLongitude] = useState<string>("139.767125");
  const dispatch = useDispatch();
  const { closeOverlay } = useOverlay();
  
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('@/components/map/LeafletMap'), {
        loading: () => <div className="size-full flex justify-center items-center"><LoadingCircle /></div>,
        ssr: false,
      }),
    []
  );

  const handleRegister = () => {
    if (name.trim() === "" || latitude.trim() === "" || longitude.trim() === "") return;
    const point = {
      name,
      latitude: Number(latitude),
      longitude: Number(longitude),
      uuid: uuid()
    }

    dispatch(addPoint(point));
    closeOverlay();
  }

  const handleMapClick = useCallback((_latitude: number, _longitude: number) => {
    setLatitude(_latitude.toString());
    setLongitude(_longitude.toString());
  }, [])

  return <div className="flex flex-col gap-4 items-center">
    <h3 className="font-bold text-center text-lg">地点を追加</h3>
    <div>
      <DefaultInput placeholder="地点名 (必須)" value={name} setValue={(val) => setName(val)} />
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      <DefaultInput placeholder="緯度 (必須)" value={latitude} setValue={(val) => setLatitude(val)} />
      <DefaultInput placeholder="経度 (必須)" value={longitude} setValue={(val) => setLongitude(val)} />
    </div>
    <div className="w-full h-64 relative rounded-lg border overflow-clip">
      <LeafletMap onLocationSelect={handleMapClick} initialPos={{ latitude: Number(latitude), longitude: Number(longitude) }} />
    </div>
    <div>
      <DefaultButton onClick={handleRegister}>
        登録
      </DefaultButton>
    </div>
  </div>
}