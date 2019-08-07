import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountInfoComponent } from './advisors/advisors-form/account-info/account-info.component';
import { AdvisorsFormComponent } from './advisors/advisors-form/advisors-form.component';
import { AdvisorsInfoPreviewComponent } from './advisors/advisors-form/advisors-info-preview/advisors-info-preview.component';
import { AdvisorsInfoComponent } from './advisors/advisors-form/advisors-info/advisors-info.component';
import { AdvisorsComponent } from './advisors/advisors.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvisorsFormComponent,
    AccountInfoComponent,
    AdvisorsComponent,
    AdvisorsInfoComponent,
    AdvisorsInfoPreviewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
