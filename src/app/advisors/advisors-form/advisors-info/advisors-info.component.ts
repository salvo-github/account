import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Advisor } from './advisor/advisor.model';

@Component({
  selector: 'app-advisors-info',
  templateUrl: './advisors-info.component.html',
  styleUrls: ['./advisors-info.component.scss']
})
export class AdvisorsInfoComponent implements OnInit {
  public advisors: Advisor[];

  @Input() public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    // fetch
    this.advisors = [];

    if (this.advisors.length < 1) {
      const advisor = new Advisor();
      this.advisors.push(advisor);
    }

    if (this.advisorsFormArray) {
      this.clearFormArray();
    }
    this.initFormArray();
  }

  public get advisorsFormArray(): FormArray {
    return this.formGroup.get('advisors') as FormArray;
  }

  private clearFormArray(): void {
    this.formGroup.removeControl('advisors');
  }

  private initFormArray(): void {
    const advisorsControl = new FormArray([]);
    this.formGroup.addControl('advisors', advisorsControl);
  }

  public addNewAdvisor(): void {
    if (this.isAdvisorsAmountLimitReached()) {
      return;
    }
    const advisor = new Advisor();
    this.advisors.push(advisor);
  }

  public removeAdvisorByIndex(index: number): void {
    this.advisors.splice(index, 1);
    this.advisorsFormArray.removeAt(index);
  }

  public onAdvisorFormGroupCreated(advisorFormGroup: FormGroup): void {
    this.advisorsFormArray.push(advisorFormGroup);
  }

  public isAdvisorsAmountLimitReached(): boolean {
    if (this.advisors.length < 6) {
      return false;
    }
    return true;
  }
}
