import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  public accountNumber = {
    id: 'accountNumber',
    default: ''
  };

  @Input() formGroup: FormGroup;
  @Output() accountNumberValidity = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    /**
     * The account number must be 8 digits without 0 leading
     */
    const accountNumberValidation = new RegExp(/^[1-9][0-9]{7}$/);

    const accountNumberControl = new FormControl(this.accountNumber.default, [
      Validators.required,
      Validators.pattern(accountNumberValidation)
    ]);

    this.formGroup.addControl(this.accountNumber.id, accountNumberControl);

    accountNumberControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.accountNumberValidity.emit(true);
      } else {
        this.accountNumberValidity.emit(false);
      }
    });
  }
}
