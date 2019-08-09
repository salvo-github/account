import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-advisors-info-preview',
  templateUrl: './advisors-info-preview.component.html',
  styleUrls: ['./advisors-info-preview.component.scss']
})
export class AdvisorsInfoPreviewComponent implements OnInit {
  @Input() public advisorsFormArray: FormArray;

  constructor() {}

  ngOnInit() {}
}
