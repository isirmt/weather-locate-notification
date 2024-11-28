'use client';

import { useMemo, useState } from "react";
import DefaultInput from "../field/DefaultInput";
import DefaultButton from "../field/DefaultButton";
import { addPoint } from "@/lib/PointReduxManager";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { useOverlay } from "./OverlayProvider";
import dynamic from "next/dynamic";
import LoadingCircle from "../LoadingCircle";

export default function RegisterPoint() {
  const [name, setName] = useState<string>("地点名");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
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
      longitude: Number(latitude),
      uuid: uuid()
    }

    dispatch(addPoint(point));
    closeOverlay();
  }

  return <div className="flex flex-col gap-4 items-center">
    <h3 className="font-bold text-center text-lg">地点を追加</h3>
    <div>
      <DefaultInput placeholder="地点名" value={name} setValue={(val) => setName(val)} />
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      <DefaultInput placeholder="緯度" value={latitude} setValue={(val) => setLatitude(val)} />
      <DefaultInput placeholder="経度" value={longitude} setValue={(val) => setLongitude(val)} />
    </div>
    <div className="w-full h-64 relative rounded-lg border overflow-clip">
      <LeafletMap />
    </div>
    <div>
      <DefaultButton onClick={handleRegister}>
        登録
      </DefaultButton>
    </div>
  </div>
}