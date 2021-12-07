import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FingerprintReader,
  QualityCode,
  QualityReported,
  SampleFormat,
} from '@digitalpersona/devices';

enum ScanStatus{
  Successful= 'Successful',
  Failed = 'Failed'
}

@Component({
  selector: 'app-scan-fingers',
  templateUrl: './scan-fingers.component.html',
  styleUrls: ['./scan-fingers.component.scss'],
})

export class ScanFingersComponent implements OnInit {
  private reader!: FingerprintReader;

  @Input() isReaderConnected: boolean;
  @Output() isReaderConnectedChange = new EventEmitter<boolean>();

  @Input() step: number;
  @Output() stepChange = new EventEmitter<number>();

  scanStatus?: ScanStatus;

  constructor() {
    this.isReaderConnected = false;
    this.step = 1;
    this.scanStatus = undefined;
  }

  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.reader.on('DeviceConnected', () => {
      this.handleDeviceConnectionStatusChange(true);
    });
    this.reader.on('DeviceDisconnected', (event) => {
      this.handleDeviceConnectionStatusChange(false);
    });
    this.reader.on('QualityReported', (event: QualityReported) => {
      const { quality } = event;
      this.handleQualityReport(quality);
    });
    this.reader.on('SamplesAcquired', async (event) => {
      console.log({ event });
      await this.reader.stopAcquisition();
      this.reader
        .startAcquisition(SampleFormat.Intermediate)
        .then((eventStart) => {
          console.log({ eventStart });
        });
    });
    this.reader.onAcquisitionStarted = (event) => {
      console.log({ event });
    };
    this.reader.onAcquisitionStopped = (eventStop) => {
      console.log({ eventStop });
    };
    this.reader.startAcquisition(SampleFormat.Intermediate).then((value) => {
      console.log({ value });
    });
  }

  private handleDeviceConnectionStatusChange = (isConnected: boolean) => {
    console.log({ isConnected });
    this.isReaderConnectedChange.emit(isConnected);
  };

  private handleQualityReport = (quality: QualityCode) => {
    console.log({quality});
    if (quality === QualityCode.Good) {
      this.scanStatus = ScanStatus.Successful;
      this.stepChange.emit(2);
    } else {
      this.scanStatus = ScanStatus.Failed
    }
  };

  resetScanningStatus = () => {
    this.scanStatus = undefined;
    console.log({scanStatus: this.scanStatus});
  };
}
