import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Advisor } from '../../advisors-info/advisor/advisor.model';

@Component({
  selector: 'app-advisor-preview',
  templateUrl: './advisor-preview.component.html',
  styleUrls: ['./advisor-preview.component.scss']
})
export class AdvisorPreviewComponent implements OnInit {
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
