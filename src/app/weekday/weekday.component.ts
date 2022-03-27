import { Component, Input } from '@angular/core';
import { WeatherObject } from '../weather.model';

@Component({
  selector: 'app-weekday-component',
  templateUrl: './weekday.component.html',
  styleUrls: ['./weekday.component.css']
})
export class WeekdayComponent {

  @Input() dayData!: WeatherObject;
  constructor() { }
}
