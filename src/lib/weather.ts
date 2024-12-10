import { fetchWeatherApi } from 'openmeteo';
import { WeatherResponse } from '@/types/WeatherResponse';

export async function GetPrediction(latitude: number, longitude: number, timezone: string) {
  const params = {
    latitude,
    longitude,
    minutely_15: 'precipitation',
    timezone,
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  const minutely15 = response.minutely15()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    minutely15: {
      time: range(Number(minutely15.time()), Number(minutely15.timeEnd()), minutely15.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000),
      ),
      precipitation: minutely15.variables(0)!.valuesArray()!,
    },
  };

  const precipitations: WeatherResponse[] = [];
  for (let i = 0; i < weatherData.minutely15.time.length; i++) {
    precipitations.push({
      time: weatherData.minutely15.time[i].toISOString(),
      value: weatherData.minutely15.precipitation[i],
    });
  }
  return precipitations;
}
