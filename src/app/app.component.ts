import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  step = 1;
  isFingeringDeviceConnected = false;

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit() {
  }
}
