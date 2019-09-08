import { AccountService } from './../services/account.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

    private weatherData: any

    constructor(private weatherService: WeatherService, private accountService: AccountService) { }

    ngOnInit() {
        console.log(this.weatherService.getWeatherData())

        this.weatherService.getWeatherDataAPI().subscribe(result => {
            console.log(result)
            this.weatherData = result
        })
    }

}