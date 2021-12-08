import { Component } from '@angular/core';
import { Base64UrlString } from '@digitalpersona/core';

interface iStepData {
  fingerData: Base64UrlString;
  imageData: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public step = 1;
  public isFingeringDeviceConnected = false;
  public stepData: iStepData;

  constructor() {
    this.stepData = {
      fingerData: '',
      imageData: '',
    };
  }

  public ngOnInit() {}

  public updateSampleAcquired = (data: Base64UrlString) => {
    this.stepData.fingerData = data;
  };
}
