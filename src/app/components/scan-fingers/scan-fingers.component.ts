import { Component, OnInit } from '@angular/core';
import { FingerprintReader } from '@digitalpersona/devices';

@Component({
  selector: 'app-scan-fingers',
  templateUrl: './scan-fingers.component.html',
  styleUrls: ['./scan-fingers.component.scss']
})
export class ScanFingersComponent implements OnInit {

  private reader!: FingerprintReader;

  constructor() { }

  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.reader.enumerateDevices().then(console.log)
  }

}
