import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Advisor } from './advisor.model';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.scss']
})
export class AdvisorComponent implements OnInit, AfterViewInit {
  @Input() public advisor: FormGroup;

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {}

  public getAdvisorPropertyLabel(property): string {
    return Advisor.getLabel(property);
  }

  public getAdvisorPropertyOrder(): string[] {
    return Advisor.getPropertyOrder();
  }
}
