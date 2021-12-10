import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';

interface ImageSoure {
  src: string;
}

const fakeImages: ImageSoure[] = [
  {
    src: '1.jpeg',
  },
  {
    src: '2.jpeg',
  },
  {
    src: '3.jpeg',
  },
  {
    src: '4.jpeg',
  },
];

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss'],
})
export class ImageSelectionComponent implements OnInit, OnChanges {
  @Output() public selectedImage = new EventEmitter();
  @Input() public isImageGenerating: boolean;

  public timer$: Observable<boolean>;
  public fakeImages: ImageSoure[];
  public selectedImageIndex: number;
  private timerSubject = new BehaviorSubject(false);

  public ngOnInit(): void {
    this.timer$ = this.timerSubject.asObservable().pipe(debounceTime(2000));
    this.selectedImageIndex = -1;
    this.fakeImages = fakeImages;
  }

  public ngOnChanges(): void {
    console.log({ t: this.isImageGenerating });
    if (this.isImageGenerating) {
      this.timerSubject.next(true);
    } else {
      this.timerSubject.next(false);
    }
  }

  public selectImage(imageIndex: number): void {
    this.selectedImageIndex = imageIndex;
    this.selectedImage.emit(this.fakeImages[imageIndex]);
  }

  get title(): string {
    return this.selectedImageIndex > -1
      ? 'Click "Next" button to finish your process!'
      : 'Please choose one image!';
  }
}
