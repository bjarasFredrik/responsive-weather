import { Component, Input } from '@angular/core';
import { WeatherObject } from '../weather.model'

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.css']
})

export class CurrentDayComponent {

  @Input() dayData!: WeatherObject;
  @Input() currentTime!: string;

  constructor() { }
}
