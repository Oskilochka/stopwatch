import {Component} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public displayTime;
  public subscription;
  public isRunning = false;
  public startLabel = 'Start';
  public time;

  ngOnInit(): void {
    this.time = 0;
  }

  toggleTimer(): void {
    this.isRunning = !this.isRunning;
    this.stopwatch();
  }

  stopwatch(): void {
    this.subscription = timer(1000, 1000).subscribe(cycle => {
      if (this.isRunning) {
        this.time++;
        this.getDisplayTimer(this.time);
        this.startLabel = 'Stop';
      } else {
        this.startLabel = 'Start';
      }
    });
    if (this.startLabel === 'Stop') {
      this.displayTime = '00:00:00';
      this.time = 0;
      this.subscription.unsubscribe();
      this.startLabel = 'Start';
    }
  }

  getDisplayTimer(time: number): void {
    let hours = '' + Math.floor(time / 3600);
    let minutes = '' + Math.floor(time % 3600 / 60);
    let seconds = '' + Math.floor(time % 3600 % 60);

    if (Number(hours) < 10) {
      hours = '0' + hours;
    } else {
      hours = '' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }
    this.displayTime = hours + ':' + minutes + ':' + seconds;
  }

  onPause(): void {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    this.subscription.unsubscribe();
    this.startLabel = 'Start';
  }

  onReset(): void {
    this.displayTime = '00:00:00';
    this.time = 0;
  }
}
