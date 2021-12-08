import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { BehaviorSubject, debounceTime, filter, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss'],
})
export class ImageSelectionComponent implements OnInit, OnChanges {
  @Output() public selectedImage = new EventEmitter();
  @Input() public isImageGenerating: boolean;

  public timer$: Observable<boolean>;
  private timerSubject = new BehaviorSubject(false);

  public ngOnInit(): void {
    this.timer$ = this.timerSubject.asObservable().pipe(debounceTime(2000));
  }

  public ngOnChanges(): void {
    if (this.isImageGenerating) {
      this.timerSubject.next(true);
    } else {
      this.timerSubject.next(false);
    }
  }

  public selectImage(): void {
    this.selectedImage.emit();
  }
}
