import { Component, OnInit } from '@angular/core';
import {
  animationFrameScheduler,
  delay,
  interval,
  Observable,
  take,
} from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { observeOn } from 'rxjs/internal/operators/observeOn';
import { asapScheduler } from 'rxjs/internal/scheduler/asap';
import { asyncScheduler } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-scheduler';
  progress$!: Observable<number>;
  progress2$!: Observable<number>;

  ngOnInit(): void {
    this.progress$ = interval(1000 / 60).pipe(take(100));
    this.progress2$ = interval(0, animationFrameScheduler).pipe(take(100));
  }

  RunAsync() {
    setTimeout(() => console.log('SetTimeout callback'), 0); //macro task
    Promise.resolve('promise value').then(console.log); // micro task;
    of('micro task value')
      .pipe(observeOn(asapScheduler))
      .subscribe(console.log); //convert to micro task
    of('macro task value')
      .pipe(observeOn(asyncScheduler))
      .subscribe(console.log); //convert to macro task
    of('macro task 3 value')
      .pipe(delay(3, asyncScheduler))
      .subscribe(console.log); //convert to macro task
    of('macro task 2 value')
      .pipe(delay(2, asyncScheduler))
      .subscribe(console.log); //convert to macro task
  }

  // FIRST RUN MICRO TASKES IN ORDER THEN RUN MACRO TASKES IN ORDER
}
