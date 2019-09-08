import { TimerService } from './services/countdown.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'ClientApp';
    countdown = 0

    constructor(private timerService: TimerService) {
        this.timerService.reset()
        this.timerService.countdown.subscribe(data => { this.countdown = data })
    }

}
