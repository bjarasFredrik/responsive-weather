import { DatePipe, WeekDay } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { LegendData, WeatherObject, YrResponse } from './weather.model';
import { map, Observable } from 'rxjs';

import legendsJson from '../assets/weather-legends.json'
const legends: Record<string, LegendData> = legendsJson;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherList: WeatherObject[] = []

  constructor(@Inject(LOCALE_ID) public locale: string, private http: HttpClient) {
    this.getWeather()
  }

  getWeather(): Observable<{currentFormattedTime: string, weatherWeekData: WeatherObject[]}> {
    return this.http.get<YrResponse>('https://api.met.no/weatherapi/locationforecast/2.0/complete', {
      params: { lat: 57.7087, lon: 11.9751 },
    }).pipe(map((response) => {
      let currentTime = "";
      let currentDay: string;
      let minTemp: number | undefined;
      let maxTemp: number | undefined;
      let wind_speed: number | undefined;
      let symbol_code: string | undefined;

      const data: WeatherObject[] = [];
      response.properties.timeseries.every(timeslot => {
        const dateObject = new Date(timeslot.time);
        const weekday = new DatePipe(this.locale).transform(dateObject, 'EEEE') || '';
        const currentTemp = timeslot.data.instant.details.air_temperature;

        console.log(dateObject, currentDay, weekday)

        // Update MaxMin
        if (!maxTemp || currentTemp > maxTemp) {
          maxTemp = currentTemp;
        }
        if (!minTemp || currentTemp < minTemp) {
          minTemp = currentTemp;
        }

        if (!currentDay) { // Today
          currentDay = weekday;
          wind_speed = timeslot.data.instant.details.wind_speed;
          symbol_code = timeslot.data.next_1_hours?.summary.symbol_code;
          currentTime = new DatePipe(this.locale).transform(dateObject, 'HH:mm') || '';
        } else if (dateObject.getUTCHours() === 12) {
          currentDay = weekday;
          wind_speed = timeslot.data.instant.details.wind_speed;
          symbol_code = timeslot.data.next_6_hours?.summary.symbol_code;
          console.log(symbol_code)
        }

        if (weekday !== currentDay) { // New day
          console.log("saving", currentDay)
          data.push({
            day: currentDay,
            temperature: `${Math.round(minTemp)}-${Math.round(maxTemp)} °C`,
            wind: `${wind_speed || 0} ${response.properties.meta.units.wind_speed}`,
            description: legends[symbol_code?.split('_')[0] || ''].desc_en,
            icon: `/assets/svg/${symbol_code || ''}.svg`,
          })
          // Clear data
          wind_speed = undefined;
          symbol_code = undefined;
          maxTemp = undefined;
          minTemp = undefined;
          currentDay = weekday;

          if (data.length >= 7) {
            return false;
          }
        }
        return true;
      })
      return {currentFormattedTime: currentTime, weatherWeekData: data};
    }))
  }
}
