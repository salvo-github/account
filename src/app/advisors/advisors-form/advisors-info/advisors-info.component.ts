import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Advisor } from './advisor/advisor.model';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-advisors-info',
  templateUrl: './advisors-info.component.html',
  styleUrls: ['./advisors-info.component.scss']
})
export class AdvisorsInfoComponent implements OnInit {
  public advisors: Advisor[];

  @Input() public formGroup: FormGroup;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {}

  public get advisorsFormArray(): FormArray {
    return this.formGroup.get('advisors') as FormArray;
  }

  public addNewAdvisor(): void {
    const advisor = new Advisor();
    const advisorFormGroup = this.accountsService.generateAdvisorForm(advisor);
    this.advisorsFormArray.push(advisorFormGroup);
  }

  public removeAdvisorByIndex(index: number): void {
    this.advisorsFormArray.removeAt(index);
  }
}
