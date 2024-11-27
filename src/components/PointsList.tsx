'use client'

import { useSelector } from "react-redux"
import { RootState } from "@/lib/PointReduxManager"
import { useOverlay } from "./overlay/OverlayProvider";

export default function PointsList() {
  const points = useSelector((state: RootState) => state.pointsState.points);
  const currentPoint = useSelector((state: RootState) => state.pointsState.currentPoint);
  const { openOverlay } = useOverlay();

  return (
    <ul className="w-full bg-sky-800 flex items-stretch justify-center sticky top-10 z-30 shadow">
      {points.map((point) => (
        <li key={point.uuid} className="flex items-stretch">
          <button className={`flex items-center justify-center gap-1 text-white font-bold hover:bg-sky-600 transition-colors p-2 border-b-4 hover:border-b-sky-400 ${point.uuid === currentPoint.uuid ? "bg-sky-600 border-b-sky-400" : "border-b-sky-600"}`}>
            {point.name}
          </button>
        </li>
      ))}
      <li>
        <button onClick={() => {
          openOverlay(
            <div>
              Test Overlay
            </div>
          )
        }} className="flex items-center justify-center gap-1 text-white font-bold hover:bg-sky-600 transition-colors p-2 border-b-4 hover:border-b-sky-400">
          <span className="i-tabler-circle-plus size-5"></span>
          <span>地点を追加</span>
        </button>
      </li>
    </ul>);
}