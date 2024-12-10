import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import RainPointContent from "./RainPointContent";

export default function RainList() {
  const points = useSelector((state: RootState) => state.pointsState.points);

  return <ul className="w-full flex flex-col items-center">
    {points.map((point) => <li key={point.uuid} className="w-full p-2">
      <RainPointContent point={point} />
    </li>)}
  </ul>
}