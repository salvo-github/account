import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-advisors-info-preview',
  templateUrl: './advisors-info-preview.component.html',
  styleUrls: ['./advisors-info-preview.component.scss']
})
export class AdvisorsInfoPreviewComponent implements OnInit {
  public advisorsPreview = {
    id: 'advisorsPreview',
    default: false
  };

  @Input() formGroup: FormGroup;
  @Output() advisorPreviewValidity = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    const advisorsPreviewControl = new FormControl(false);

    this.formGroup.addControl(this.advisorsPreview.id, advisorsPreviewControl);

    advisorsPreviewControl.valueChanges.subscribe((value) => {
      this.advisorPreviewValidity.emit(value);
    });
  }
}
