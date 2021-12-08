import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public step = 1;
  public isFingeringDeviceConnected = false;

  constructor() {}

  public ngOnInit() {}
}
