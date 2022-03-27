import { Component, HostListener, ViewEncapsulation, Injectable } from '@angular/core';
import SwiperCore, { Pagination } from "swiper";

import { WeatherService } from '../weather.service';
import { WeatherObject } from '../weather.model';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})

@Injectable()
export class WeatherComponent {
  isMobile = false;
  currentTime = "";
  weatherList: WeatherObject[] = [];

  constructor(private weatherService: WeatherService) {
    weatherService.getWeather().subscribe(({ currentFormattedTime, weatherWeekData }) => {
      this.weatherList = weatherWeekData;
      this.currentTime = currentFormattedTime;
    })
    this.isMobile = window.innerWidth <= 600;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isMobile = window.innerWidth <= 600;
  }
}
