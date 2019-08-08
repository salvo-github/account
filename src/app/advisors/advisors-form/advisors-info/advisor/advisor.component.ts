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
  public advisorFormGroup: FormGroup;
  @Output() advisorFormGruoupCreated = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    this.advisorFormGroup = new FormGroup({});
    for (const prop in this.advisor) {
      if (this.advisor.hasOwnProperty(prop)) {
        const advisorPropControl = new FormControl(this.advisor[prop], [
          Validators.required
        ]);

        this.advisorFormGroup.addControl(prop, advisorPropControl);
      }
    }

    this.advisorFormGruoupCreated.emit(this.advisorFormGroup);
  }

  ngAfterViewInit() {}

  public getAdvisorPropertyLabel(property): string {
    return Advisor.getLabel(property);
  }

  public getAdvisorPropertyOrder(): string[] {
    return Advisor.getPropertyOrder();
  }
}
