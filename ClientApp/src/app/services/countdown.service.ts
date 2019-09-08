import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AccountService } from './account.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class TimerService {

    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    countdown: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor(private idle: Idle, private keepalive: Keepalive, private accountService: AccountService) {

        idle.setIdle(1);
        idle.setTimeout(60);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => { this.timedOut = true; this.accountService.logout() });
        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        idle.onTimeoutWarning.subscribe((countdown: number) => {
            this.countdown.next(countdown)
        });

        this.keepalive.interval(15);
        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.reset();
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

}