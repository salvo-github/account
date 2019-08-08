import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from './account.model';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-advisors-form',
  templateUrl: './advisors-form.component.html',
  styleUrls: ['./advisors-form.component.scss']
})
export class AdvisorsFormComponent implements OnInit {
  public accountForm: FormGroup;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accountForm = this.accountsService.getAccountForm();

    this.accountForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
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
