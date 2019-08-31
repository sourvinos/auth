import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class WeatherService {

    private weatherData: any = [
        { 'id': '1', 'description': 'Data 1' },
        { 'id': '2', 'description': 'Data 2' }]

    constructor(private http: HttpClient) { }

    getWeatherData() {
        return this.weatherData
    }

    getWeatherDataAPI() {
        return this.http.get<any>('/api/weather/weatherforecasts')
    }

}