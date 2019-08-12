import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account, AccountProperties } from './account.model';
import { Advisor } from './advisors-info/advisor/advisor.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private accountForm: FormGroup;

  private accountFormBehaviorSubject = new BehaviorSubject<FormGroup>(
    this.initAccountForm()
  );

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  // if the accountId it's not present on server the empty form it's displayed
  // a better way it's to show a 404 but it's not required in the specification
  public fetchAccountById(accountId): void {
    const url = `/assets/${accountId}.json`;

    // if the http request return 404 the last value (new Account()) will take from accountFormBehaviorSubject
    this.httpClient.get<Account>(url).subscribe((account) => {
      // server fetch time simulation
      setTimeout(() => {
        this.initAccountForm(account);
        this.accountFormBehaviorSubject.next(this.accountForm);
      }, 1000);
    });
  }

  public getAccountFormObservable(): Observable<FormGroup> {
    return this.accountFormBehaviorSubject.asObservable();
  }

  private initAccountForm(account?: Account): FormGroup {
    if (!account) {
      account = new Account();
    }
    this.generateAccountForm(account);

    this.generateAdvisorsArray(account);

    return this.accountForm;
  }

  private generateAccountForm(account: Account): void {
    this.accountForm = this.fb.group({
      [AccountProperties.serial]: [
        account[AccountProperties.serial],
        [Validators.required, Validators.pattern(Account.getSerialPattern())]
      ],
      [AccountProperties.preview]: [account[AccountProperties.preview]]
    });
  }

  /** generate advisors form array and if advisors is empty, add a new advisor */
  private generateAdvisorsArray(account: Account): void {
    const advisorsFormArray: FormArray = this.fb.array(
      account[AccountProperties.advisors].map((advisor) =>
        this.generateAdvisorFormGroup(advisor)
      ),
      [
        Validators.maxLength(Account.getMaxAmountAdvisors()),
        Validators.required
      ]
    );

    this.accountForm.addControl(AccountProperties.advisors, advisorsFormArray);

    if (!advisorsFormArray.length) {
      this.addAdvisorToAdvisorsArray();
    }
  }

  private generateAdvisorFormGroup(advisor: Advisor): FormGroup {
    return this.fb.group({
      email: [advisor.email, Validators.required],
      fullName: [advisor.fullName, Validators.required],
      accessCode: [advisor.accessCode, Validators.required]
    });
  }

  public getAdvisorsFormArray(): FormArray {
    return this.accountForm.get(AccountProperties.advisors) as FormArray;
  }

  public addAdvisorToAdvisorsArray(advisor?: Advisor): void {
    if (!advisor) {
      advisor = new Advisor();
    }
    const advisorFormGroup = this.generateAdvisorFormGroup(advisor);
    const advisorsFormArray = this.getAdvisorsFormArray();
    advisorsFormArray.push(advisorFormGroup);
  }

  public removeAdvisorFromAdvisorsArray(index: number): void {
    const advisorsFormArray = this.getAdvisorsFormArray();
    advisorsFormArray.removeAt(index);
  }
}
