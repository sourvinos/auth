import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WeatherService {

    private weatherData: any

    constructor(private http: HttpClient) { }

    getWeatherData() {
        this.weatherData = this.http.get<any>('https://localhost/api/weather/weatherforecast')

        console.log(this.weatherData)

        return this.weatherData
    }

}