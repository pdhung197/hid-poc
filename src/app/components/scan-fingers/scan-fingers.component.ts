import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FingerprintReader,
  QualityCode,
  QualityReported,
  SampleFormat,
} from '@digitalpersona/devices';

enum ScanStatus {
  Successful = 'successful',
  Failed = 'failed',
  Empty = 'empty',
}

enum StatusColor {
  EMPTY = 'gray',
  SUCCESS = 'green',
  FAILED = 'red',
}

@Component({
  selector: 'app-scan-fingers',
  templateUrl: './scan-fingers.component.html',
  styleUrls: ['./scan-fingers.component.scss'],
})
export class ScanFingersComponent implements OnInit {
  private reader!: FingerprintReader;

  @Input() public isReaderConnected: boolean;
  @Output() public isReaderConnectedChange = new EventEmitter<boolean>();

  @Input() public step: number;
  @Output() public stepChange = new EventEmitter<number>();

  public scanStatus: ScanStatus;
  public eScanStatus = ScanStatus;

  constructor() {
    this.isReaderConnected = false;
    this.step = 1;
    this.reader = new FingerprintReader();
    this.scanStatus = ScanStatus.Empty;
  }

  ngOnInit(): void {
    this.handleFingerprintDeviceEvent();
  }

  public handleDeviceConnectionStatus = (isConnected: boolean) => {
    this.isReaderConnectedChange.emit(isConnected);
  };

  public resetScanningStatus = () => {
    console.log('Fire');
    this.scanStatus = ScanStatus.Empty;
  };

  get scanStatusColor(): StatusColor {
    if (!this.isReaderConnected) {
      return StatusColor.EMPTY;
    }

    switch (this.scanStatus) {
      case ScanStatus.Failed:
        return StatusColor.FAILED;
      case ScanStatus.Successful:
        return StatusColor.SUCCESS;
      default:
        return StatusColor.EMPTY;
    }
  }

  get scanStatusMessage(): string {
    if (!this.isReaderConnected) {
      return 'Please connect<br />fingerprint device';
    }

    switch (this.scanStatus) {
      case ScanStatus.Empty:
        return 'Please scan<br />your fingers';
      case ScanStatus.Successful:
        return 'Scan successful';
      case ScanStatus.Failed:
        return 'Scan failed';
      default:
        return '';
    }
  }

  private handleFingerprintDeviceEvent = async () => {
    this.reader.on('DeviceConnected', () => {
      this.handleDeviceConnectionStatus(true);
    });

    this.reader.on('DeviceDisconnected', () => {
      this.resetScanningStatus();
      this.handleDeviceConnectionStatus(false);
    });

    this.reader.on('QualityReported', (event: QualityReported) => {
      const { quality } = event;
      this.handleQualityReport(quality);
    });

    this.reader.startAcquisition(SampleFormat.Intermediate);
  };

  private handleQualityReport = (quality: QualityCode) => {
    if (quality === QualityCode.Good) {
      this.scanStatus = ScanStatus.Successful;
      this.stepChange.emit(2);
    } else {
      this.scanStatus = ScanStatus.Failed;
    }
  };
}
