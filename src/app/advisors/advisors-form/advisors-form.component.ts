import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from './account.model';
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

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService
  ) {}

  ngOnInit() {
    const accountId = this.route.snapshot.paramMap.get('accountId');

    this.accountFormSubscription = this.accountsService
      .getAccountFormObservable()
      .subscribe((accountFormGroup: FormGroup) => {
        this.accountForm = accountFormGroup;
      });

    this.accountsService.fetchAccountById(accountId);

    this.accountForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnDestroy() {
    this.accountFormSubscription.unsubscribe();
  }

  public isValid(formControlName: string): boolean {
    return this.accountForm.get(formControlName).valid;
  }

  public onSubmit() {
    console.log(this.accountForm);
  }

  public getLabel(property: string): string {
    return Account.getLabel(property);
  }
}
