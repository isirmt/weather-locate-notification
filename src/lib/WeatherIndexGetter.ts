import { WeatherResponse } from "@/types/WeatherResponse";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const GetRainfallData = (
  data: WeatherResponse[],
  minutesAfter: number = 0
) => {
  if (!data.length) return null;

  const now = new Date();
  const targetTime = new Date(now.getTime() + minutesAfter * 60 * 1000);

  for (let i = 0; i < data.length; i++) {
    // currently, the timezone is "Asia/Tokyo"
    const dataTime = toZonedTime(parseISO(data[i].time), "Europe/London");
    if (dataTime >= targetTime) {
      return { data: data[i], index: i };
    }
  }

  return null;
};