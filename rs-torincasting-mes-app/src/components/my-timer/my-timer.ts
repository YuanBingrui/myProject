import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'my-timer',
  templateUrl: 'my-timer.html'
})
export class MyTimerComponent {
  presentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
  timeID: any;

  constructor() {
    console.log('Hello MyTimerComponent Component');
    this.getPresentTime();
  }

  getPresentTime() {
    this.timeID = setInterval(() => {
      this.presentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    }, 1000)
  }

  ngOnDestroy() {
    this.timeID && clearInterval(this.timeID);
  }

}
