import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Account, AccountProperties } from './account.model';
import { AccountsService } from './accounts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advisors-form',
  templateUrl: './advisors-form.component.html',
  styleUrls: ['./advisors-form.component.scss']
})
export class AdvisorsFormComponent implements OnInit, OnDestroy {
  public accountForm: FormGroup;
  private accountFormSubscription: Subscription;
  public accountProperties = AccountProperties;

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService
  ) {}

  ngOnInit() {
    // this must be in a resolver
    const accountId = this.route.snapshot.paramMap.get('accountId');
    this.accountsService.fetchAccountById(accountId);

    this.accountFormSubscription = this.accountsService
      .getAccountFormObservable()
      .subscribe((accountFormGroup: FormGroup) => {
        this.accountForm = accountFormGroup;
      });
  }

  ngOnDestroy() {
    this.accountFormSubscription.unsubscribe();
  }

  public isValid(formControlName: string): boolean {
    return this.accountForm.get(formControlName).valid;
  }

  public getAdvisorsFormArray(): FormArray {
    return this.accountsService.getAdvisorsFormArray();
  }

  public onSubmit() {
    console.log(this.accountForm);
  }

  public getLabel(property: string): string {
    return Account.getLabel(property);
  }

  public isPreviewEnabled(): boolean {
    return this.accountForm.get('preview').value;
  }
}
