import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss'],
})
export class FinishStepComponent implements OnInit {
  @Input() selectedImage: string;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
