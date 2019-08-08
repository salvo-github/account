import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  RequiredValidator,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-advisors-form',
  templateUrl: './advisors-form.component.html',
  styleUrls: ['./advisors-form.component.scss']
})
export class AdvisorsFormComponent implements OnInit {
  public advisorsForm: FormGroup;
  public showAdvisorsInfo = false;

  constructor() {}

  ngOnInit() {
    this.advisorsForm = new FormGroup({});

    this.advisorsForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onAccountNumberValidity($event) {
    this.showAdvisorsInfo = $event;
  }

  public onSubmit() {
    console.log(this.advisorsForm);
  }
}
