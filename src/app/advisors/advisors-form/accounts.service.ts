import { Injectable } from '@angular/core';
import { Account } from './account.model';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Advisor } from './advisors-info/advisor/advisor.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private accountForm: FormGroup;

  private accountFormBehaviorSubject = new BehaviorSubject<FormGroup>(
    this.initAccountForm()
  );

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  public fetchAccountById($accountId): void {
    const url = `/assets/${$accountId}.json`;

    this.httpClient.get<Account>(url).subscribe(
      (account) => {
        // server fetch time simulation
        setTimeout(() => {
          this.initAccountForm(account);
          this.accountFormBehaviorSubject.next(this.accountForm);
        }, 1000);
      },
      (err) => {
        // this.initAccountForm();
        // this.accountFormBehaviorSubject.next(this.accountForm);
      }
    );
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

  private generateAccountForm(account: Account = new Account()): void {
    this.accountForm = this.fb.group({
      serial: [
        account.serial,
        [Validators.required, Validators.pattern(Account.getSerialPattern())]
      ],
      preview: [account.preview]
    });
  }

  /** generate advisors form array and if advisors is empty, add a new advisor */
  private generateAdvisorsArray(account: Account): void {
    const advisorsFormArray: FormArray = this.fb.array(
      account.advisors.map((advisor) => this.generateAdvisorForm(advisor)),
      [
        Validators.maxLength(Account.getMaxAmountAdvisors()),
        Validators.required
      ]
    );

    this.accountForm.addControl('advisors', advisorsFormArray);

    if (!advisorsFormArray.length) {
      this.addAdvisorToAdvisorsArray();
    }
  }

  public generateAdvisorForm(advisor: Advisor): FormGroup {
    return this.fb.group({
      email: [advisor.email, Validators.required],
      fullName: [advisor.fullName, Validators.required],
      accessCode: [advisor.accessCode, Validators.required]
    });
  }

  public addAdvisorToAdvisorsArray(advisor?: Advisor): void {
    if (!advisor) {
      advisor = new Advisor();
    }
    const advisorFormGroup = this.generateAdvisorForm(advisor);
    const advisorsFormArray = this.accountForm.get('advisors') as FormArray;
    advisorsFormArray.push(advisorFormGroup);
  }

  public removeAdvisorFromAdvisorsArray(index: number): void {
    const advisorsFormArray = this.accountForm.get('advisors') as FormArray;
    advisorsFormArray.removeAt(index);
  }
}
