import { Base64String } from '@digitalpersona/core';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageInfo {
  id: string | number;
  marked_image_path: string;
}

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss'],
})
export class ImageSelectionComponent implements OnInit, OnChanges {
  @Output() public selectedImage = new EventEmitter();
  @Input() public isImageGenerating: boolean;
  @Input() public stepIndex = 0;
  @Input() public profilePhoto: Base64String;

  public images: ImageInfo[];
  public selectedImageIndex: number;

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.selectedImageIndex = -1;
    this.images = [];
  }

  public ngOnChanges(): void {
    if (this.stepIndex === 2) {
      this.submitData();
    } else {
      this.images = [];
    }
  }

  public selectImage(imageIndex: number): void {
    this.selectedImageIndex = imageIndex;
    this.selectedImage.emit(this.images[imageIndex]);
  }

  get title(): string {
    return this.selectedImageIndex > -1
      ? 'Click "Next" button to finish your process!'
      : 'Please choose one image!';
  }

  private submitData(): Subscription {
    return this.httpClient
      .post<any>('https://poc-version3.herokuapp.com/api/v1/generate-images', {
        logo: this.profilePhoto,
      })
      .subscribe((imgs) => {
        this.images = imgs;
      });
  }
}
