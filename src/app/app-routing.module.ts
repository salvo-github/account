import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorsFormComponent } from './advisors/advisors-form/advisors-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'advisors' },
  {
    path: 'advisors',
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'new', component: AdvisorsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
