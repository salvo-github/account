import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdvisorsFormComponent } from './advisors/advisors-form/advisors-form.component';
import { AdvisorPreviewComponent } from './advisors/advisors-form/advisors-info-preview/advisor-preview/advisor-preview.component';
import { AdvisorsInfoPreviewComponent } from './advisors/advisors-form/advisors-info-preview/advisors-info-preview.component';
import { AdvisorComponent } from './advisors/advisors-form/advisors-info/advisor/advisor.component';
import { AdvisorsInfoComponent } from './advisors/advisors-form/advisors-info/advisors-info.component';
import { AdvisorsComponent } from './advisors/advisors.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvisorsFormComponent,
    AdvisorsComponent,
    AdvisorsInfoComponent,
    AdvisorComponent,
    AdvisorPreviewComponent,
    AdvisorsInfoPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
