import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import RainPointContent from "./RainPointContent";
import { useOverlay } from "./overlay/OverlayProvider";
import RegisterPoint from "./overlay/RegisterPoint";

export default function RainList() {
  const points = useSelector((state: RootState) => state.pointsState.points);
  const { openOverlay } = useOverlay();

  return <ul className="w-full flex flex-col items-center">
    {points.map((point) => <li key={point.uuid} className="w-full p-2">
      <RainPointContent point={point} />
    </li>)}
    <li className="w-full relative p-4">
      <button
        onClick={() => {
          openOverlay(<RegisterPoint />);
        }}
        className="px-2 py-6 w-full flex items-center justify-center gap-1.5 border-4 border-sky-200 bg-sky-100 rounded text-sky-700 font-bold transition-colors hover:bg-sky-200">
        <span className="i-tabler-circle-plus" />
        地点を追加
      </button>
    </li>
  </ul>
}