import { Component, Input } from '@angular/core';
import { WeatherObject } from '../weather.model';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent {

  @Input() weekdays: WeatherObject[] = [];
  constructor() { }
}
