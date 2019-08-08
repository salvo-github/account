import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Advisor } from './advisor.model';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss']
})
export class AdvisorComponent implements OnInit {
  @Input() public advisor: FormGroup;

  constructor() {}

  ngOnInit() {}

  public getAdvisorPropertyLabel(property): string {
    return Advisor.getLabel(property);
  }

  public getAdvisorPropertyOrder(): string[] {
    return Advisor.getPropertyOrder();
  }
}
