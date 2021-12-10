import { Component } from '@angular/core';
import { Base64UrlString } from '@digitalpersona/core';

interface IStepModel {
  fingerprint: Base64UrlString;
  photo: any;
  selectedImage: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isFingeringDeviceConnected = false;
  public stepModel!: IStepModel;
  public isImageGenerating = true;

  constructor() {
    this.stepModel = {
      fingerprint: '',
      photo: '',
      selectedImage: ''
    };
  }

  public updateSampleAcquired = (data: Base64UrlString) => {
    this.stepModel.fingerprint = data;
  };

  public changeStep(step: any): void {
    this.isImageGenerating = step.selectedIndex === 2;
  }

  public capturedPhoto(photo: Base64UrlString) {
    this.stepModel.photo = photo;
  }

  public selectImage = (data: any) => {
    this.stepModel.selectedImage = data.src;
  };
}
