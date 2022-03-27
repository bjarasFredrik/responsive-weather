import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { WeekdayComponent } from './weekday/weekday.component';
import { WeekComponent } from './week/week.component';
import { CurrentDayComponent } from './current-day/current-day.component';
import { WeatherComponent } from './weather-page/weather-page.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  imports: [
    SwiperModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: WeatherComponent },

    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    WeekdayComponent,
    WeekComponent,
    CurrentDayComponent,
    WeatherComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }