import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './datatable/datatable.component';

const routes: Routes = [
  { path: 'data-table', component: DataTableComponent },
  { path: '', redirectTo: '/data-table', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
