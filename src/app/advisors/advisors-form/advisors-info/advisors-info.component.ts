import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Account } from '../account.model';
import { AccountsService } from '../accounts.service';
import { Advisor } from './advisor/advisor.model';

@Component({
  selector: 'app-advisors-info',
  templateUrl: './advisors-info.component.html',
  styleUrls: ['./advisors-info.component.scss']
})
export class AdvisorsInfoComponent implements OnInit {
  public advisors: Advisor[];

  @Input() public advisorsFormArray: FormArray;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    if (!this.advisorsFormArray.length) {
      this.addNewAdvisor();
    }
  }

  public addNewAdvisor(): void {
    this.accountsService.addAdvisorToAdvisorsArray();
  }

  public removeAdvisorByIndex(index: number): void {
    this.accountsService.removeAdvisorFromAdvisorsArray(index);
  }

  public showDelete(): boolean {
    const minAmountAdvisors = Account.getMinAmountAdvisors();
    if (this.advisorsFormArray.length > minAmountAdvisors) {
      return true;
    }
    return false;
  }

  public showAdd(): boolean {
    const maxAmountAdvisors = Account.getMaxAmountAdvisors();
    if (this.advisorsFormArray.length < maxAmountAdvisors) {
      return true;
    }
    return false;
  }
}
