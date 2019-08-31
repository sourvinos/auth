import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

    private weather: any

    constructor(private weatherService: WeatherService) { }

    ngOnInit() {

        this.weather = this.weatherService.getWeatherData().subscribe((result: any) => console.log(result))

    }

}