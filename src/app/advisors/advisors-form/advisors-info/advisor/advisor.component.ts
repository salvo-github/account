import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Advisor } from './advisor.model';

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
