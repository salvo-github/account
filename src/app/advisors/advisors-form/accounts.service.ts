import { Injectable } from '@angular/core';
import { Account } from './account.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Advisor } from './advisors-info/advisor/advisor.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private fb: FormBuilder) {}

  public getAccountForm(accountId?: string) {
    if (accountId === undefined) {
      return this.generateAccountForm();
    }
  }

  private generateAccountForm(account: Account = new Account()) {
    return this.fb.group({
      serial: [
        account.serial,
        [Validators.required, Validators.pattern(Account.getSerialPattern())]
      ],
      preview: [account.preview],
      advisors: this.fb.array(
        account.advisors.map((advisor) => this.generateAdvisorForm(advisor)),
        [
          Validators.maxLength(Account.getMaxAmountAdvisors()),
          Validators.required
        ]
      )
    });
  }

  public generateAdvisorForm(advisor: Advisor) {
    return this.fb.group({
      email: [advisor.email, Validators.required],
      fullName: [advisor.fullName, Validators.required],
      accessCode: [advisor.accessCode, Validators.required]
    });
  }
}
